import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import { motion } from "motion/react";
import { ExternalArrowSlide } from "./HoverArrowLink";
import { InterfoldSymbol } from "./InterfoldSymbol";
import { SiteMobileHeader } from "./SiteMobileHeader";

function Wordmark() {
  return (
    <svg className="block h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.421 17.239">
      <path d={svgPaths.p17d7a800} fill="#3A5E3C" />
      <path d={svgPaths.p1ca65800} fill="#3A5E3C" />
      <path d={svgPaths.pc6803c0} fill="#3A5E3C" />
      <path d={svgPaths.pd8ed180} fill="#3A5E3C" />
      <path d={svgPaths.p3771fe00} fill="#3A5E3C" />
      <path d={svgPaths.p2960eb80} fill="#3A5E3C" />
      <path d={svgPaths.p357bef30} fill="#3A5E3C" />
      <path d={svgPaths.p2e47ac00} fill="#3A5E3C" />
      <path d={svgPaths.p254332f0} fill="#3A5E3C" />
      <path d={svgPaths.p102bd800} fill="#3A5E3C" />
      <path d={svgPaths.p12150980} fill="#3A5E3C" />
    </svg>
  );
}

export function Header({
  activePath = "",
  animateOpening = false,
  backgroundClassName = "bg-[#d9fce8]",
  desktopPositionClassName = "md:sticky md:top-0",
  showDesktop = true,
  showMobile = true,
}: {
  activePath?: string;
  animateOpening?: boolean;
  backgroundClassName?: string;
  desktopPositionClassName?: string;
  showDesktop?: boolean;
  showMobile?: boolean;
}) {
  const BrandLink = animateOpening ? motion.a : "a";
  const MarkLink = animateOpening ? motion.a : "a";
  const NavLink = animateOpening ? motion.a : "a";
  const openingMotion = (delay: number) => animateOpening
    ? {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: -6 },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {};
  const navLinkClass = "transition-colors hover:text-[#82f5ad]";
  const externalNavLinkClass = "group inline-flex items-baseline gap-1 transition-colors hover:text-[#82f5ad] focus-visible:text-[#82f5ad]";
  const participateLinkClass = `${navLinkClass} ${activePath === "participate" ? "underline decoration-[1px] underline-offset-[5px]" : ""}`;
  const auctionLinkClass = `${navLinkClass} ${activePath === "fold-auction" ? "underline decoration-[1px] underline-offset-[5px]" : ""}`;

  return (
    <>
      {showMobile && <SiteMobileHeader backgroundClassName={backgroundClassName} className="xl:hidden" />}
      {showDesktop && (
        <header className={`interfold-header-transition ${animateOpening ? "interfold-header-drop" : ""} ${desktopPositionClassName} z-50 hidden h-[63px] w-full ${backgroundClassName} transition-colors duration-300 xl:block`}>
          <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-6">
            <BrandLink
              aria-label="The Interfold home"
              className={animateOpening ? "justify-self-start capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[1.05] not-italic text-[#3a5e3c] text-[18px] md:text-[22px] tracking-[-0.66px] whitespace-nowrap transition-colors hover:text-[#82f5ad]" : "h-[17.239px] w-[120.421px] justify-self-start"}
              href="/"
              style={animateOpening ? { fontFeatureSettings: '"liga" 1, "clig" 1', fontVariantLigatures: "common-ligatures" } : undefined}
              {...openingMotion(0.75)}
            >
              {animateOpening ? "The Interfold" : <Wordmark />}
            </BrandLink>
            <MarkLink aria-label="The Interfold home" className="h-[35.071px] w-[45.703px] justify-self-center text-[#3a5e3c]" href="/" {...openingMotion(0.85)}>
              <InterfoldSymbol className="block h-full w-full" />
            </MarkLink>
            <nav className="hidden justify-self-end gap-8 font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] text-[#3a5e3c] md:flex">
              <NavLink className={externalNavLinkClass} href="https://docs.theinterfold.com/" {...openingMotion(0.95)}>
                <span>Docs</span>
                <ExternalArrowSlide />
              </NavLink>
              <NavLink className={externalNavLinkClass} href="https://blog.theinterfold.com/" {...openingMotion(1.05)}>
                <span>Blog</span>
                <ExternalArrowSlide />
              </NavLink>
              <NavLink aria-current={activePath === "fold-auction" ? "page" : undefined} className={auctionLinkClass} href="/fold-auction" {...openingMotion(1.15)}>Auction</NavLink>
              <NavLink aria-current={activePath === "participate" ? "page" : undefined} className={participateLinkClass} href="/participate" {...openingMotion(1.25)}>Participate</NavLink>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
