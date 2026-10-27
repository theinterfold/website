import { SiteHeaderChrome } from "../../../packages/site-header/lib/index.js";
import { useBrandMarkMenu } from "./BrandMarkMenu";
import { ExternalArrowSlide } from "../../../packages/site-header/lib/motion";
import { NetworkMenu } from "./NetworkMenu";
import { SiteMobileHeader } from "./SiteMobileHeader";

export function Header({
  activePath = "",
  backgroundClassName = "bg-[#d9fce8]",
  desktopPositionClassName = "md:sticky md:top-0",
  showDesktop = true,
  showMobile = true,
}: {
  activePath?: string;
  backgroundClassName?: string;
  desktopPositionClassName?: string;
  showDesktop?: boolean;
  showMobile?: boolean;
}) {
  const brandMenu = useBrandMarkMenu();
  // Shared link padding keeps the navigation inside its half of the header,
  // with continuous hit areas between links.
  const navLinkClass = "site-header-link interfold-top-nav-link group";
  const externalNavLinkClass = "site-header-link group";
  const participateLinkClass = `${navLinkClass} ${activePath === "participate" ? "is-active" : ""}`;

  return (
    <>
      {showMobile && <SiteMobileHeader backgroundClassName={backgroundClassName} className="xl:hidden" />}
      {showDesktop && (
        <div className={`${desktopPositionClassName} z-50 hidden w-full xl:block`}>
        <SiteHeaderChrome
          variant="desktop"
          className={`${backgroundClassName} transition-colors duration-[720ms]`}
          brandLinkProps={brandMenu.trigger("wordmark")}
          symbolLinkProps={brandMenu.trigger("symbol")}
          navigation={
            <>
              <a className={externalNavLinkClass} href="https://docs.theinterfold.com/">
                <span>Docs</span>
                <ExternalArrowSlide className="site-nav-arrow" rowClassName="site-nav-arrow-row" />
              </a>
              <a className={externalNavLinkClass} href="https://blog.theinterfold.com/">
                <span>Blog</span>
                <ExternalArrowSlide className="site-nav-arrow" rowClassName="site-nav-arrow-row" />
              </a>
              <a aria-current={activePath === "participate" ? "page" : undefined} className={participateLinkClass} href="/participate">
                <span>Participate</span>
              </a>
              <div className="site-header-action">
                <NetworkMenu />
              </div>
            </>
          }
        />
        </div>
      )}
      {brandMenu.element}
    </>
  );
}
