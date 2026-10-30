import { useCallback, useEffect, useId, useRef, useState } from "react";

import { BendingChevron } from "../../../packages/site-header/lib/index.js";
import { ArrowSlide, ExternalArrowSlide, SiteDropdownPanel } from "../../../packages/site-header/lib/motion";

const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
];

export function NetworkMenu({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pendingFocus = useRef<number | null>(null);
  const close = useCallback(() => setIsOpen(false), []);

  const focusItem = (index: number) => {
    menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')[index]?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [close, isOpen]);

  return (
    <div
      className={`relative ${className}`}
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="group site-header-pill site-header-pill-type site-header-network-trigger relative z-10 w-full cursor-pointer"
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const index = event.key === "ArrowDown" ? 0 : NETWORK_LINKS.length - 1;
            if (isOpen) focusItem(index);
            else {
              pendingFocus.current = index;
              setIsOpen(true);
            }
          }
        }}
        ref={buttonRef}
        type="button"
      >
        <span>Network Alpha</span>
        <ArrowSlide
          className="relative top-[0.0246em] ml-auto inline-block h-[14px] w-[9px] overflow-hidden"
          rowClassName="flex h-[14px] w-[9px] items-center"
        >
          <BendingChevron open={isOpen} width={9} thickness={0.9} />
        </ArrowSlide>
      </button>

      <SiteDropdownPanel
        aria-label="Network Alpha"
        className="site-header-network-menu"
        open={isOpen}
        id={menuId}
        panelRef={menuRef}
        role="menu"
        onKeyDown={(event) => {
          const items = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'));
          const current = items.indexOf(document.activeElement as HTMLAnchorElement);
          let next: number;
          if (event.key === "ArrowDown") next = (current + 1) % items.length;
          else if (event.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = items.length - 1;
          else return;
          event.preventDefault();
          items[next]?.focus();
        }}
      >
        {NETWORK_LINKS.map((link) => (
          <a
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
            <ExternalArrowSlide className="relative top-[0.0875em] inline-block h-[14px] w-[14px] shrink-0 overflow-hidden text-[14px] leading-none text-current" />
          </a>
        ))}
      </SiteDropdownPanel>
    </div>
  );
}
