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

// The chevron bends instead of turning. Two rounded bars, each pinned at the
// midpoint of its own arm, swing from +A to -A and so pass through a straight
// line on the way over — the iOS arrowhead, not a glyph spinning 180 degrees.
//
// Sized off the rows' arrows rather than chosen: the glyph measures 7.5px of
// ink with a stroke around 0.8px, so the chevron carries the same weight and
// sits in the same box instead of reading twice as heavy.
const CHEVRON_WIDTH = 9;
const CHEVRON_ANGLE = 45;
const CHEVRON_WEIGHT = 0.9;

const CHEVRON_HALF = CHEVRON_WIDTH / 2;
const CHEVRON_RAD = (CHEVRON_ANGLE * Math.PI) / 180;
const CHEVRON_ARM = CHEVRON_HALF / Math.cos(CHEVRON_RAD);
const CHEVRON_DROP = CHEVRON_HALF * Math.tan(CHEVRON_RAD);
const CHEVRON_HEIGHT = CHEVRON_DROP + CHEVRON_WEIGHT;

function chevronArm(isLeft: boolean, isOpen: boolean) {
  const centre = isLeft ? CHEVRON_HALF / 2 : (3 * CHEVRON_HALF) / 2;
  const turn = (isLeft ? 1 : -1) * (isOpen ? -CHEVRON_ANGLE : CHEVRON_ANGLE);
  return {
    backgroundColor: "currentColor",
    borderRadius: `${CHEVRON_WEIGHT / 2}px`,
    height: `${CHEVRON_WEIGHT}px`,
    left: `${centre - CHEVRON_ARM / 2}px`,
    position: "absolute" as const,
    top: `${CHEVRON_DROP / 2 - CHEVRON_WEIGHT / 2}px`,
    transform: `rotate(${turn}deg)`,
    transitionDuration: `${OPEN_MS}ms`,
    transitionProperty: "transform",
    transitionTimingFunction: OPEN_EASING,
    width: `${CHEVRON_ARM}px`,
  };
}

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
  // The links need their own value for the one frame before the measuring
  // effect runs — effects run after paint, and folding by a height that is
  // still zero is not a closed menu, it is an open one. The menu was painting
  // open on load and snapping shut. 100% of the links' own box needs no
  // measurement, and once measured it resolves to the very same line, so
  // nothing moves when it is swapped for the pixel count.
  const linksFolded = isOpen ? "0px" : menuHeight ? `${menuHeight}px` : "100%";

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
        <span
          aria-hidden="true"
          className="relative ml-auto block shrink-0"
          style={{ height: `${CHEVRON_HEIGHT}px`, width: `${CHEVRON_WIDTH}px` }}
        >
          <span style={chevronArm(true, isOpen)} />
          <span style={chevronArm(false, isOpen)} />
        </span>
      </button>

      <div
        className={`absolute inset-x-0 top-full z-10 ${isOpen ? "" : "pointer-events-none"}`}
        style={{
          clipPath: `inset(0 0 ${linksFolded} 0 round 0 0 ${capRadius}px ${capRadius}px)`,
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
