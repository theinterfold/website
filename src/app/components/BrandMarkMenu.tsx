import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";

import { ExternalArrowSlide } from "./HoverArrowLink";

// Right-clicking the wordmark or the mark opens this instead of the browser's
// own menu — the same move Vercel, Linear and Figma answer, and the one people
// who need the logo already try first. Left click still goes home.
//
// The files handed out are the brand kit's own `dark` variants, byte for byte,
// not a serialisation of the SVG the header happens to be painting. The header
// tints its copy Fold Green through currentColor; the official mark is #252525,
// and that is what someone asking for "the logo" should get.
type BrandMark = "symbol" | "wordmark";

type MenuState = {
  mark: BrandMark;
  x: number;
  y: number;
};

const BRAND_KIT_HREF = "https://github.com/theinterfold/brand-kit";

// Copying gives you the one mark you right-clicked. Downloading gives you the
// set — because the file someone actually needs is usually the lockup, and
// they landed on whichever mark the header happened to put under their cursor.
//
// Four formats in the three standard colour variants, SVG only, 25KB. Built
// from the brand kit's Logo/ folder; the PNGs, the special-use variants, the
// swatches and the key visuals all stay in the kit itself.
const LOGO_PACK = { href: "/brand/interfold-logos.zip", name: "interfold-logos.zip" };

const MARK_ASSETS: Record<BrandMark, { href: string; name: string; noun: string }> = {
  symbol: { href: "/brand/interfold-symbol-dark.svg", name: "interfold-symbol-dark.svg", noun: "symbol" },
  wordmark: { href: "/brand/interfold-wordmark-dark.svg", name: "interfold-wordmark-dark.svg", noun: "wordmark" },
};

// Kept outside the component so the fetch survives the menu closing and
// reopening. It also has to have landed *before* the copy is clicked: Safari
// drops the user activation across an await, so a fetch started inside the
// click handler writes to a clipboard it is no longer allowed to touch. The
// contextmenu that opens the menu is the gesture, so the file is pulled then.
const svgSourceCache = new Map<string, Promise<string>>();

function loadSvgSource(href: string) {
  const cached = svgSourceCache.get(href);

  if (cached) {
    return cached;
  }

  const pending = fetch(href).then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load ${href}`);
    }

    return response.text();
  });

  // A failed load must not poison the cache, or the menu never recovers.
  pending.catch(() => svgSourceCache.delete(href));
  svgSourceCache.set(href, pending);

  return pending;
}

const EDGE_MARGIN = 12;
// 14px Gramercy, the size the "Run a ciphernode" and "Build on Interfold"
// buttons are set in — the smallest type the site uses for something you press.
// The nav's 22px is a headline size and read enormous in a menu this near the
// cursor.
const ROW_CLASS =
  "group flex w-full cursor-pointer items-center gap-[9px] whitespace-nowrap px-[13px] py-[6px] text-left font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#d9fce8] transition-colors hover:bg-[#2b373b] hover:text-[#82f5ad] focus-visible:bg-[#2b373b] focus-visible:text-[#82f5ad] focus-visible:outline-none";
// Muted at rest like the arrows in the network pill, so a row reads label
// first and the glyph second. Both come up to Signal together on hover.
const ICON_CLASS = "shrink-0 text-[#687d71] transition-colors group-hover:text-[#82f5ad] group-focus-visible:text-[#82f5ad]";

// Drawn rather than borrowed: 12px boxes on the same fine stroke as the site's
// own line work, so they sit next to Gramercy at 14px without shouting.
function RowIcon({ name }: { name: "check" | "copy" | "download" }) {
  return (
    <svg
      aria-hidden="true"
      className={ICON_CLASS}
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 12 12"
      width="12"
    >
      {name === "copy" && (
        <>
          <rect height="6.4" rx="1.2" width="6.4" x="4.2" y="1.4" />
          <path d="M8.1 8.6v1.5c0 .6-.5 1.1-1.1 1.1H2.9c-.6 0-1.1-.5-1.1-1.1V6c0-.6.5-1.1 1.1-1.1h1.5" />
        </>
      )}
      {name === "download" && (
        <>
          <path d="M6 1.5v5.9" />
          <path d="M3.6 5.2 6 7.6l2.4-2.4" />
          <path d="M1.9 10.3h8.2" />
        </>
      )}
      {name === "check" && <path d="M2.2 6.3 4.7 8.8l5.1-5.6" />}
    </svg>
  );
}

export function useBrandMarkMenu() {
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    setMenu(null);
    setPosition(null);
    setCopied(false);
  }, []);

  const openAt = useCallback((event: ReactMouseEvent, mark: BrandMark) => {
    // Shift+right-click is the browser's own escape hatch back to the native
    // menu in Firefox; leave it alone.
    if (event.shiftKey) {
      return;
    }

    event.preventDefault();
    loadSvgSource(MARK_ASSETS[mark].href).catch(() => undefined);
    setCopied(false);
    setPosition(null);
    setMenu({ mark, x: event.clientX, y: event.clientY });
  }, []);

  // Placed after it can be measured, so a right-click near the right or bottom
  // edge folds the menu back over the cursor instead of off the page.
  useLayoutEffect(() => {
    const node = menuRef.current;

    if (!menu || !node) {
      return;
    }

    const { height, width } = node.getBoundingClientRect();
    const left = menu.x + width + EDGE_MARGIN > window.innerWidth ? menu.x - width : menu.x;
    const top = menu.y + height + EDGE_MARGIN > window.innerHeight ? menu.y - height : menu.y;

    setPosition({
      left: Math.max(EDGE_MARGIN, left),
      top: Math.max(EDGE_MARGIN, top),
    });
  }, [menu]);

  useEffect(() => {
    if (!menu) {
      return undefined;
    }

    const closeOnOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    // Anchored to a point in the viewport, so anything that moves the page out
    // from under it closes it rather than leaving it stranded.
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [close, menu]);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const copySvg = useCallback(
    async (mark: BrandMark) => {
      try {
        const source = await loadSvgSource(MARK_ASSETS[mark].href);
        await navigator.clipboard.writeText(source);
        setCopied(true);
        copiedTimer.current = window.setTimeout(close, 700);
      } catch {
        // Nothing to say here that the menu can say usefully — the download
        // row is right underneath and does the same job without the clipboard.
        close();
      }
    },
    [close],
  );

  const trigger = useCallback(
    (mark: BrandMark) => ({
      onContextMenu: (event: ReactMouseEvent) => openAt(event, mark),
    }),
    [openAt],
  );

  const element =
    menu && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed z-[100] min-w-[164px] overflow-hidden rounded-[10px] bg-[#121718] py-[5px] shadow-[0_12px_32px_rgba(18,23,24,0.28)]"
            onContextMenu={(event) => event.preventDefault()}
            ref={menuRef}
            role="menu"
            style={{
              left: `${position?.left ?? menu.x}px`,
              opacity: position ? 1 : 0,
              top: `${position?.top ?? menu.y}px`,
            }}
          >
            {/* The labels are short because the row already says which mark it
                means — you right-clicked it. The long form stays on aria-label,
                where the icon carries nothing and the mark has to be named. */}
            <button
              aria-label={`Copy ${MARK_ASSETS[menu.mark].noun} as SVG`}
              className={ROW_CLASS}
              onClick={() => copySvg(menu.mark)}
              role="menuitem"
              type="button"
            >
              <RowIcon name={copied ? "check" : "copy"} />
              <span>{copied ? "Copied" : "Copy SVG"}</span>
            </button>
            <a
              aria-label="Download the Interfold logos as a zip of SVGs"
              className={ROW_CLASS}
              download={LOGO_PACK.name}
              href={LOGO_PACK.href}
              onClick={close}
              role="menuitem"
            >
              <RowIcon name="download" />
              <span>Download logos</span>
            </a>
            <div aria-hidden="true" className="my-[5px] h-px bg-[#2b373b]" />
            <a className={ROW_CLASS} href={BRAND_KIT_HREF} onClick={close} role="menuitem">
              {/* No glyph here — the mark read denser than the two stroke icons
                  above it. The box stays, so the label keeps the same left edge
                  as the other two rather than sliding in on its own. */}
              <span aria-hidden="true" className="w-[12px] shrink-0" />
              <span>Brand Assets</span>
              <ExternalArrowSlide className="relative top-[0.0875em] ml-auto inline-block h-[11px] w-[11px] shrink-0 overflow-hidden text-[11px] leading-none text-[#687d71] transition-colors group-hover:text-[#82f5ad]" rowClassName="h-[11px] w-[11px] leading-none" />
            </a>
          </div>,
          document.body,
        )
      : null;

  return { element, trigger };
}
