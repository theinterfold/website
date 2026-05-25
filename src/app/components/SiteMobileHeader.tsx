import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";

function AnimatedMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hamburger-button relative h-4 w-7"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={`hamburger-toggle ${isOpen ? "active-menu" : ""}`}
      >
        <i className="hamburger-middle" />
      </span>
      <style>{`
        .hamburger-toggle {
          display: block;
          width: 28px;
          height: 16px;
          position: relative;
        }

        .hamburger-toggle::after,
        .hamburger-toggle::before {
          content: '';
          position: absolute;
          top: 0;
          height: 0;
          border-bottom: 2px solid #3a5e3c;
          width: 100%;
          left: 0;
          right: 0;
          transition: all ease-out 0.3s;
        }

        .hamburger-toggle::after {
          top: 100%;
        }

        .hamburger-middle {
          display: block;
          text-indent: 100%;
          overflow: hidden;
          white-space: nowrap;
          height: 2px;
          background-color: #3a5e3c;
          width: 100%;
          position: absolute;
          top: 50%;
          transition: all ease-out 0.1s;
        }

        .hamburger-toggle.active-menu::after {
          transform: rotate(-45deg);
          transform-origin: center;
          top: 50%;
        }

        .hamburger-toggle.active-menu::before {
          transform: rotate(45deg);
          transform-origin: center;
          top: 50%;
        }

        .hamburger-toggle.active-menu .hamburger-middle {
          opacity: 0;
        }
      `}</style>
    </button>
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

  return (
    <>
      <div className={`interfold-header-drop sticky top-0 z-50 flex items-center justify-center ${backgroundClassName} px-6 py-4 ${className}`}>
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

        <a aria-label="The Interfold home" className="h-7 w-8" href="/">
          <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.5891 37.1196">
            <path d={svgPaths.p2c3ef4f0} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p18d4bac0} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p79ece00} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p3c15f980} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.pd580300} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p3e19a800} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p3fc0d800} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
            <path d={svgPaths.p1f4a0a00} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
          </svg>
        </a>

        <div className="absolute right-6">
          <AnimatedMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-[60] flex h-[100dvh] min-h-screen w-screen flex-col items-center justify-center ${backgroundClassName}`}
        >
          <div className="absolute right-6 top-4">
            <AnimatedMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="font-['Office_Code_Pro:Medium',sans-serif] absolute top-6 uppercase tracking-[1px] text-[#687d71] text-[12px]"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Menu
          </motion.p>
          <div className="m-[0px] flex flex-col items-center gap-0 p-[0px]">
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-baseline gap-1 font-['ABC_Gramercy:Regular',sans-serif] text-[36px] capitalize leading-[0.92] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://docs.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Docs</span>
              <span aria-hidden="true" className="text-[14px] leading-none">↗</span>
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-baseline gap-1 font-['ABC_Gramercy:Regular',sans-serif] text-[36px] capitalize leading-[0.92] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://blog.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Blog</span>
              <span aria-hidden="true" className="text-[14px] leading-none">↗</span>
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[36px] capitalize leading-[0.92] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="/participate"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              Participate
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}
