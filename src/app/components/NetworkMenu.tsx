import { useEffect, useRef, useState } from "react";

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

export function NetworkMenu({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    // The button stays in flow so this box has the pill's width; the part that
    // grows hangs below it, out of flow, so the 63px header never stretches.
    <div className={`relative ${className}`} ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex w-full items-center gap-[10px] bg-[#121718] py-[9px] pl-[16px] pr-[13px] text-[#d9fce8] transition-colors hover:bg-[#1c2426] ${
          isOpen ? "rounded-t-[22px]" : "rounded-full"
        }`}
        onClick={() => setIsOpen((current) => !current)}
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
          className={`ml-auto h-[9px] w-[14px] shrink-0 transition-transform duration-200 ${isOpen ? "-scale-y-100" : ""}`}
          fill="none"
          focusable="false"
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
          read as one shape rather than a panel under a pill. 0fr to 1fr animates
          the height without anything having to measure it. */}
      <div
        className={`absolute right-0 top-full z-50 grid w-full rounded-b-[22px] bg-[#121718] transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden rounded-b-[22px]">
          <div className="pb-2" role="menu">
            {NETWORK_LINKS.map((link) => (
              <a
                aria-hidden={!isOpen}
                className="group flex items-center justify-between gap-6 whitespace-nowrap px-[16px] py-[8px] font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.05] tracking-[-0.5px] text-[#d9fce8] transition-colors hover:bg-[#1c2426] hover:text-[#82f5ad]"
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
                rel="noopener noreferrer"
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                target="_blank"
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="text-[14px] leading-none text-[#687d71] transition-colors group-hover:text-[#82f5ad]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
