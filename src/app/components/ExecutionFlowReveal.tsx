import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ExecutionFlowTuner, SHOW_EXECUTION_FLOW_TUNER } from "./ExecutionFlowTuner";

export type ExecutionFlowTiming = {
  /** Applied over a whole route rather than per segment, so the pen does not
      stall at every corner — it leaves gently, travels, and arrives gently. */
  easing: string;
  /** viewBox units per millisecond. One pen speed for every route, so a run
      that crosses the whole diagram takes longer than a short one — which is
      what reads as drawing rather than as a set of bars filling. */
  penSpeed: number;
  /** A route starts once the one above it is this far through its own journey,
      so they overlap without ever arriving together. */
  routeOverlap: number;
};

export const DEFAULT_EXECUTION_FLOW_TIMING: ExecutionFlowTiming = {
  easing: "cubic-bezier(0.45, 0.05, 0.3, 1)",
  penSpeed: 1.9,
  routeOverlap: 0.55,
};

// Held here rather than in component state so the tuner can change it and
// replay without the graphic remounting. Nothing but the tuner writes to it.
let timing: ExecutionFlowTiming = { ...DEFAULT_EXECUTION_FLOW_TIMING };
const replayListeners = new Set<() => void>();
const totalListeners = new Set<(ms: number) => void>();
let revealRoot: HTMLElement | null = null;

export function getExecutionFlowTiming() {
  return timing;
}

export function setExecutionFlowTiming(next: ExecutionFlowTiming) {
  timing = next;
}

/** Draws the graphic again from the top with whatever timing is set now. */
export function replayExecutionFlow() {
  revealRoot?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => replayListeners.forEach((listener) => listener()), 260);
}

/** Reports how long the run just scheduled will take, so the tuner can show it. */
export function onExecutionFlowTotal(listener: (ms: number) => void) {
  totalListeners.add(listener);
  return () => {
    totalListeners.delete(listener);
  };
}
// How close two ends have to be to count as the same point, in viewBox units.
const JOIN_TOLERANCE = 3;
// Everything at or left of this x belongs to the input fan; the spine sits here.
const SPINE_X = 480;

type Segment = {
  el: SVGPathElement;
  end: DOMPoint;
  length: number;
  /** True when the export authored this run right to left. */
  reversed: boolean;
  start: DOMPoint;
};

type Route = {
  delay: number;
  duration: number;
  length: number;
  segments: Segment[];
};

function measure(el: SVGPathElement): Segment {
  const length = el.getTotalLength();
  const from = el.getPointAtLength(0);
  const to = el.getPointAtLength(length);
  // Draw from whichever end is further left — the diagram is read left to
  // right, and the Figma export authored a good half of these runs backwards.
  // Vertical runs have no left end, so they start at the top instead.
  const reversed = to.x < from.x || (to.x === from.x && to.y < from.y);

  return { el, end: reversed ? from : to, length, reversed, start: reversed ? to : from };
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Where the pen is once it has travelled `travelled` units into the route. */
function pointAt(route: Route, travelled: number) {
  let remaining = travelled;
  for (const segment of route.segments) {
    if (remaining <= segment.length || segment === route.segments[route.segments.length - 1]) {
      const along = Math.min(Math.max(remaining, 0), segment.length);
      return segment.el.getPointAtLength(segment.reversed ? segment.length - along : along);
    }
    remaining -= segment.length;
  }
  return route.segments[0].start;
}

/**
 * Draws the execution-model graphic in rather than fading it.
 *
 * The lines are not drawn in the order the export lists them, and not in phases
 * either: they are stitched back into the routes they actually describe — an
 * encrypted input running in from the left, across the committee spine, and out
 * to the decrypted output — so one line makes the whole journey before the next
 * sets off. The green nodes light up as the pen reaches them, and the looping
 * pulses only start once there is a diagram for them to run along.
 */
export function ExecutionFlowReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [hasDrawn, setHasDrawn] = useState(false);
  const [run, setRun] = useState(0);

  const isHeld = !shouldReduceMotion && !hasDrawn;

  useEffect(() => {
    revealRoot = ref.current;
    const replay = () => {
      setHasDrawn(false);
      setRun((previous) => previous + 1);
    };
    replayListeners.add(replay);
    return () => {
      replayListeners.delete(replay);
    };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || !isInView || shouldReduceMotion || hasDrawn) {
      return undefined;
    }

    const { easing: ROUTE_EASING, penSpeed: PEN_SPEED, routeOverlap: ROUTE_OVERLAP } = timing;

    const svg = root.querySelector<SVGSVGElement>('[data-name="Layer_1"] > svg');
    const strokes = svg ? Array.from(svg.querySelectorAll<SVGPathElement>("path[stroke]")).map(measure) : [];
    if (!svg || strokes.length === 0) {
      setHasDrawn(true);
      return undefined;
    }

    // A vertical run is the spine; anything that stays left of it is an input,
    // and every input is the first leg of one route.
    const spine = strokes.filter((segment) => segment.el.getBBox().width < 2);
    const drawable = strokes.filter((segment) => segment.el.getBBox().width >= 2);
    const isInput = (segment: Segment) => segment.el.getBBox().x + segment.el.getBBox().width <= SPINE_X;
    const pool = new Set(drawable.filter((segment) => !isInput(segment)));

    const routes: Route[] = drawable
      .filter(isInput)
      // In the order they land on the spine, which is the order the fan reads —
      // not the order their far ends happen to sit at on the left.
      .sort((a, b) => a.end.y - b.end.y)
      .map((input) => {
        const segments = [input];
        // Follow the drawing: whatever leaves the point this leg arrived at is
        // the next leg of the same journey.
        for (;;) {
          const tip = segments[segments.length - 1].end;
          const next = Array.from(pool).find((candidate) => distance(candidate.start, tip) <= JOIN_TOLERANCE);
          if (!next) {
            break;
          }
          pool.delete(next);
          segments.push(next);
        }
        const length = segments.reduce((sum, segment) => sum + segment.length, 0);
        return { delay: 0, duration: length / PEN_SPEED, length, segments };
      });

    let cursor = 0;
    for (const route of routes) {
      route.delay = cursor;
      cursor += route.duration * ROUTE_OVERLAP;
    }

    // Short spurs that branch off the middle of a run rather than off its end.
    // They belong to whichever route passes closest to where they begin.
    for (const spur of pool) {
      let best = routes[0];
      let bestDistance = Infinity;
      for (const route of routes) {
        for (let travelled = 0; travelled <= route.length; travelled += 4) {
          const gap = distance(pointAt(route, travelled), spur.start);
          if (gap < bestDistance) {
            bestDistance = gap;
            best = route;
          }
        }
      }
      best.segments.push(spur);
      best.length += spur.length;
      best.duration = best.length / PEN_SPEED;
    }

    const animations: Animation[] = [];

    const drawSegments = (route: Route) => {
      let travelled = 0;
      for (const segment of route.segments) {
        const from = travelled / route.length;
        const to = (travelled + segment.length) / route.length;
        travelled += segment.length;

        const offset = segment.reversed ? -segment.length : segment.length;
        const frames: Keyframe[] = [];
        if (from > 0) {
          frames.push({ offset: 0, opacity: 1, strokeDashoffset: offset });
        }
        frames.push({ offset: from, opacity: 1, strokeDashoffset: offset });
        frames.push({ offset: to, opacity: 1, strokeDashoffset: 0 });
        if (to < 1) {
          frames.push({ offset: 1, opacity: 1, strokeDashoffset: 0 });
        }

        segment.el.style.strokeDasharray = String(segment.length);
        animations.push(
          segment.el.animate(frames, {
            delay: route.delay,
            duration: route.duration,
            easing: ROUTE_EASING,
            fill: "both",
          }),
        );
      }
    };

    routes.forEach(drawSegments);

    // The spine is shared by every route, so it grows downwards over the span in
    // which the fan lands on it rather than belonging to any one of them.
    const landings = routes.map((route) => route.delay + (route.segments[0].length / route.length) * route.duration);
    const firstLanding = Math.min(...landings);
    const lastLanding = Math.max(...landings);
    for (const segment of spine) {
      segment.el.style.strokeDasharray = String(segment.length);
      animations.push(
        segment.el.animate(
          [
            { opacity: 1, strokeDashoffset: segment.reversed ? -segment.length : segment.length },
            { opacity: 1, strokeDashoffset: 0 },
          ],
          {
            delay: firstLanding,
            duration: Math.max(140, lastLanding - firstLanding),
            easing: "linear",
            fill: "both",
          },
        ),
      );
    }

    // Nodes come in on the beat the pen reaches them, keyed to their route's own
    // timeline so they inherit the same easing the run does.
    for (const node of Array.from(svg.querySelectorAll<SVGPathElement>("path:not([stroke])"))) {
      const box = node.getBBox();
      const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      let best: { at: number; route: Route } | null = null;
      let bestDistance = Infinity;
      for (const route of routes) {
        for (let travelled = 0; travelled <= route.length; travelled += 4) {
          const gap = distance(pointAt(route, travelled), centre);
          if (gap < bestDistance) {
            bestDistance = gap;
            best = { at: travelled / route.length, route };
          }
        }
      }
      if (!best) {
        continue;
      }
      const from = Math.max(0, best.at - 0.03);
      const to = Math.min(1, Math.max(from + 0.06, best.at + 0.04));
      const frames: Keyframe[] = [{ offset: 0, opacity: 0 }];
      if (from > 0) {
        frames.push({ offset: from, opacity: 0 });
      }
      frames.push({ offset: to, opacity: 1 });
      if (to < 1) {
        frames.push({ offset: 1, opacity: 1 });
      }
      animations.push(
        node.animate(frames, {
          delay: best.route.delay,
          duration: best.route.duration,
          easing: ROUTE_EASING,
          fill: "both",
        }),
      );
    }

    const total = Math.max(...routes.map((route) => route.delay + route.duration), lastLanding);
    totalListeners.forEach((listener) => listener(total));

    // The tags are chapter marks rather than part of the drawing, so they land
    // on the moments they name instead of being matched to a line.
    const tags = Array.from(root.querySelectorAll<HTMLElement>("[data-execution-flow-tag]"));
    const tagTimes = [0, firstLanding, routes[0].delay + routes[0].duration * 0.75];
    const timers = tags.map((tag, index) =>
      window.setTimeout(() => tag.classList.add("is-drawn"), tagTimes[index] ?? total),
    );

    // The looping pulses and the glow only make sense once there is a line for
    // them to travel along.
    timers.push(window.setTimeout(() => root.classList.add("interfold-execution-flow-draw--live"), Math.max(0, total - 420)));
    timers.push(window.setTimeout(() => setHasDrawn(true), total + 620));

    return () => {
      timers.forEach(window.clearTimeout);
      animations.forEach((animation) => animation.cancel());
      for (const segment of strokes) {
        segment.el.style.strokeDasharray = "";
        segment.el.style.strokeDashoffset = "";
      }
      // Only matters when the tuner replays: a second run has to start from the
      // same held state the first one did.
      root.classList.remove("interfold-execution-flow-draw--live");
      tags.forEach((tag) => tag.classList.remove("is-drawn"));
    };
  }, [hasDrawn, isInView, run, shouldReduceMotion]);

  return (
    <div
      className={["relative", isHeld ? "interfold-execution-flow-draw" : "", className].filter(Boolean).join(" ")}
      ref={ref}
    >
      {children}
      {SHOW_EXECUTION_FLOW_TUNER ? <ExecutionFlowTuner /> : null}
    </div>
  );
}
