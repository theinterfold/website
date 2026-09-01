import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import { useBrandMarkMenu } from "./BrandMarkMenu";
import { InterfoldSymbol } from "./InterfoldSymbol";
import { MobileMenuTuner, SHOW_MOBILE_MENU_TUNER, useMobileMenuType } from "./MobileMenuTuner";

const NETWORK_LINKS = [
  { label: "Governance", href: "https://governance.theinterfold.com" },
  { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
];

// The live dot, sized and spaced like the one in the status strip.
const DOT = 9;
const DOT_GAP = 12;

// The chevron, in em of the pill's text so it tracks the size with the arrows.
// Same bend as the desktop control: two rounded bars pinned at the midpoint of
// their own arm, swinging through a straight line rather than turning over.
// Both taken off the desktop control rather than chosen here: its chevron is
// a 9px box with 0.9px bars against 22px text, which is 0.4091em and 0.0409em.
const CHEV_W = 0.4091;
const CHEV_T = 0.0409;
const CHEV_ARM = CHEV_W / 2 / Math.cos(Math.PI / 4);
const CHEV_DROP = (CHEV_W / 2) * Math.tan(Math.PI / 4);

function chevronArm(isLeft: boolean, isOpen: boolean) {
  const centre = isLeft ? CHEV_W / 4 : (3 * CHEV_W) / 4;
  return {
    backgroundColor: "currentColor",
    borderRadius: `${CHEV_T / 2}em`,
    height: `${CHEV_T}em`,
    left: `${centre - CHEV_ARM / 2}em`,
    position: "absolute" as const,
    top: `${CHEV_DROP / 2 - CHEV_T / 2}em`,
    transform: `rotate(${(isLeft ? 1 : -1) * (isOpen ? -45 : 45)}deg)`,
    transitionDuration: "200ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.33, 0, 0.2, 1)",
    width: `${CHEV_ARM}em`,
  };
}

function AnimatedMenuButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="interfold-mobile-menu-trigger relative h-4 w-7">
      <Hamburger
        toggled={isOpen}
        toggle={setIsOpen}
        direction="right"
        size={28}
        distance="sm"
        duration={0.35}
        color="#3a5e3c"
        rounded
        label={isOpen ? "Close menu" : "Open menu"}
      />
    </div>
  );
}

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

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
    "font-['ABC_Gramercy:Regular',sans-serif] capitalize tracking-[-1.08px] transition-colors hover:text-[#82f5ad]";
  const titleClass = `${titleBase} text-[#3a5e3c]`;
  // Governance and Dashboard carry the titles' size and are told apart by
  // colour alone. #79907f is as far as that can go: it lifts the gap to the
  // titles from 1.67 to 2.15, and the next step up leaves the pale background
  // at 2.63, under the 3:1 large text needs to stay readable.
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
  // The desktop rows set their arrow at 14px against 22px of text. The menu had
  // it at 22/56, which left the arrows at 45% of the x-height here against 73%
  // there — the same mark, visibly smaller. Same ratio now.
  //
  // Both marks hang from the x-height line rather than sitting on the baseline.
  // Measured, the x-height is 0.4619 of the type and the arrow ink 0.3386, so
  // the arrow rides up the difference; the chevron box is 0.2454 and rides up
  // more. On the baseline the chevron sank to the very bottom of letters this
  // large and read as a different alignment from the arrows.
  // Calibrated against what renders, not derived: the arrow glyph's ink does
  // not sit flush on its own baseline, and a shift worked out from the ink
  // height alone left it 2.4px high. Measured, these put both marks within half
  // a pixel of the line. ARROW_LIFT is in the arrow's own size, CHEV_LIFT in
  // the text's.
  const ARROW_LIFT = "-0.106em";
  const CHEV_LIFT = "-0.2085em";
  const arrowStyle = {
    fontSize: `${(14 / 22).toFixed(4)}em`,
    position: "relative" as const,
    top: ARROW_LIFT,
  };
  const chevronLift = CHEV_LIFT;

  return (
    <>
      {SHOW_MOBILE_MENU_TUNER ? <MobileMenuTuner /> : null}
      <div className={`sticky top-0 z-50 ${className}`}>
      <div className={`interfold-header-drop relative flex items-center justify-center ${backgroundClassName} px-6 py-4 transition-colors duration-[720ms]`}>
        <a aria-label="The Interfold home" className="absolute left-6 h-4 w-28" href="/" {...brandMenu.trigger("wordmark")}>
          <svg className="h-full w-full" fill="none" preserveAspectRatio="xMinYMid meet" viewBox="0 0 120.421 17.239">
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
        </a>

        <a aria-label="The Interfold home" className="h-7 w-8 text-[#3a5e3c] transition-colors duration-200 hover:text-[#82f5ad] focus-visible:text-[#82f5ad]" href="/" {...brandMenu.trigger("symbol")}>
          <InterfoldSymbol className="h-full w-full" />
        </a>

      </div>
      </div>

      <div className={`fixed right-6 top-7 z-[70] -translate-y-1/2 ${className}`}>
        <AnimatedMenuButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>

      {isMenuOpen && (
        <div
          className={`interfold-mobile-menu-overlay fixed inset-0 z-[60] flex w-full flex-col items-center justify-center overflow-hidden ${backgroundClassName} transition-colors duration-[720ms]`}
        >
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="font-['Office_Code_Pro:Medium',sans-serif] absolute top-6 uppercase tracking-[1px] text-[#687d71] text-[12px]"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Menu
          </motion.p>
          {/* w-full and a gutter so the pill has a width to fill. Shrink-wrapped
              to its content it hugged the label, and the chevron ended up
              touching the "a" of Alpha with nowhere to go. */}
          <div className="m-[0px] flex w-full flex-col items-center px-6" style={{ rowGap: `${menuType.spacing}px` }}>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className={titleClass}
              href="/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={titleStyle}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Home
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-baseline gap-1 ${titleClass}`}
              href="https://docs.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={titleStyle}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Docs</span>
              <span aria-hidden="true" className="leading-none" style={arrowStyle}>↗</span>
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-baseline gap-1 ${titleClass}`}
              href="https://blog.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={titleStyle}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Blog</span>
              <span aria-hidden="true" className="leading-none" style={arrowStyle}>↗</span>
            </motion.a>
            {/* Auction removed from the menu after Auction 2 closed. /fold-auction is
                still live and still the claim route — reachable by direct link only. */}
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className={titleClass}
              href="/participate"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={titleStyle}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              Participate
            </motion.a>
            {/* No pill: the name stays whole and the live dot stays, but it is
                set as a title like the rest. The dot is out of flow, the way the
                status strip does it — sitting in the line it would push
                "Network Alpha" off the centre the other titles sit on. */}
            <motion.button
              animate={{ opacity: 1, y: 0 }}
              aria-expanded={isNetworkOpen}
              aria-haspopup="menu"
              className={`relative inline-flex items-baseline ${titleClass}`}
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsNetworkOpen((current) => !current)}
              style={twoWordTitleStyle}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              type="button"
            >
              <span
                aria-hidden="true"
                className="absolute right-full top-1/2 -translate-y-1/2 rounded-full bg-[#82f5ad] shadow-[0_0_8px_2px_rgba(130,245,173,0.6)] before:absolute before:inset-[-2px] before:rounded-full before:bg-[#82f5ad]/45 before:animate-ping motion-reduce:before:animate-none"
                style={{ height: `${DOT}px`, marginRight: `${DOT_GAP}px`, width: `${DOT}px` }}
              />
              <span>Network Alpha</span>
              <span
                aria-hidden="true"
                className="relative block shrink-0"
                style={{ height: `${CHEV_DROP + CHEV_T}em`, marginLeft: "4px", top: chevronLift, width: `${CHEV_W}em` }}
              >
                <span style={chevronArm(true, isNetworkOpen)} />
                <span style={chevronArm(false, isNetworkOpen)} />
              </span>
            </motion.button>

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
                      <span aria-hidden="true" className="leading-none" style={arrowStyle}>↗</span>
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
