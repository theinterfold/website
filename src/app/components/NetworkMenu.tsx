import { useCallback, useEffect, useRef, useState } from "react";

import { ExternalArrowSlide } from "./HoverArrowLink";

// The live-network surfaces used to be two links in the white strip. They are now
// one control in the nav: a pill that grows downwards when you open it, so both
// destinations sit inside the same shape.
//
// The two labels are short enough to fit the pill's own width, so the shape only
// ever has to grow in one direction — "Network dashboard" did not fit and was
// being clipped, which is why it is just "Dashboard" here.
const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
];

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
  // Half the pill's height, and the height of the part that unfolds. Both
  // measured: the pill's height falls out of its padding and line box, and a
  // radius written in by hand gets clamped the moment two corners on one edge
  // do not fit inside it.
  const [capRadius, setCapRadius] = useState(20);
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
      setCapRadius(button.getBoundingClientRect().height / 2);
      setMenuHeight(menu.getBoundingClientRect().height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(button);
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

  return (
    // The button stays in flow so this box has the pill's height and width; the
    // shape hangs below it, out of flow, so the 63px header never stretches.
    <div className={`relative ${className}`} ref={rootRef}>
      {/*
        Pill and panel are one painted shape, not a pill sitting on a panel.
        Drawn separately they meet along an edge, and that edge was the whole
        problem: the pill's corners curve inwards, so the page read straight
        through them into a step, and backing the pill with a square-cornered
        patch to hide the step hid the corners' own movement with it — measured
        off a screen recording, the corner sat square for the entire collapse
        and jumped round in a single frame.

        As one shape there is no edge. The corners are the clip's own, so they
        keep the same radius throughout and travel with the growing bottom.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          backgroundColor: !isOpen && isHovered ? "#1c2426" : "#121718",
          clipPath: `inset(0 0 ${folded}px 0 round ${capRadius}px)`,
          height: `calc(100% + ${menuHeight}px)`,
          transitionDuration: `${OPEN_MS}ms, 150ms`,
          transitionProperty: "clip-path, background-color",
          transitionTimingFunction: `${OPEN_EASING}, ease`,
        }}
      />

      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="relative z-10 flex w-full items-center gap-[10px] py-[9px] pl-[16px] pr-[13px] text-[#d9fce8]"
        onBlur={() => setHasKeyboardFocus(false)}
        onClick={() => setIsOpen((current) => !current)}
        onFocus={(event) => setHasKeyboardFocus(event.target.matches(":focus-visible"))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={buttonRef}
        style={{
          // Nothing paints here — the shape behind does. The radius is only so
          // the focus ring traces the pill instead of the button's box, and the
          // ring is drawn inside the edge so it never crosses the panel.
          borderRadius: isOpen ? `${capRadius}px ${capRadius}px 0px 0px` : `${capRadius}px`,
          outline: hasKeyboardFocus ? "2px solid #82f5ad" : "none",
          outlineOffset: "-3px",
        }}
        type="button"
      >
        {/* Same live dot the strip carries, glow and all. */}
        <span
          aria-hidden="true"
          className="relative size-2 shrink-0 rounded-full bg-[#82f5ad] shadow-[0_0_8px_2px_rgba(130,245,173,0.6)] before:absolute before:inset-[-2px] before:rounded-full before:bg-[#82f5ad]/45 before:animate-ping motion-reduce:before:animate-none"
        />
        <span className="font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] whitespace-nowrap">
          Network Alpha
        </span>
        <svg
          aria-hidden="true"
          className="ml-auto h-[9px] w-[14px] shrink-0"
          fill="none"
          focusable="false"
          // Turned rather than flipped. Scaling y from 1 to -1 passes through
          // zero, so the chevron folded flat halfway and unfolded again.
          style={{
            rotate: isOpen ? "180deg" : "0deg",
            transitionDuration: `${OPEN_MS}ms`,
            transitionProperty: "rotate",
            transitionTimingFunction: OPEN_EASING,
          }}
          viewBox="0 0 14 9"
        >
          <polyline
            points="1 1.5 7 7.5 13 1.5"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div
        className={`absolute inset-x-0 top-full z-10 ${isOpen ? "" : "pointer-events-none"}`}
        style={{
          clipPath: `inset(0 0 ${folded}px 0 round 0 0 ${capRadius}px ${capRadius}px)`,
          transitionDuration: `${OPEN_MS}ms`,
          transitionProperty: "clip-path",
          transitionTimingFunction: OPEN_EASING,
        }}
      >
        {/*
          The rows carry the pill's own padding, so all three are the same
          height and the bottom cap is the top cap mirrored. Nothing is padded
          in under the last one: a strip no row owns ends the hover flat partway
          down the corner arc, and the corner stops reading as round.
        */}
        <div ref={menuRef} role="menu">
          {NETWORK_LINKS.map((link) => (
            <a
              aria-hidden={!isOpen}
              className="group flex items-center justify-between gap-6 whitespace-nowrap py-[9px] pl-[16px] pr-[13px] font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] text-[#d9fce8] transition-colors hover:bg-[#1c2426] hover:text-[#82f5ad]"
              href={link.href}
              key={link.href}
              onClick={close}
              rel="noopener noreferrer"
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              target="_blank"
            >
              <span>{link.label}</span>
              <ExternalArrowSlide className="relative inline-block h-[14px] w-[14px] shrink-0 overflow-hidden text-[14px] leading-none text-[#687d71] transition-colors group-hover:text-[#82f5ad]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
