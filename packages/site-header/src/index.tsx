import type { SiteHeaderChromeProps } from "./types";
import { useHeaderLayout } from "./layoutStudy";
import { useRef, useState } from "react";
import { useBeforePaint } from "./entrance";
import { installHeaderEntranceRuntime } from "./entranceRuntime";
import { HeaderWordmark } from "./wordmark";
import { InterfoldSymbol } from "./symbol";
export { SiteHeaderMenuButton } from "./menuButton";
export { HEADER_ENTRANCE_BOOTSTRAP } from "./entranceRuntime";
export { HeaderWordmark } from "./wordmark";
export { InterfoldSymbol, INTERFOLD_OUTLINE_RATIO, INTERFOLD_SYMBOL_ASPECT_RATIO } from "./symbol";
export { SiteFooter } from "./footer";
export { GhostSignupForm } from "./signup";
export { BendingChevron } from "./chevron";
export { useMobileMenuBehavior } from "./mobileMenu";
export type { SiteHeaderChromeProps, HeaderWordmarkProps, BendingChevronProps } from "./types";
export type { SiteFooterProps, SiteFooterLinkGroup } from "./types";

/** Shared chrome; each application supplies its own destinations and controls. */
export function SiteHeaderChrome({
  variant = "responsive",
  layout,
  governance = false,
  homeHref = "/",
  HomeLink = "a",
  brandLinkProps,
  symbolLinkProps,
  navigation,
  navigationLabel = "Main navigation",
  extendedBrand = governance,
  className = "",
  ...props
}: SiteHeaderChromeProps) {
  const selectedLayout = useHeaderLayout(layout);
  const headerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [entrance, setEntrance] = useState(0);
  useBeforePaint(() => {
    const header = headerRef.current;
    if (!header) return;
    const runtime = installHeaderEntranceRuntime();
    setReady(true);
    setEntrance(runtime.prepare(header).revision);
    const replay = () => setEntrance(runtime.prepare(header, true).revision);
    window.addEventListener("interfold:navbar-replay", replay);
    return () => {
      window.removeEventListener("interfold:navbar-replay", replay);
      runtime.release(header);
    };
  }, [variant]);
  return (
    <header
      {...props}
      ref={headerRef}
      suppressHydrationWarning
      className={`site-header-chrome ${className}`}
      data-ready={ready}
      data-entrance={entrance ? "playing" : "static"}
      data-variant={variant}
      data-layout={selectedLayout}
      data-extended-brand={extendedBrand || undefined}
    >
      <div className="site-header-grid">
        <div className={selectedLayout === "current" ? "site-header-identity" : "site-header-lockup"}>
          <div className="site-header-symbol-slot">
            <HomeLink {...symbolLinkProps} href={homeHref} aria-hidden="true" tabIndex={-1} className="site-header-symbol">
              <InterfoldSymbol animated lockup />
            </HomeLink>
          </div>
          <div className="site-header-brand-slot">
            <HomeLink {...brandLinkProps} href={homeHref} aria-label={governance ? "The Interfold Governance home" : "The Interfold home"} className="site-header-brand">
              <HeaderWordmark governance={governance} />
            </HomeLink>
          </div>
        </div>
        {navigation && (
          <nav aria-label={navigationLabel} className="site-header-navigation">
            {navigation}
          </nav>
        )}
      </div>
    </header>
  );
}
