import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "motion/react";

import { BendingChevron } from "../../../packages/site-header/lib/index.js";

import { ExternalArrowSlide } from "../../../packages/site-header/lib/motion";

// The rounded rectangle expands downwards into the same menu surface.
const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
];

// A native <button> takes cursor:default, not pointer, so this one gave no
// sign it could be pressed. The hover was no help either: #1c2426 against
// #121718 is a luminance ratio of 1.145, which is not a change anyone sees.
const REST = "#121718";
const HOVER = "#2b373b";

const OPEN_MS = 200;
const OPEN_EASING = "cubic-bezier(0.33, 0, 0.2, 1)";

export function NetworkMenu({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Tracked rather than left to the UA ring. The button carries no background
  // of its own any more, so a default ring draws a bare rectangle across a
  // shape that has none — and it paints on a plain :focus too, which is a
  // mouse click.
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const reducedMotion = useReducedMotion();
  const radius = "var(--site-action-radius)";
  const [menuHeight, setMenuHeight] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const menu = menuRef.current;
    if (!button || !menu) {
      return undefined;
    }
    const measure = () => {
      setMenuHeight(menu.getBoundingClientRect().height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(menu);
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
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

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [close, isOpen]);

  // How much of the shape is folded away. One number drives both the shape and
  // the links, in pixels rather than percentages, so the two clip edges sit on
  // the same line at every point of the move.
  const folded = isOpen ? 0 : menuHeight;
  // The links need their own value for the one frame before the measuring
  // effect runs — effects run after paint, and folding by a height that is
  // still zero is not a closed menu, it is an open one. The menu was painting
  // open on load and snapping shut. 100% of the links' own box needs no
  // measurement, and once measured it resolves to the very same line, so
  // nothing moves when it is swapped for the pixel count.
  const linksFolded = isOpen ? "0px" : menuHeight ? `${menuHeight}px` : "100%";

  return (
    // The button stays in flow so this box has the control's height and width; the
    // shape hangs below it, out of flow, so the 63px header never stretches.
    <div className={`relative ${className}`} ref={rootRef}>
      {/* One surface keeps the same 6px corners while the panel unfolds. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          backgroundColor: !isOpen && isHovered ? HOVER : REST,
          clipPath: `inset(0 0 ${folded}px 0 round ${radius})`,
          height: `calc(100% + ${menuHeight}px)`,
          transitionDuration: reducedMotion ? "0ms" : `${OPEN_MS}ms, 150ms`,
          transitionProperty: "clip-path, background-color",
          transitionTimingFunction: `${OPEN_EASING}, ease`,
        }}
      />

      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="site-header-pill site-header-pill-type site-header-network-trigger relative z-10 w-full cursor-pointer text-[#d9fce8]"
        onBlur={() => setHasKeyboardFocus(false)}
        onClick={() => setIsOpen((current) => !current)}
        onFocus={(event) => setHasKeyboardFocus(event.target.matches(":focus-visible"))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={buttonRef}
        style={{
          // Nothing paints here — the shape behind does. The radius is only so
          // the focus ring follows the same rounded rectangle, and the
          // ring is drawn inside the edge so it never crosses the panel.
          borderRadius: isOpen ? `${radius} ${radius} 0px 0px` : `${radius}`,
          outline: hasKeyboardFocus ? "2px solid #82f5ad" : "none",
          outlineOffset: "-3px",
        }}
        type="button"
      >
        <span>
          Network Alpha
        </span>
        <BendingChevron
          open={isOpen}
          width={9}
          thickness={0.9}
          className="ml-auto"
          style={{ top: "0.0246em" }}
        />
      </button>

      <div
        className={`absolute inset-x-0 top-full z-10 ${isOpen ? "" : "pointer-events-none"}`}
        style={{
          clipPath: `inset(0 0 ${linksFolded} 0 round 0 0 ${radius} ${radius})`,
          transitionDuration: reducedMotion ? "0ms" : `${OPEN_MS}ms`,
          transitionProperty: "clip-path",
          transitionTimingFunction: OPEN_EASING,
        }}
      >
        <div className="site-header-network-menu" ref={menuRef} role="menu">
          {NETWORK_LINKS.map((link) => (
            <a
              aria-hidden={!isOpen}
              className="group site-header-network-item"
              href={link.href}
              key={link.href}
              onClick={close}
              rel="noopener noreferrer"
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              target="_blank"
            >
              <span>{link.label}</span>
              {/* Pushed down, not up like the nav's: these rows are items-center, so
                  the arrow was already riding 1.2px above the x-height line
                  rather than sitting below it. Measured either way. */}
              <ExternalArrowSlide className="relative top-[0.0875em] inline-block h-[14px] w-[14px] shrink-0 overflow-hidden text-[14px] leading-none text-current" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
