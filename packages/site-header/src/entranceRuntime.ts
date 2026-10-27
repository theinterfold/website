type HeaderRun = { revision: number; dispose: () => void };
type HeaderRuntime = {
  prepare: (header: HTMLElement, replay?: boolean) => HeaderRun;
  prepareAll: () => void;
  release: (header: HTMLElement) => void;
};

/** Self-contained so SSR can run the exact same entrance before React loads. */
export function installHeaderEntranceRuntime(): HeaderRuntime {
  const key = Symbol.for("interfold.header.entrance.runtime");
  const shared = window as unknown as Record<symbol, HeaderRuntime | undefined>;
  if (shared[key]) return shared[key]!;
  const runs = new WeakMap<HTMLElement, HeaderRun>();
  const seen = new Set<string>();

  function firstVisit(variant: string) {
    if (seen.has(variant)) return false;
    seen.add(variant);
    try {
      const storageKey = `interfold:navbar-seen:${variant}`;
      const previous = sessionStorage.getItem(storageKey) === "1";
      sessionStorage.setItem(storageKey, "1");
      return !previous;
    } catch { return false; }
  }

  function prepare(header: HTMLElement, replay = false): HeaderRun {
    const previous = runs.get(header);
    if (previous && !replay) return previous;
    previous?.dispose();
    const variant = header.dataset.variant || "responsive";
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const requested = replay || firstVisit(variant);
    const revision = requested && !preference.matches ? (previous?.revision || 0) + 1 : 0;
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-header-menu-trigger]"))
      .filter(node => node.dataset.headerMenuTrigger === variant);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];
    let disposed = false;
    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => { if (!disposed) callback(); }, delay);
      timers.push(timer);
      return timer;
    };
    for (const node of [header, ...triggers]) {
      node.dataset.ready = "true";
      node.dataset.entrance = revision ? "playing" : "static";
    }
    if (replay && revision) {
      for (const node of [header, ...triggers]) {
        node.getAnimations({ subtree: true }).forEach(animation => {
          if ("animationName" in animation && String(animation.animationName).startsWith("site-header-")) {
            animation.currentTime = 0;
            animation.play();
          }
        });
      }
    }

    for (const symbol of header.querySelectorAll<SVGElement>("[data-symbol-animated]")) {
      const image = symbol.querySelector<SVGImageElement>(".interfold-symbol-motion");
      if (!image) continue;
      let settled = false;
      let timeout: ReturnType<typeof setTimeout>;
      const restore = () => {
        settled = true;
        clearTimeout(timeout);
        symbol.classList.remove("interfold-symbol-pending", "interfold-symbol-playing");
        image.removeAttribute("href");
      };
      const loaded = () => {
        if (disposed || settled) return;
        clearTimeout(timeout);
        symbol.classList.add("interfold-symbol-playing");
        later(restore, 4010 / 3);
      };
      image.addEventListener("load", loaded);
      image.addEventListener("error", restore);
      cleanups.push(() => {
        image.removeEventListener("load", loaded);
        image.removeEventListener("error", restore);
        restore();
      });
      if (revision) {
        symbol.classList.add("interfold-symbol-pending");
        later(() => {
          if (settled) return;
          // A stable first-visit URL can use the browser cache. Explicit replay
          // gets a fresh SVG timeline without delaying or restarting the header.
          image.setAttribute("href", `/brand/interfold-symbol-fold.svg${replay ? `?play=${Date.now()}` : ""}`);
          timeout = later(restore, 5000);
        }, 1100);
      }
    }
    const dispose = () => {
      disposed = true;
      timers.forEach(clearTimeout);
      cleanups.forEach(cleanup => cleanup());
      preference.removeEventListener("change", preferenceChanged);
    };
    const preferenceChanged = () => {
      if (!preference.matches) return;
      dispose();
      for (const node of [header, ...triggers]) node.dataset.entrance = "static";
    };
    preference.addEventListener("change", preferenceChanged);
    const run = { revision, dispose };
    runs.set(header, run);
    return run;
  }

  const runtime: HeaderRuntime = {
    prepare,
    prepareAll() {
      // The comparison resolves its explicit layout before starting motion.
      if (new URLSearchParams(location.search).get("navbarStudy") === "1" ||
          ["interfold-navbar-study", "governance-navbar-study"].includes(window.name)) return;
      document.querySelectorAll<HTMLElement>(".site-header-chrome").forEach(header => prepare(header));
    },
    release(header) {
      // React Strict Mode rehearses effects while the same node stays mounted.
      queueMicrotask(() => { if (!header.isConnected) runs.get(header)?.dispose(); });
    },
  };
  shared[key] = runtime;
  return runtime;
}

export const HEADER_ENTRANCE_BOOTSTRAP = `(${installHeaderEntranceRuntime.toString()})().prepareAll();`;
