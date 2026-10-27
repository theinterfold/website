import { useState } from "react";
import { useBeforePaint } from "./entrance";
import type { SiteHeaderChromeProps } from "./types";

type Layout = NonNullable<SiteHeaderChromeProps["layout"]>;
const isLayout = (value: unknown): value is Layout =>
  typeof value === "string" && ["current", "lockup", "compact", "divided"].includes(value);
// Existing palette roles from DESIGN.md; only the Governance suffix changes.
const governanceColors = { sage: "#687d71", green50: "rgb(58 94 60 / 50%)", green65: "rgb(58 94 60 / 65%)", green80: "rgb(58 94 60 / 80%)", secondary: "#737d7e", dark: "#252525", green: "#3a5e3c", coral: "#a84932", muted: "#596364", grey: "#7a7d77", signal: "#82f5ad" };
const isColor = (value: unknown): value is keyof typeof governanceColors =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(governanceColors, value);

const isTypeSize = (value: unknown): value is string =>
  typeof value === "string" && ["auto", "16", "18", "20", "22", "24"].includes(value);

/** Opt-in review bridge. Normal product URLs use the approved lockup, 24px type and 65% green suffix. */
export function useHeaderLayout(explicit?: Layout): Layout {
  const [studyLayout, setStudyLayout] = useState<Layout>("lockup");
  useBeforePaint(() => {
    const query = new URLSearchParams(window.location.search);
    const embeddedStudy = window.parent !== window && ["interfold-navbar-study", "governance-navbar-study"].includes(window.name);
    if (query.get("navbarStudy") !== "1" && !embeddedStudy) return;
    const read = (key: string) => { try { return embeddedStudy ? sessionStorage.getItem(key) : null; } catch { return null; } };
    const save = (key: string, value: string) => { try { if (embeddedStudy) sessionStorage.setItem(key, value); } catch { /* Storage is optional. */ } };
    const initial = query.get("navbarLayout") ?? read("navbar-study-layout");
    if (isLayout(initial)) setStudyLayout(initial);
    const applyColor = (color: keyof typeof governanceColors) => {
      document.documentElement.style.setProperty("--site-governance-ink", governanceColors[color]);
      save("navbar-study-color", color);
    };
    const initialColor = query.get("navbarColor") ?? read("navbar-study-color");
    if (isColor(initialColor)) applyColor(initialColor);
    const applyTypeSize = (size: string) => {
      const root = document.documentElement;
      if (size === "auto") {
        root.style.removeProperty("--site-study-type-size");
        root.removeAttribute("data-navbar-type-size");
      } else {
        root.style.setProperty("--site-study-type-size", `${size}px`);
        root.setAttribute("data-navbar-type-size", size);
      }
      save("navbar-study-type-size", size);
    };
    const initialTypeSize = query.get("navbarTypeSize") ?? read("navbar-study-type-size");
    if (isTypeSize(initialTypeSize)) applyTypeSize(initialTypeSize);
    // Only the embedding local review page may drive the comparison.
    let parentOrigin: string;
    try { parentOrigin = read("navbar-study-parent") ?? new URL(document.referrer).origin; } catch { return; }
    if (!["localhost", "127.0.0.1"].includes(new URL(parentOrigin).hostname)) return;
    save("navbar-study-parent", parentOrigin);
    const receive = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== parentOrigin) return;
      if (event.data?.type === "interfold:navbar-replay") {
        window.dispatchEvent(new Event("interfold:navbar-replay"));
        return;
      }
      if (event.data?.type !== "interfold:navbar-layout" || !isLayout(event.data.layout)) return;
      setStudyLayout(event.data.layout);
      save("navbar-study-layout", event.data.layout);
      const url = new URL(window.location.href);
      url.searchParams.set("navbarLayout", event.data.layout);
      if (isColor(event.data.governanceColor)) {
        applyColor(event.data.governanceColor);
        url.searchParams.set("navbarColor", event.data.governanceColor);
      }
      if (isTypeSize(event.data.typeSize)) {
        applyTypeSize(event.data.typeSize);
        url.searchParams.set("navbarTypeSize", event.data.typeSize);
      }
      window.history.replaceState(window.history.state, "", url);
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "interfold:navbar-ready" }, parentOrigin);
    return () => window.removeEventListener("message", receive);
  }, []);
  return explicit ?? studyLayout;
}
