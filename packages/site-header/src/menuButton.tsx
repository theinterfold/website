import type { SiteHeaderMenuButtonProps } from "./types";

/** Same markup, geometry and entrance registration in both applications. */
export function SiteHeaderMenuButton({ open, onOpenChange, variant = "responsive", className = "", id, action }: SiteHeaderMenuButtonProps) {
  return (
    <div id={id} className={`site-header-menu-trigger interfold-mobile-menu-trigger ${className}`}
      data-header-menu-trigger={variant} data-ready="false" suppressHydrationWarning>
      {action && <div className="site-header-menu-action" data-menu-open={open}>{action}</div>}
      <button
        type="button"
        className="hamburger-react"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      />
    </div>
  );
}
