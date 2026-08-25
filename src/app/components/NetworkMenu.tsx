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
  // The pill's bottom corners curve inwards. Once anything is showing below
  // them, the page reads straight through that curve and the two shapes meet
  // in a step. The control's own box is backed with the panel's colour for as
  // long as there is a panel to join — derived rather than set from an effect,
  // because effects run after paint and that left the step showing for the
  // first frame of every open.
  const [isCollapsing, setIsCollapsing] = useState(false);
  const isJoined = isOpen || isCollapsing;
  // Half the pill's height, measured rather than guessed. A radius larger than
  // this gets clamped, and the clamp only bites while the bottom corners are
  // still round — so a written-in 24px rendered as the pill's own 20.5px when
  // closed and opened out to a full 24, and the top corners visibly changed
  // shape between the two states. At exactly half the height nothing clamps in
  // either state, so one radius serves the pill, the open shape and the panel.
  const [capRadius, setCapRadius] = useState(20);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = buttonRef.current;
    if (!node) {
      return undefined;
    }
    const measure = () => setCapRadius(node.getBoundingClientRect().height / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Every close goes through here so the join survives the collapse whichever
  // way it was triggered — the button, a click outside, Escape, or a link.
  const close = useCallback(() => {
    setIsCollapsing(true);
    setIsOpen(false);
  }, []);

  // Normally cleared by the panel's own transitionend, which is exact. This is
  // only here for the case where that never arrives — a timer racing a
  // transition of the same length can fire a frame early, and a frame early
  // means one frame of the step.
  useEffect(() => {
    if (!isCollapsing) {
      return undefined;
    }
    const timer = window.setTimeout(() => setIsCollapsing(false), OPEN_MS + 150);
    return () => window.clearTimeout(timer);
  }, [isCollapsing]);

  useEffect(() => {
    if (!isOpen) {
      return;
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

  return (
    // The button stays in flow so this box has the pill's width; the part that
    // grows hangs below it, out of flow, so the 63px header never stretches.
    <div
      // Rounded to the open shape's 24px rather than the pill's 22px, so this
      // never pokes out past the button sitting on top of it.
      className={`relative ${isJoined ? "bg-[#121718]" : ""} ${className}`}
      ref={rootRef}
      style={{
        // Rounded a shade tighter than the button so it stays tucked behind it
        // at the top, and square at the bottom so it fills the corners there.
        borderTopLeftRadius: `${capRadius + 2}px`,
        borderTopRightRadius: `${capRadius + 2}px`,
      }}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex w-full items-center gap-[10px] bg-[#121718] py-[9px] pl-[16px] pr-[13px] text-[#d9fce8] ${
          // Tinting only the top of the shape put a seam across the join, since
          // the panel below it stays #121718.
          isJoined ? "" : "hover:bg-[#1c2426]"
        }`}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        // The closed radius is written out rather than left to rounded-full,
        // which resolves to 1.6e7px: nothing interpolates from there, so the
        // corners could only ever snap, and opening and closing had to snap at
        // different moments to stay out of the panel's way. 22px against a
        // 41px pill clamps to the same shape and does tween, so both
        // directions are now the same 200ms move.
        ref={buttonRef}
        style={{
          borderRadius: isOpen ? `${capRadius}px ${capRadius}px 0px 0px` : `${capRadius}px`,
          transitionDuration: `150ms, ${OPEN_MS}ms`,
          transitionProperty: "background-color, border-radius",
          transitionTimingFunction: `ease, ${OPEN_EASING}`,
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
          // zero, so the chevron folded flat halfway and unfolded again —
          // measured at 70ms into the close it was at scaleY -0.08. A turn
          // sweeps to the same place without ever losing its shape, and on the
          // same curve as the corners instead of Tailwind's own.
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

      {/* Same width and colour as the button and flush against it, so the two
          read as one shape rather than a panel under a pill.
          The reveal is a clip rather than the 0fr-to-1fr grid trick it used to
          be: interpolating grid-template-rows re-runs layout on every frame,
          which is what made this stutter. clip-path animates on the compositor,
          and carrying the same 24px on the clip's own bottom corners keeps them
          travelling down with the edge instead of appearing at the end. */}
      <div
        className={`absolute right-0 top-full z-50 w-full overflow-hidden bg-[#121718] ${
          isOpen ? "" : "pointer-events-none"
        }`}
        style={{
          borderBottomLeftRadius: `${capRadius}px`,
          borderBottomRightRadius: `${capRadius}px`,
          clipPath: isOpen
            ? `inset(0 0 0 0 round 0 0 ${capRadius}px ${capRadius}px)`
            : `inset(0 0 100% 0 round 0 0 ${capRadius}px ${capRadius}px)`,
          // The same curve the corners use, so the edge and the corner arrive
          // together instead of drifting apart mid-move.
          transitionDuration: `${OPEN_MS}ms`,
          transitionProperty: "clip-path",
          transitionTimingFunction: OPEN_EASING,
        }}
        onTransitionEnd={(event) => {
          // Links inside bubble their own colour transitions through here.
          if (event.target === event.currentTarget && event.propertyName === "clip-path") {
            setIsCollapsing(false);
          }
        }}
      >
        <div className="pb-2" role="menu">
          {NETWORK_LINKS.map((link) => (
            <a
              aria-hidden={!isOpen}
              className="group flex items-center justify-between gap-6 whitespace-nowrap py-[8px] pl-[16px] pr-[13px] font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] text-[#d9fce8] transition-colors hover:bg-[#1c2426] hover:text-[#82f5ad]"
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
