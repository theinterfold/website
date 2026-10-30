import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NetworkMenu } from "../src/app/components/NetworkMenu";

test("server-rendered Network menu starts closed and outside the tab order", () => {
  const html = renderToStaticMarkup(createElement(NetworkMenu));
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('aria-hidden="true"');
  expect(html).toContain('data-open="false"');
  expect(html.match(/tabindex="-1"/g)).toHaveLength(2);
  const menuId = html.match(/aria-controls="([^"]+)"/)![1];
  expect(html).toContain(`id="${menuId}"`);
});
