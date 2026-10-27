import { Cross as Hamburger } from "hamburger-react";
import { useSyncExternalStore } from "react";
import type { SiteHeaderMenuButtonProps } from "./types";

function subscribe(callback: () => void) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Same markup, geometry and entrance registration in both applications. */
export function SiteHeaderMenuButton({ open, onOpenChange, variant = "responsive", className = "" }: SiteHeaderMenuButtonProps) {
  const reducedMotion = useSyncExternalStore(subscribe, reduced, () => true);
  return (
    <div className={`site-header-menu-trigger interfold-mobile-menu-trigger ${className}`}
      data-header-menu-trigger={variant} data-ready="false" suppressHydrationWarning>
      <Hamburger toggled={open} toggle={onOpenChange} direction="right"
        size={28} distance="sm" duration={reducedMotion ? 0 : .35}
        color="var(--site-chrome-ink)" rounded
        label={open ? "Close menu" : "Open menu"} />
    </div>
  );
}
