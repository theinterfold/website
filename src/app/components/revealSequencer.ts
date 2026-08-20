// One shared running order for every scroll reveal on the site.
//
// Each ScrollFadeIn / LineRevealAuto used to start its own timer the moment it
// scrolled into view, offset by a hand-written `delay`. That reads correctly at
// a normal scroll speed, because blocks arrive one at a time and each delay is
// measured from its own arrival. Scroll quickly and several blocks cross the
// threshold in the same frame, so their delays — 0.2 against 0.26, say — all
// start counting from the same instant and the blocks animate on top of each
// other. The running order collapses exactly when the motion is most visible.
//
// So blocks ask this module for a slot instead. Requests that land in the same
// frame are put in document order and played one after another: a paragraph
// never begins while the paragraph above it is still arriving, at any scroll
// speed.
//
// Note this makes the authored `delay` props ordering hints rather than
// timings. Two blocks at the same vertical position still play in the order
// their delays imply; the actual wait is decided here.

type RevealRequest = {
  /** Absolute document position of the element, used to order the batch. */
  y: number;
  /** The authored delay, in ms. Only breaks ties between elements at equal y. */
  delayMs: number;
  /** How long this element's own internal stagger runs, in ms. */
  spanMs: number;
  /** Called with the wait this element should use, in seconds. */
  start: (delaySeconds: number) => void;
};

// Gap between one block finishing its own stagger and the next one starting.
// Wider than the 90ms stagger inside a block, so a new block reads as a new
// block rather than as another line of the previous one.
const STEP_MS = 140;

// Longest queue allowed to build up. A hard flick can bring dozens of blocks
// into view while the scroll is still moving, and without this the last of them
// would animate seconds after everything came to rest. Past this point the
// running order starts afresh rather than stretching further.
const MAX_BACKLOG_MS = 900;

let pending: RevealRequest[] = [];
let frame: number | null = null;
// When the running order is next free, on the performance.now() clock.
let nextFreeAt = 0;

function flush() {
  frame = null;

  const batch = pending;
  pending = [];

  // Top to bottom. Equal positions — a two-column grid row, or a wrapper and
  // the block inside it — fall back to the order the delays imply.
  batch.sort((a, b) => a.y - b.y || a.delayMs - b.delayMs);

  const now = performance.now();
  if (nextFreeAt < now || nextFreeAt - now > MAX_BACKLOG_MS) {
    nextFreeAt = now;
  }

  const viewportTop = window.scrollY;

  batch.forEach((request) => {
    // Already scrolled past. Nobody is looking at it, so let it appear at once
    // rather than holding up the blocks that are actually on screen.
    if (request.y < viewportTop) {
      request.start(0);
      return;
    }

    const waitMs = Math.max(0, nextFreeAt - now);
    request.start(waitMs / 1000);
    nextFreeAt = now + waitMs + request.spanMs + STEP_MS;
  });
}

export function requestReveal(request: RevealRequest) {
  pending.push(request);

  if (frame === null) {
    // Collect everything that crossed the threshold in this frame before
    // deciding the order — a fast scroll delivers them a few at a time.
    frame = requestAnimationFrame(flush);
  }
}
