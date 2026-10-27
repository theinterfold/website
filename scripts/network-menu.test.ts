import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NetworkMenu } from "../src/app/components/NetworkMenu";

test("server-rendered Network menu is closed before any client measurements", () => {
  const html = renderToStaticMarkup(createElement(NetworkMenu));
  const surface = html.match(/<div aria-hidden="true"[^>]*style="([^"]*)"/);
  expect(surface).not.toBeNull();
  expect(surface![1]).toContain("height:100%");
  expect(surface![1]).not.toContain("clip-path");
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('clip-path:inset(0 0 100% 0');
  expect(html.match(/tabindex="-1"/g)).toHaveLength(2);
});
