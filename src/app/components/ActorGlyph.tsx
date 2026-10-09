import { useEffect, useRef } from "react";

export type ActorGlyphName = "requester" | "provider" | "committee";

const INK = "#3d6341";
const MINT = "#d9fce8";
const GREEN = "#82f5ad";
const FIRST_END = 4560;
const PERIOD = 3100;
const ACTIVE_NODES = 24;
const NODE_SPREAD = 570;
const LINK_DELAY = 45;
const LINK_DRAW = 260;

const names: Record<ActorGlyphName, string> = {
  requester: "Requesters",
  provider: "Participants",
  committee: "Ciphernodes",
};

function add<K extends keyof SVGElementTagNameMap>(
  parent: SVGElement,
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attrs)) {
    node.setAttribute(name, String(value));
  }
  parent.appendChild(node);
  return node;
}

function ease(p: number, x1 = .4, y1 = 0, x2 = .2, y2 = 1) {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  const coord = (t: number, a: number, b: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  let lo = 0, hi = 1;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (coord(mid, x1, x2) < p) lo = mid;
    else hi = mid;
  }
  return coord((lo + hi) / 2, y1, y2);
}

// A slow wind-up, fast turn, and short recoil into a firm stop.
function heavyTurn(p: number) {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  if (p < .88) return 1.04 * Math.pow(p / .88, 7);
  return 1 + .04 * Math.pow(1 - (p - .88) / .12, 3);
}

function shuffledRanks(count: number, seed: number) {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const ranks: number[] = [];
  order.forEach((index, rank) => { ranks[index] = rank; });
  return ranks;
}

function makeDot(parent: SVGElement, x: number, y: number) {
  const node = add(parent, "g", { transform: `translate(${x} ${y})` });
  const base = add(node, "circle", { r: 6, fill: MINT, stroke: "none" });
  const light = add(node, "circle", { r: 6, fill: GREEN, "fill-opacity": 0, stroke: "none" });
  const outline = add(node, "circle", { r: 6 });
  return { node, light, circles: [base, light, outline], x, y };
}

type Link = {
  node: SVGPathElement;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  a: number;
  b: number;
  port?: boolean;
};

// Omit the nine central positions, including every point on the activity box.
const cipherPoints: Array<{ x: number; y: number }> = [];
for (let y = -128; y <= 128; y += 32) {
  for (let x = -128; x <= 128; x += 32) {
    if (Math.abs(x) > 32 || Math.abs(y) > 32) cipherPoints.push({ x, y });
  }
}
const cipherIndex = new Map(cipherPoints.map((point, index) => [`${point.x},${point.y}`, index]));

export function ActorGlyph({ className = "", glyph }: { className?: string; glyph: ActorGlyphName }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const replayRef = useRef<() => void>(() => {});

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const art = add(svg, "g", {
      fill: "none", stroke: INK, "stroke-width": 2.5,
      "stroke-linecap": "butt", "stroke-linejoin": "miter",
    });
    const links: Link[] = [];
    let signal: SVGPathElement | null = null;
    if (glyph === "requester") {
      add(art, "path", { d: "M-58 0H-32" });
      signal = add(art, "path", { d: "M-58 0H-58", stroke: GREEN, opacity: 0 });
    }
    if (glyph === "provider") add(art, "circle", { r: 64 });
    if (glyph === "committee") {
      const makeLink = (ax: number, ay: number, bx: number, by: number) => {
        const a = cipherIndex.get(`${ax},${ay}`), b = cipherIndex.get(`${bx},${by}`);
        if (a === undefined || b === undefined) return;
        const ux = (bx - ax) / 32, uy = (by - ay) / 32;
        const x1 = ax + 6 * ux, y1 = ay + 6 * uy;
        const x2 = bx - 6 * ux, y2 = by - 6 * uy;
        const node = add(art, "path", { d: `M${x1} ${y1}L${x2} ${y2}`, stroke: INK, display: "none" });
        links.push({ node, x1, y1, x2, y2, a, b });
      };
      for (const { x, y } of cipherPoints) {
        makeLink(x, y, x + 32, y);
        makeLink(x, y, x, y + 32);
      }
      for (const [x, y] of [[-32, 0], [0, -32], [32, 0], [0, 32]]) {
        const ax = x * 2, ay = y * 2;
        const x1 = ax + 6 * (x - ax) / 32, y1 = ay + 6 * (y - ay) / 32;
        const a = cipherIndex.get(`${ax},${ay}`)!;
        const node = add(art, "path", { d: `M${x1} ${y1}L${x} ${y}`, stroke: INK, display: "none" });
        // Connections meet the sides directly, without extra contact dots.
        links.push({ node, x1, y1, x2: x, y2: y, a, b: a, port: true });
      }
    }
    add(art, "rect", { x: -32, y: -32, width: 64, height: 64 });
    const core = add(art, "g");
    add(core, "rect", { x: -8, y: -8, width: 16, height: 16, fill: MINT, stroke: "none" });
    const coreLight = add(core, "rect", {
      x: -8, y: -8, width: 16, height: 16, fill: GREEN, "fill-opacity": 0, stroke: "none",
    });
    add(core, "rect", { x: -8, y: -8, width: 16, height: 16 });
    const layer = add(art, "g");
    const dots: ReturnType<typeof makeDot>[] = [];
    if (glyph === "requester") dots.push(makeDot(layer, -64, 0));
    if (glyph === "provider") {
      for (let i = 0; i < 3; i++) {
        const angle = (-90 + i * 120) * Math.PI / 180;
        dots.push(makeDot(layer, 64 * Math.cos(angle), 64 * Math.sin(angle)));
      }
    }
    if (glyph === "committee") {
      for (const { x, y } of cipherPoints) dots.push(makeDot(layer, x, y));
    }

    let lightCycle = -1;
    let lightRanks: number[] = [];
    let connectionEnd = 0;

    const draw = (time: number) => {
      const first = time < FIRST_END;
      const cycle = first ? 0 : 1 + Math.floor((time - FIRST_END) / PERIOD);
      const local = first ? time : (time - FIRST_END) % PERIOD;
      const lightStart = first ? 1690 : 330;
      const moveStart = first ? 3360 : 2000;
      const clear = 1 - ease((local - moveStart) / 510, .4, 0, .2, 1);
      const rotationProgress = heavyTurn((local - lightStart) / 900);
      const entry = first ? ease((time - 260) / 850, .22, 1, .36, 1) : 1;
      const arrival = first ? -150 + 150 * ease((time - 180) / 1300, .16, 1, .3, 1) : 0;

      if (glyph === "committee" && lightCycle !== cycle) {
        lightRanks = shuffledRanks(dots.length, 0x2f641 + cycle * 1013);
        const candidates = links.filter(link => link.port).map(link => link.a);
        const anchor = candidates.reduce((best, index) => lightRanks[index] < lightRanks[best] ? index : best);
        if (lightRanks[anchor] >= ACTIVE_NODES) {
          const replaced = lightRanks.indexOf(ACTIVE_NODES - 1);
          [lightRanks[anchor], lightRanks[replaced]] = [lightRanks[replaced], lightRanks[anchor]];
        }
        // The recoil ends at the last connection's arrival, on every cycle.
        connectionEnd = links.reduce((end, link) => {
          const aRank = lightRanks[link.a], bRank = lightRanks[link.b];
          if (aRank >= ACTIVE_NODES || bRank >= ACTIVE_NODES) return end;
          return Math.max(end, Math.max(aRank, bRank) * NODE_SPREAD / (ACTIVE_NODES - 1) + LINK_DELAY + LINK_DRAW);
        }, 0);
        lightCycle = cycle;
      }
      const coreDelay = glyph === "requester" ? 240 : glyph === "provider" ? 220 : 330;
      const coreOpacity = ease((local - lightStart - coreDelay) / (620 - coreDelay), .25, 0, .3, 1) * clear;
      const coreRotation = glyph === "committee" ? heavyTurn((local - lightStart) / connectionEnd) : rotationProgress;
      core.setAttribute("transform", `rotate(${90 * (cycle + coreRotation)} 0 0)`);
      coreLight.setAttribute("fill-opacity", String(coreOpacity));

      dots.forEach((dot, index) => {
        let growth = entry, lightDelay = 0, active = true;
        let x = dot.x, y = dot.y;
        if (glyph === "provider") {
          const angle = (-90 + index * 120 + arrival + 120 * (cycle + rotationProgress)) * Math.PI / 180;
          x = 64 * Math.cos(angle); y = 64 * Math.sin(angle);
          lightDelay = ((index + cycle) % 3) * 110;
        }
        if (glyph === "committee") {
          const rank = lightRanks[index];
          active = rank < ACTIVE_NODES;
          lightDelay = rank * NODE_SPREAD / (ACTIVE_NODES - 1);
          growth = first ? ease((time - 260 - rank * 240 / (dots.length - 1)) / 850, .22, 1, .36, 1) : 1;
        }
        dot.node.setAttribute("transform", `translate(${x} ${y})`);
        dot.node.setAttribute("display", growth === 0 ? "none" : "inline");
        // Change radius instead of scaling, so stroke width stays constant.
        dot.circles.forEach(circle => circle.setAttribute("r", String(6 * growth)));
        dot.light.setAttribute("fill-opacity", String(active ? ease((local - lightStart - lightDelay) / 180, .25, 0, .3, 1) * clear : 0));
      });
      for (const link of links) {
        const aRank = lightRanks[link.a], bRank = lightRanks[link.b];
        const active = aRank < ACTIVE_NODES && bRank < ACTIVE_NODES;
        const start = lightStart + Math.max(aRank, bRank) * NODE_SPREAD / (ACTIVE_NODES - 1) + LINK_DELAY;
        const head = active ? Math.max(0, Math.min(1, (local - start) / LINK_DRAW)) : 0;
        const tail = active ? ease((local - moveStart - Math.max(aRank, bRank) * 4) / 260, .4, 0, .2, 1) : 0;
        const forward = link.port || aRank < bRank;
        const sx = forward ? link.x1 : link.x2, sy = forward ? link.y1 : link.y2;
        const ex = forward ? link.x2 : link.x1, ey = forward ? link.y2 : link.y1;
        link.node.setAttribute("display", active && head > tail ? "inline" : "none");
        link.node.setAttribute("d", `M${sx + (ex - sx) * tail} ${sy + (ey - sy) * tail}L${sx + (ex - sx) * head} ${sy + (ey - sy) * head}`);
      }
      if (signal) {
        const travel = ease((local - lightStart - 50) / 330, .4, 0, .25, 1);
        const head = -58 + 34 * travel;
        const start = Math.max(-58, Math.min(-32, head - 8));
        const end = Math.max(-58, Math.min(-32, head));
        signal.setAttribute("d", `M${start} 0H${end}`);
        signal.setAttribute("opacity", String(ease((local - lightStart - 50) / 110, .25, 0, .3, 1) * (1 - ease((local - lightStart - 260) / 120, .4, 0, .2, 1))));
      }
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let time = 0;
    let last: number | null = null;
    let frame: number | null = null;
    let inView = false;
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = null;
    };
    const tick = (now: number) => {
      if (last !== null) time += Math.max(0, now - last);
      last = now;
      draw(time);
      frame = requestAnimationFrame(tick);
    };
    const updatePlayback = () => {
      if (reducedMotion.matches) {
        stop();
        draw(2900);
      } else if (inView && !document.hidden) {
        if (frame === null) frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    };
    replayRef.current = () => {
      time = 0;
      last = null;
      draw(reducedMotion.matches ? 2900 : time);
      updatePlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(svg);
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    draw(reducedMotion.matches ? 2900 : 0);

    return () => {
      stop();
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      replayRef.current = () => {};
      art.remove();
    };
  }, [glyph]);

  return (
    <div className={`actor-glyph relative grid place-items-center text-[#3a5e3c] ${className}`}>
      <button
        aria-label={`Replay ${names[glyph]} animation`}
        className="block w-[88px] cursor-pointer border-0 bg-transparent p-0 min-[1100px]:w-[64%]"
        onClick={() => replayRef.current()}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="block h-auto w-full overflow-visible"
          fill="none"
          focusable="false"
          ref={svgRef}
          viewBox="-160 -160 320 320"
        />
      </button>
    </div>
  );
}
