import { useEffect, useState } from "react";
import { SiteHeaderChrome, SiteHeaderMenuButton, BendingChevron, useMobileMenuBehavior } from "../../../packages/site-header/lib/index.js";
import { useBrandMarkMenu } from "./BrandMarkMenu";
import { MobileMenuTuner, SHOW_MOBILE_MENU_TUNER, useMobileMenuType } from "./MobileMenuTuner";
import { ExternalArrowSlide } from "../../../packages/site-header/lib/motion";

const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
];

export function SiteMobileHeader({
  backgroundClassName = "bg-[#d9fce8]",
  className = "",
}: {
  backgroundClassName?: string;
  className?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const brandMenu = useBrandMarkMenu();
  const dialogRef = useMobileMenuBehavior(isMenuOpen, setIsMenuOpen);


  // Reopening the menu should not remember that the group was left expanded.
  useEffect(() => {
    if (!isMenuOpen) {
      setIsNetworkOpen(false);
    }
  }, [isMenuOpen]);

  // Size, leading and the gap between the titles come from the tuner so they
  // can be dialled in the browser. With its flag off the hook hands back the
  // defaults and nothing subscribes.
  const menuType = useMobileMenuType();
  const titleBase =
    "site-header-menu-link interfold-menu-item group capitalize tracking-[-1.08px] transition-colors";
  const titleClass = `${titleBase} site-header-menu-primary`;
  const subLinkClass = `${titleBase} text-[#79907f]`;
  // Capped at the tuner size, but shrinking with the viewport under it, so
  // "Network Alpha" always holds one line. The name costs 6.5px of width per px
  // of type and the chevron another 0.41. The 94 fixed is the gutters, the dot
  // and its gap, plus a gutter of its own for the dot — sized off the label
  // alone it landed 13px from the screen edge, with its glow closer still.
  const menuFontSize = `min(${menuType.size}px, calc((100vw - 94px) / 6.91))`;
  // Set without the menu's negative word-spacing: at this size it takes -4px
  // out of a 6.76px word space, and "Network Alpha" read as one word.
  const titleStyle = {
    fontSize: menuFontSize,
    lineHeight: menuType.leading,
    wordSpacing: "-0.1em",
  };
  // The only label here made of two words. The menu tightens word spacing by
  // -0.1em, which at this size takes -4px out of a 6.76px space and made
  // "Network Alpha" read as one word, so this one is set without it.
  const twoWordTitleStyle = { ...titleStyle, wordSpacing: "normal" };
  // Arrow geometry is shared through site-nav-arrow; retain the existing
  // chevron alignment for the Network disclosure.
  const chevronLift = "-0.2085em";

  return (
    <>
      {SHOW_MOBILE_MENU_TUNER ? <MobileMenuTuner /> : null}
      <div className={`sticky top-0 z-50 ${className}`}>
        <SiteHeaderChrome
          variant="mobile"
          className={`${backgroundClassName} transition-colors duration-[720ms]`}
          brandLinkProps={brandMenu.trigger("wordmark")}
          symbolLinkProps={brandMenu.trigger("symbol")}
        />
      </div>
      <SiteHeaderMenuButton variant="mobile" className={className} open={isMenuOpen} onOpenChange={setIsMenuOpen} />

      {isMenuOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-menu-theme="interfold"
          className={`interfold-mobile-menu-overlay fixed inset-0 z-[60] flex w-full flex-col items-center justify-center overflow-hidden ${backgroundClassName} transition-colors duration-[720ms]`}
        >
          <p

            className="interfold-menu-item font-['Office_Code_Pro:Medium',sans-serif] absolute top-6 uppercase tracking-[1px] text-[#687d71] text-[12px]"
          >
            Menu
          </p>
          <div className="m-[0px] flex w-full flex-col items-center px-6" style={{ rowGap: `${menuType.spacing}px` }}>
            <a

              className={titleClass}
              href="/"

              onClick={() => setIsMenuOpen(false)}
              style={titleStyle}
            >
              <span>Home</span>
            </a>
            <a

              className={`inline-flex items-baseline gap-1 ${titleClass}`}
              href="https://docs.theinterfold.com/"

              onClick={() => setIsMenuOpen(false)}
              style={{ ...titleStyle, animationDelay: "80ms" }}
            >
              <span>Docs</span>
              <ExternalArrowSlide className="site-nav-arrow" rowClassName="site-nav-arrow-row" />
            </a>
            <a

              className={`inline-flex items-baseline gap-1 ${titleClass}`}
              href="https://blog.theinterfold.com/"

              onClick={() => setIsMenuOpen(false)}
              style={{ ...titleStyle, animationDelay: "160ms" }}
            >
              <span>Blog</span>
              <ExternalArrowSlide className="site-nav-arrow" rowClassName="site-nav-arrow-row" />
            </a>
            {/* Auction removed from the menu after Auction 2 closed. /fold-auction is
                still live and still the claim route — reachable by direct link only. */}
            <a

              className={titleClass}
              href="/participate"

              onClick={() => setIsMenuOpen(false)}
              style={{ ...titleStyle, animationDelay: "240ms" }}
            >
              <span>Participate</span>
            </a>
            <button

              aria-expanded={isNetworkOpen}
              aria-haspopup="menu"
              className={`relative inline-flex items-baseline ${titleClass}`}

              onClick={() => setIsNetworkOpen((current) => !current)}
              style={{ ...twoWordTitleStyle, animationDelay: "320ms" }}
              type="button"
            >
              <span>Network Alpha</span>
              <BendingChevron
                open={isNetworkOpen}
                width="0.4091em"
                thickness="0.0409em"
                style={{ marginLeft: "4px", top: chevronLift }}
              />
            </button>

            {/* 0fr to 1fr rather than a measured height: the closed state is
                right on the very first painted frame, with nothing to measure
                and no effect running after paint to correct it. */}
            <div
              className="grid w-full transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.33,0,0.2,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isNetworkOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                {/* No padding on top: the list this sits in already puts its
                    own row gap between the title and this group, and adding one
                    here doubled it to 16 against the 8 everywhere else. */}
                <div className="flex flex-col items-center" role="menu" style={{ rowGap: `${menuType.spacing}px` }}>
                  {NETWORK_LINKS.map((link) => (
                    <a
                      aria-hidden={!isNetworkOpen}
                      className={`inline-flex items-baseline gap-1 ${subLinkClass}`}
                      href={link.href}
                      key={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      rel="noopener noreferrer"
                      role="menuitem"
                      style={titleStyle}
                      tabIndex={isNetworkOpen ? 0 : -1}
                      target="_blank"
                    >
                      <span>{link.label}</span>
                      <ExternalArrowSlide className="site-nav-arrow" rowClassName="site-nav-arrow-row" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {brandMenu.element}
    </>
  );
}
