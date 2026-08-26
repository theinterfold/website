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
// So blocks join a queue here instead, and this module releases them one at a
// time, in document order: a paragraph never begins while the paragraph above
// it is still arriving, at any scroll speed.
//
// Note this makes the authored `delay` props ordering hints rather than
// timings. Two blocks at the same vertical position still play in the order
// their delays imply; when they play is decided here.

type RevealRequest = {
  /** The block itself. Only read to check it is still on the page. */
  node: Element;
  /** Absolute document position of the block, used to order the queue. */
  y: number;
  /** The authored delay, in ms. Only breaks ties between blocks at equal y. */
  delayMs: number;
  /** How long this block's own internal stagger runs, in ms. */
  spanMs: number;
  /** Called when the block's turn comes. */
  start: (delaySeconds: number) => void;
};

// Gap between one block finishing its own stagger and the next one starting.
// Wider than the 90ms stagger inside a block, so a new block reads as a new
// block rather than as another line of the previous one.
const STEP_MS = 140;

// How far above the viewport a block has to be before it counts as scrolled
// past. Generous, so a tall block whose top has just gone off screen — and
// whose lower half is still being read — is still paced normally.
const PAST_MARGIN_PX = 320;

// Blocks waiting for their turn, kept in document order.
let queue: RevealRequest[] = [];
// Arrived since the last frame, not yet merged into the queue.
let incoming: RevealRequest[] = [];
let frame: number | null = null;
// When the next block may be released, on the performance.now() clock.
let nextReleaseAt = 0;

function tick() {
  frame = null;

  if (incoming.length) {
    // Merge and re-sort rather than append: scrolling upwards brings in blocks
    // that belong ahead of ones already waiting.
    queue = queue.concat(incoming).sort((a, b) => a.y - b.y || a.delayMs - b.delayMs);
    incoming = [];
  }

  const now = performance.now();
  const viewportTop = window.scrollY;

  while (queue.length > 0 && now >= nextReleaseAt) {
    const request = queue.shift() as RevealRequest;

    // Gone from the page — almost always a route change, which leaves the
    // outgoing page's blocks queued behind. Drop it without spending a turn,
    // otherwise the page just arrived waits out a running order belonging to
    // the page the reader has left.
    if (!request.node.isConnected) {
      continue;
    }

    request.start(0);

    // Judged here, at release, rather than when the block asked to join —
    // which is the whole reason for the queue. On the way down a block is
    // always still on screen at the moment it asks, so a check made back then
    // never catches anything. By the time its turn comes the reader may be
    // long past it, and then it should cost the queue nothing: otherwise
    // flicking through a long page spends the running order on blocks nobody
    // watched, and the content the reader actually stops on arrives more than
    // a second after the scroll settles.
    if (request.y < viewportTop - PAST_MARGIN_PX) {
      continue;
    }

    nextReleaseAt = now + request.spanMs + STEP_MS;
  }

  if (queue.length > 0) {
    frame = requestAnimationFrame(tick);
  }
}

export function requestReveal(request: RevealRequest) {
  incoming.push(request);

  if (frame === null) {
    frame = requestAnimationFrame(tick);
  }
}
