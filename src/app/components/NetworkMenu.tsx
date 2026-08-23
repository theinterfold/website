import { useEffect, useRef, useState } from "react";

// The live-network surfaces used to be two links in the white strip. They are now
// one control in the nav: a pill that says the network is up, and a chevron that
// opens the two places you can go and see it.
const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Network dashboard", href: "https://dashboard.theinterfold.com/" },
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
    <div className={`relative ${className}`} ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="group inline-flex items-center gap-[10px] rounded-full bg-[#121718] py-[9px] pl-[16px] pr-[13px] text-[#d9fce8] transition-colors hover:bg-[#1c2426]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {/* Same live dot as the strip carried, glow and all. */}
        <span
          aria-hidden="true"
          className="relative size-2 shrink-0 rounded-full bg-[#82f5ad] shadow-[0_0_8px_2px_rgba(130,245,173,0.6)] before:absolute before:inset-[-2px] before:rounded-full before:bg-[#82f5ad]/45 before:animate-ping motion-reduce:before:animate-none"
        />
        <span className="font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] whitespace-nowrap">
          Network Alpha
        </span>
        <svg
          aria-hidden="true"
          className={`h-[9px] w-[14px] shrink-0 transition-transform duration-200 ${isOpen ? "-scale-y-100" : ""}`}
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

      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-full overflow-hidden rounded-[20px] bg-[#121718] py-2"
          role="menu"
        >
          {NETWORK_LINKS.map((link) => (
            <a
              className="group flex items-center justify-between gap-6 whitespace-nowrap px-[16px] py-[9px] font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.05] tracking-[-0.5px] text-[#d9fce8] transition-colors hover:bg-[#1c2426] hover:text-[#82f5ad]"
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
              rel="noopener noreferrer"
              role="menuitem"
              target="_blank"
            >
              <span>{link.label}</span>
              <span aria-hidden="true" className="text-[14px] leading-none text-[#687d71] transition-colors group-hover:text-[#82f5ad]">
                ↗
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
