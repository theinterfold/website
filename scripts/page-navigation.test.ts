import { expect, test } from "bun:test";
import { runInNewContext } from "node:vm";
import { transitionPage } from "../packages/site-header/src/pageNavigation.js";

function browser(reduced = false) {
  const preference = Object.assign(new EventTarget(), { matches: reduced });
  const run: typeof transitionPage = runInNewContext(`(${transitionPage})`, {
    window: { matchMedia: () => preference },
    document: Object.assign(new EventTarget(), { hidden: false }),
  });
  const moves: string[] = [];
  let finish = () => {};
  const surface = {
    animate(_frames: Keyframe[], options: KeyframeAnimationOptions) {
      moves.push(options.id!);
      const finished = new Promise<void>(resolve => { finish = resolve; });
      return { finished, cancel: finish };
    },
  } as unknown as HTMLElement;
  return { run, surface, moves, finish: () => finish(), preference };
}

test("the old page exits before the destination commits and enters", async () => {
  const page = browser();
  const committed = Promise.withResolvers<void>();
  const done = page.run(() => page.surface, () => {
    page.moves.push("commit");
    committed.resolve();
  }, new AbortController().signal);
  expect(page.moves).toEqual(["interfold-page-out"]);
  page.finish();
  await committed.promise;
  expect(page.moves).toEqual(["interfold-page-out", "commit", "interfold-page-in"]);
  page.finish();
  await done;
});

test("a superseded exit never commits its stale destination", async () => {
  const page = browser();
  const controller = new AbortController();
  const done = page.run(() => page.surface, () => { page.moves.push("stale"); }, controller.signal);
  controller.abort();
  await done;
  expect(page.moves).toEqual(["interfold-page-out"]);
});

test("reduced motion commits without waiting for either animation", async () => {
  const page = browser(true);
  await page.run(() => page.surface, () => { page.moves.push("commit"); }, new AbortController().signal);
  expect(page.moves).toEqual(["commit"]);
});
