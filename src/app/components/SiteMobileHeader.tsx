import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import { InterfoldSymbol } from "./InterfoldSymbol";
import { MobileMenuTuner, SHOW_MOBILE_MENU_TUNER, useMobileMenuType } from "./MobileMenuTuner";

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
  const titleClass =
    "font-['ABC_Gramercy:Regular',sans-serif] capitalize tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]";
  const titleStyle = {
    fontSize: `${menuType.size}px`,
    lineHeight: menuType.leading,
    wordSpacing: "-0.1em",
  };
  // The arrow was 22px against a 56px title; in em it holds that ratio however
  // far the size slider travels.
  const arrowStyle = { fontSize: `${(22 / 56).toFixed(4)}em` };
  // The chevron sits on the arrows' line: the same em box, the same 4px gap,
  // and on the baseline rather than centred on the x-height, which is what put
  // it higher than the arrows beside Docs and Blog. Its viewBox is 14x9, so the
  // height follows the width to keep it from squashing.
  const chevronStyle = {
    height: `${(22 / 56 / (14 / 9)).toFixed(4)}em`,
    marginLeft: "4px",
    width: `${(22 / 56).toFixed(4)}em`,
  };

  return (
    <>
      {SHOW_MOBILE_MENU_TUNER ? <MobileMenuTuner /> : null}
      <div className={`sticky top-0 z-50 ${className}`}>
      <div className={`interfold-header-drop relative flex items-center justify-center ${backgroundClassName} px-6 py-4 transition-colors duration-[720ms]`}>
        <a aria-label="The Interfold home" className="absolute left-6 h-4 w-28" href="/">
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

        <a aria-label="The Interfold home" className="h-7 w-8 text-[#3a5e3c] transition-colors duration-200 hover:text-[#82f5ad] focus-visible:text-[#82f5ad]" href="/">
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
          <div className="m-[0px] flex flex-col items-center p-[0px]" style={{ rowGap: `${menuType.spacing}px` }}>
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
            {/* The same control as the nav's Network Alpha pill, in the shape a
                menu wants: the title opens to reveal the two network surfaces
                rather than listing them alongside the site's own pages. It reads
                as one of the titles, so it is set like one — the two inside it
                stay smaller and sage. */}
            {/* Just "Network" here. "Network Alpha" measures 359px against the
                342px this overlay leaves on a 390px phone, so it wrapped to two
                lines; the one-word label also matches the rhythm of Docs, Blog and
                Participate. The pill in the desktop nav and the live strip both
                still say Network Alpha. */}
            <div className="relative flex flex-col items-center px-6">
              <motion.button
                animate={{ opacity: 1, y: 0 }}
                aria-expanded={isNetworkOpen}
                className={`block max-w-full text-center ${titleClass}`}
                initial={{ opacity: 0, y: 16 }}
                onClick={() => setIsNetworkOpen((current) => !current)}
                style={titleStyle}
                transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                type="button"
              >
                Network
                <svg
                  aria-hidden="true"
                  className={`inline-block align-baseline transition-transform duration-200 ${isNetworkOpen ? "-scale-y-100" : ""}`}
                  fill="none"
                  focusable="false"
                  style={chevronStyle}
                  viewBox="0 0 14 9"
                >
                  <polyline points="1 1.5 7 7.5 13 1.5" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" />
                </svg>
              </motion.button>

              {isNetworkOpen && (
                <div className="absolute left-1/2 top-full mt-3 flex w-max -translate-x-1/2 flex-col items-center gap-y-1">
                  {[
                    { label: "Governance", href: "https://governance.theinterfold.com" },
                    { label: "Dashboard", href: "https://dashboard.theinterfold.com/" },
                  ].map((link, index) => (
                    <motion.a
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-baseline gap-1 font-['ABC_Gramercy:Regular',sans-serif] text-[24px] capitalize leading-[1.2] tracking-[-0.5px] text-[#687d71] transition-colors hover:text-[#82f5ad]"
                      href={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      key={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      rel="noopener noreferrer"
                      target="_blank"
                      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>{link.label}</span>
                      <span aria-hidden="true" className="text-[13px] leading-none">↗</span>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
