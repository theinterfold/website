import { expect, test } from "bun:test";
import { createContext, runInContext } from "node:vm";
import { HEADER_ENTRANCE_BOOTSTRAP } from "../packages/site-header/lib/index.js";

function environment(storage = new Map<string, string>(), reduced = false, blocked = false) {
  let now = 0, serial = 0;
  const timers = new Map<number, { at: number; callback: () => void }>();
  class Node extends EventTarget {
    dataset: Record<string, string> = {};
    attributes = new Map<string, string>();
    classes = new Set<string>();
    classList = {
      add: (...names: string[]) => names.forEach(name => this.classes.add(name)),
      remove: (...names: string[]) => names.forEach(name => this.classes.delete(name)),
    };
    isConnected = true;
    resets = 0;
    getAnimations() { return [{ animationName: "site-header-arrive", currentTime: 100, play: () => this.resets++ }]; }
    setAttribute(name: string, value: string) { this.attributes.set(name, value); }
    removeAttribute(name: string) { this.attributes.delete(name); }
    querySelector() { return image; }
    querySelectorAll() { return [symbol]; }
  }
  const image = new Node(), symbol = new Node(), header = new Node(), trigger = new Node();
  header.dataset = { variant: "responsive", ready: "false", entrance: "static" };
  trigger.dataset = { headerMenuTrigger: "responsive", ready: "false" };
  const preference = Object.assign(new EventTarget(), { matches: reduced });
  const window = { matchMedia: () => preference, name: "" };
  const context = createContext({
    window, location: { search: "" }, URLSearchParams, Symbol,
    document: { querySelectorAll: (selector: string) => selector === ".site-header-chrome" ? [header] : [trigger] },
    sessionStorage: {
      getItem: (key: string) => { if (blocked) throw Error("denied"); return storage.get(key); },
      setItem: (key: string, value: string) => storage.set(key, value),
    },
    setTimeout: (callback: () => void, delay: number) => { const id = ++serial; timers.set(id, { at: now + delay, callback }); return id; },
    clearTimeout: (id: number) => timers.delete(id),
    queueMicrotask: (callback: () => void) => callback(),
  });
  const boot = () => runInContext(HEADER_ENTRANCE_BOOTSTRAP, context);
  const advance = (milliseconds: number) => {
    const target = now + milliseconds;
    while (true) {
      const entry = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (!entry || entry[1].at > target) break;
      now = entry[1].at; timers.delete(entry[0]); entry[1].callback();
    }
    now = target;
  };
  const runtime = () => (window as any)[Symbol.for("interfold.header.entrance.runtime")];
  return { boot, advance, runtime, image, symbol, header, trigger, preference, storage, timers };
}

test("the standalone first paint starts all header parts and hydration adopts it without replay", () => {
  const page = environment(); page.boot();
  expect(page.header.dataset).toMatchObject({ ready: "true", entrance: "playing" });
  expect(page.trigger.dataset).toMatchObject({ ready: "true", entrance: "playing" });
  expect(page.symbol.classes.has("interfold-symbol-pending")).toBe(true);
  page.advance(600);
  const adopted = page.runtime().prepare(page.header);
  page.boot();
  expect(adopted.revision).toBe(1);
  expect(page.header.resets).toBe(0);
  page.advance(499);
  expect(page.image.attributes.has("href")).toBe(false);
  page.advance(1);
  expect(page.image.attributes.get("href")).toBe("/brand/interfold-symbol-fold.svg");
  page.image.dispatchEvent(new Event("load"));
  expect(page.symbol.classes.has("interfold-symbol-playing")).toBe(true);
  page.advance(1337);
  expect(page.symbol.classes.size).toBe(0);
  expect(page.image.attributes.has("href")).toBe(false);
});

test("refresh paints the complete static lockup without fetching the folding asset", () => {
  const first = environment(); first.boot();
  const refreshed = environment(first.storage); refreshed.boot();
  expect(refreshed.header.dataset).toMatchObject({ ready: "true", entrance: "static" });
  expect(refreshed.trigger.dataset).toMatchObject({ ready: "true", entrance: "static" });
  expect(refreshed.symbol.classes.size).toBe(0);
  expect(refreshed.timers.size).toBe(0);
});

test("reduced motion and denied storage show the static identity immediately", () => {
  for (const page of [environment(new Map(), true), environment(new Map(), false, true)]) {
    page.boot();
    expect(page.header.dataset.entrance).toBe("static");
    expect(page.trigger.dataset.ready).toBe("true");
    expect(page.symbol.classes.size).toBe(0);
    expect(page.timers.size).toBe(0);
  }
});

test("explicit replay shares one restart; changing motion preference cancels it", () => {
  const page = environment(); page.boot(); page.advance(600);
  expect(page.runtime().prepare(page.header, true).revision).toBe(2);
  expect(page.header.resets).toBe(1);
  expect(page.trigger.resets).toBe(1);
  page.advance(1100);
  expect(page.image.attributes.get("href")).toContain("?play=");
  page.preference.matches = true; page.preference.dispatchEvent(new Event("change"));
  expect(page.header.dataset.entrance).toBe("static");
  expect(page.trigger.dataset.entrance).toBe("static");
  expect(page.symbol.classes.size).toBe(0);
  expect(page.timers.size).toBe(0);
});

test("Strict Mode adoption keeps the timeline; unmount and failed assets restore safely", () => {
  const page = environment(); page.boot();
  page.runtime().release(page.header);
  expect(page.timers.size).toBe(1);
  page.advance(1100); page.image.dispatchEvent(new Event("error"));
  expect(page.symbol.classes.size).toBe(0);
  const next = environment(); next.boot(); next.header.isConnected = false;
  next.runtime().release(next.header);
  expect(next.timers.size).toBe(0);
  expect(next.symbol.classes.size).toBe(0);
});
