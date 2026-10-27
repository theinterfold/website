import { useEffect, useRef } from "react";

/** Shared full-screen menu behavior. Destinations and presentation belong to each site. */
export function useMobileMenuBehavior(open: boolean, onOpenChange?: (open: boolean) => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    const previous = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    };
    const controls = () => [
      ...Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]',
      ) ?? []),
      document.querySelector<HTMLElement>(".interfold-mobile-menu-trigger [role='button']"),
    ].filter((item): item is HTMLElement => !!item && item.tabIndex >= 0 && item.getAttribute("aria-hidden") !== "true");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange?.(false);
      }
      if (event.key !== "Tab") return;
      const items = controls();
      const current = items.indexOf(document.activeElement as HTMLElement);
      event.preventDefault();
      const next = current < 0 ? (event.shiftKey ? items.length - 1 : 0)
        : (current + (event.shiftKey ? -1 : 1) + items.length) % items.length;
      items[next]?.focus({ preventScroll: true });
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!dialogRef.current?.contains(target) && !target.closest(".interfold-mobile-menu-trigger")) {
        controls()[0]?.focus({ preventScroll: true });
      }
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("focusin", onFocus);
    controls()[0]?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onDesktop = () => { if (desktop.matches) onOpenChange?.(false); };
    desktop.addEventListener("change", onDesktop);
    onDesktop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("focusin", onFocus);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      document.body.style.overflow = previous.overflow;
      document.documentElement.style.overflow = previous.htmlOverflow;
      window.scrollTo(0, scrollY);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open, onOpenChange]);
  return dialogRef;
}
