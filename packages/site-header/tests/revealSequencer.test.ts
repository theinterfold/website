import { afterEach, beforeEach, expect, test } from "bun:test";
import { requestReveal } from "../src/revealSequencer";

let now = 0;
let nextFrame = 0;
let frames: Map<number, FrameRequestCallback>;
let cleanups: Array<() => void>;
const original = {
  window: Object.getOwnPropertyDescriptor(globalThis, "window"),
  raf: Object.getOwnPropertyDescriptor(globalThis, "requestAnimationFrame"),
  cancel: Object.getOwnPropertyDescriptor(globalThis, "cancelAnimationFrame"),
  performance: Object.getOwnPropertyDescriptor(globalThis, "performance"),
};

beforeEach(() => {
  now = 0;
  frames = new Map();
  cleanups = [];
  Object.defineProperty(globalThis, "window", { configurable: true, value: { scrollY: 0 } });
  Object.defineProperty(globalThis, "performance", { configurable: true, value: { now: () => now } });
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    configurable: true,
    value: (callback: FrameRequestCallback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
  });
  Object.defineProperty(globalThis, "cancelAnimationFrame", {
    configurable: true, value: (id: number) => frames.delete(id),
  });
});

afterEach(() => {
  cleanups.forEach((cancel) => cancel());
  for (const [name, descriptor] of [
    ["window", original.window], ["performance", original.performance],
    ["requestAnimationFrame", original.raf], ["cancelAnimationFrame", original.cancel],
  ] as const) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else Reflect.deleteProperty(globalThis, name);
  }
});

function frame(at: number) {
  now = at;
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach((callback) => callback(at));
}
function enqueue(id: string, y: number, calls: string[], options: { delayMs?: number; connected?: boolean; spanMs?: number } = {}) {
  const cancel = requestReveal({
    node: { isConnected: options.connected ?? true } as Element,
    y, delayMs: options.delayMs ?? 0, spanMs: options.spanMs ?? 0,
    start: () => calls.push(id),
  });
  cleanups.push(cancel);
  return cancel;
}

test("fast scrolling keeps document order and the site's 140ms cadence", () => {
  const calls: string[] = [];
  enqueue("panel", 400, calls);
  enqueue("title", 100, calls);
  enqueue("copy", 200, calls);
  frame(0);
  expect(calls).toEqual(["title"]);
  frame(139);
  expect(calls).toEqual(["title"]);
  frame(140);
  frame(280);
  expect(calls).toEqual(["title", "copy", "panel"]);
});

test("same-height blocks use authored order and reserve a line stagger", () => {
  const calls: string[] = [];
  enqueue("right", 100, calls, { delayMs: 200 });
  enqueue("left", 100, calls, { delayMs: 100, spanMs: 180 });
  frame(0);
  frame(319);
  expect(calls).toEqual(["left"]);
  frame(320);
  expect(calls).toEqual(["left", "right"]);
});

test("cancelled and unmounted content does not delay the next page", () => {
  const calls: string[] = [];
  enqueue("old title", 100, calls);
  const cancel = enqueue("old panel", 200, calls);
  frame(0);
  cancel();
  enqueue("detached", 0, calls, { connected: false });
  enqueue("new page", 100, calls);
  frame(1);
  expect(calls).toEqual(["old title", "new page"]);
});

test("content already scrolled past spends no extra queue slots", () => {
  const calls: string[] = [];
  window.scrollY = 1000;
  enqueue("past", 100, calls);
  enqueue("visible", 1050, calls);
  frame(0);
  expect(calls).toEqual(["past", "visible"]);
});

test("effect cleanup leaves one reveal after a StrictMode remount", () => {
  const calls: string[] = [];
  enqueue("cancelled mount", 100, calls)();
  enqueue("current mount", 100, calls);
  frame(0);
  frame(140);
  expect(calls).toEqual(["current mount"]);
  expect(frames.size).toBe(0);
});
