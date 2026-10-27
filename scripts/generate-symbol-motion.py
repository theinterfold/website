"""Derive the navbar motion from the approved Brand-Motion renderer, read-only."""
from pathlib import Path
import json, re, sys
import xml.etree.ElementTree as E

import argparse
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true', help='Verify the saved asset without rewriting it')
parser.add_argument('--brand-motion', type=Path, required=True, help='Read-only approved Brand-Motion source directory')
args = parser.parse_args()
SOURCE = args.brand_motion.resolve()
DEST = Path(__file__).resolve().parents[1] / 'packages/site-header/assets/symbol-fold.svg'
sys.dont_write_bytecode = True
sys.path.insert(0, str(SOURCE))
import revezamento_controls as controls

# The reference enforces sequential phases. For the navbar the terminal folds
# share the body's interval and easing, ending when its delayed half is open.
validate = controls.normalize_controls
def overlapping(parameters=None):
    result = validate(parameters)
    result['flapStart'] = result['bodyStart']
    result['flapDuration'] = result['bodyDuration'] + result['halfDelay']
    result['flapEase'] = list(result['bodyEase'])
    return result
controls.normalize_controls = overlapping
parameters = json.loads((SOURCE / 'interfold-revezamento-ajustes.json').read_text())
for name in ('seedStart', 'seedDuration', 'bodyStart', 'bodyDuration', 'halfDelay', 'flapStart', 'flapDuration', 'hold'):
    parameters[name] /= 3
project, metadata = controls.configure_projector(parameters)
from panel_surface_renderer import render

E.register_namespace('', 'http://www.w3.org/2000/svg')
def prepare(svg):
    root = E.fromstring(svg)
    root.set('viewBox', '0 0 1000 844')
    root.set('width', '1000'); root.set('height', '844')
    for child in list(root):
        if child.attrib.get('class') == 'if-panel-rest': root.remove(child)
    for element in root.iter():
        for key, value in list(element.attrib.items()):
            if key == 'd' or (key == 'values' and element.attrib.get('attributeName') == 'd'):
                element.set(key, re.sub(r'-?\d+\.\d+', lambda m: format(float(m[0]), '.1f').rstrip('0').rstrip('.'), value))
        if element.attrib.get('calcMode') == 'discrete' and 'keyTimes' in element.attrib:
            pairs = list(zip(element.attrib['keyTimes'].split(';'), element.attrib['values'].split(';')))
            kept = [pairs[0]]
            for i, pair in enumerate(pairs[1:], 1):
                if pair[1] != kept[-1][1] or i == len(pairs)-1: kept.append(pair)
            # Renderer emits the handoff and duration separately even if equal.
            unique = dict(kept)
            element.set('keyTimes', ';'.join(unique.keys()))
            element.set('values', ';'.join(unique.values()))
    return E.tostring(root, encoding='unicode').replace('var(--if-paper,#dbf9e9)', '#d9fce8').replace('var(--if-stroke,#252525)', '#3a5e3c').replace('#dbf9e9', '#d9fce8').replace('#252525', '#3a5e3c')


import math
from functools import lru_cache


def coincidence_weight(distance):
    """Coalesce below half a pen width; release smoothly before separate folds."""
    progress = max(0, min(1, (distance - 24) / 8))
    return 1 - progress * progress * (3 - 2 * progress)


@lru_cache(None)
def offsets(time):
    start = project(time, 0, 0, 0)
    end = project(time, 0, 4, 0)
    dx, dy = end[0] - start[0], end[1] - start[1]
    length = math.hypot(dx, dy)
    if length < 1e-6:
        return (0, 0), [0], [0]
    normal = (-dy / length, dx / length)
    points = [project(time, half, 0, crease)
              for half in (0, 1) for crease in range(4)]
    positions = sorted(set(round(x * normal[0] + y * normal[1], 5)
                           for x, y, *_ in points))
    # Ignore already coincident carriers and well-separated folds. A wider
    # threshold merges the distinct 36-unit gaps during the middle fold.
    if not any(1 < abs(a - b) < 32 for a in positions for b in positions):
        return normal, positions, positions
    targets = []
    for position in positions:
        weights = [coincidence_weight(abs(position - other)) for other in positions]
        targets.append(sum(other * weight for other, weight in zip(positions, weights))
                       / sum(weights))
    return normal, positions, targets


def mapped(time, half, p, q, flap=False):
    source = getattr(project, 'flap', project) if flap else project
    x, y, z, w = source(time, half, p, q)
    normal, positions, targets = offsets(time)
    position = x * normal[0] + y * normal[1]
    if position <= positions[0]:
        shift = targets[0] - positions[0]
    elif position >= positions[-1]:
        shift = targets[-1] - positions[-1]
    else:
        for index, (left, right) in enumerate(zip(positions, positions[1:])):
            if left <= position <= right:
                fraction = (position - left) / (right - left)
                shift = ((targets[index] - left) * (1 - fraction)
                         + (targets[index + 1] - right) * fraction)
                break
    # The same map applies to faces, ink, joins and masks. Correcting only
    # ink or enlarging depth masks leaves broken corners and clipping holes.
    return x + shift * normal[0], y + shift * normal[1], z, w


mapped.flap = lambda time, half, p, q: mapped(time, half, p, q, True)

# A tip trim protects the small decorative miter at a flap attachment.
# The reference applies it to the whole triangle; near 967 ms this erases
# the exposed return edge, outside the finite covering panel. Keep normal
# depth occlusion, but constrain this trim to join patches, not the stroke.
import copy
import panel_surface_renderer as panel_renderer

reference_frame = panel_renderer.frame


def frame_with_intact_flaps(projector, time):
    scene = copy.deepcopy(reference_frame(projector, time))
    for index in (0, 4):
        flap = scene['faces'][index]
        parent = scene['faces'][index + 1]
        boundary = panel_renderer._corner_boundary(
            parent['vertices'][1], parent['vertices'][2], parent['vertices'][0])
        if boundary and flap['tipCuts'][0]:
            flap['tipCuts'][0] = []
            flap['joins'] = [
                panel_renderer._fixed(panel_renderer._trim_footprint(join, boundary),
                                      flap['vertices'][corner][:2])
                for corner, join in enumerate(flap['joins'])
            ]
    # Occlusion belongs to the opaque paper surface, not an expanded ink
    # footprint. An expanded footprint can erase another edge while its
    # own ink is hidden by a third face, leaving a long paper-coloured slit.
    # Keep the original depth tests, but never mask with hypothetical ink.
    for face in scene['faces']:
        face['masks'] = [
            [] if other['id'] == face['id'] else panel_renderer._occlusion_polygon(
                dict(other, expanded=[vertex[:2] for vertex in other['vertices']]),
                face['owner'], screen_overlap=1.5, depth_epsilon=1e-7,
                owner_depth_bounds=(min(v[2] for v in face['vertices']),
                                    max(v[2] for v in face['vertices'])))
            for other in scene['faces']
        ]
    return scene


panel_renderer.frame = frame_with_intact_flaps

# Regression: the exposed right-hand return edge must retain ink during
# the crossing, including both sides of its 48-unit stroke. This failed
# with the unbounded triangle mask even though the final pose was correct.
flap = frame_with_intact_flaps(mapped, 58 / 60)['faces'][4]
a, b = flap['vertices'][2], flap['vertices'][0]
length = math.dist(a[:2], b[:2])
normal = (-(b[1] - a[1]) / length, (b[0] - a[0]) / length)
for fraction in (.5, .75):
    for across in (-20, 0, 20):
        point = tuple(a[i] + (b[i] - a[i]) * fraction + normal[i] * across
                      for i in (0, 1))
        assert panel_renderer._ink_visible(flap, point), 'Flap stroke disappears at crossing'

def visible_outline_at(scene, point):
    """Test actual visible ink, allowing adjoining faces to share a crease."""
    for face in scene['faces']:
        if not panel_renderer._ink_visible(face, point):
            continue
        vertices = face['vertices']
        for start, end in zip(vertices, vertices[1:] + vertices[:1]):
            dx, dy = end[0] - start[0], end[1] - start[1]
            length = math.hypot(dx, dy)
            if length < 1e-6:
                continue
            px, py = point[0] - start[0], point[1] - start[1]
            along = (px * dx + py * dy) / length
            across = abs(px * dy - py * dx) / length
            if 0 <= along <= length and across <= 24:
                return True
        if any(panel_renderer._contains(join, point) for join in face['joins']):
            return True
    return False


# Regression for the user's 583 ms screenshot. Test both sides of the
# exposed crease across its middle, not exact floating-point mask edges.
scene = frame_with_intact_flaps(mapped, 35 / 60)
a, b = scene['faces'][7]['vertices'][2:4]
length = math.dist(a[:2], b[:2])
normal = (-(b[1] - a[1]) / length, (b[0] - a[0]) / length)
for fraction in (.25, .5, .75):
    for across in (-20, -12, -2, 2, 12, 20):
        point = tuple(a[i] + (b[i] - a[i]) * fraction + normal[i] * across
                      for i in (0, 1))
        assert visible_outline_at(scene, point), 'White slit at the opening crease'

# The approved projector, timing, depth and 48-unit pen are unchanged.
# Only almost-coincident screen-space carriers are consolidated. Keep the
# final handoff byte-for-byte equivalent to the original geometry.
final_original = prepare(render(project, metadata['duration'], static=metadata['duration']))
final_compensated = prepare(render(mapped, metadata['duration'], static=metadata['duration']))
assert final_original == final_compensated, 'Optical compensation changed the final symbol'
asset = prepare(render(mapped, metadata['duration']))
if args.check:
    assert DEST.read_text() == asset, 'Saved symbol motion is stale'
else:
    DEST.write_text(asset)
print(json.dumps({'duration': metadata['duration'], 'bytes': DEST.stat().st_size, 'finalPoseUnchanged': True}))
