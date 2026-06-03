import { useState, type Dispatch, type SetStateAction } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { motion } from "motion/react";
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";

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
          <svg className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 102 89">
            <path d="M98.46 7.23828L77.25 28.4583L66.64 17.8483L56.03 7.23828L45.43 17.8483L34.82 7.23828L24.21 17.8483L13.61 28.4583L3 39.0583V81.4883L24.21 60.2783L34.82 70.8783L45.43 81.4883L56.03 70.8783L66.64 81.4883L77.25 70.8783L87.85 60.2783L98.46 49.6683V7.23828Z" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M24.21 60.2786L3 39.0586" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M45.4297 17.8516L87.8497 60.2816" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M77.25 28.4609L98.46 49.6709" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M56.0294 70.8809L13.6094 28.4609" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M77.2509 70.8816L24.2109 17.8516" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M45.4309 17.8516L24.2109 39.0616" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
            <path d="M56.0312 70.8819L77.2513 49.6719" stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="6" />
          </svg>
        </a>

      </div>

      <div className={`fixed right-6 top-7 z-[70] -translate-y-1/2 ${className}`}>
        <AnimatedMenuButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>

      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[60] flex h-[100dvh] min-h-screen w-screen flex-col items-center justify-center ${backgroundClassName}`}
        >
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="font-['Office_Code_Pro:Medium',sans-serif] absolute top-6 uppercase tracking-[1px] text-[#687d71] text-[12px]"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Menu
          </motion.p>
          <div className="m-[0px] flex flex-col items-center gap-y-2 p-[0px]">
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[56px] capitalize leading-[0.95] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Home
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-baseline gap-1 font-['ABC_Gramercy:Regular',sans-serif] text-[56px] capitalize leading-[0.95] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://docs.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Docs</span>
              <span aria-hidden="true" className="text-[22px] leading-none">↗</span>
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-baseline gap-1 font-['ABC_Gramercy:Regular',sans-serif] text-[56px] capitalize leading-[0.95] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://blog.theinterfold.com/"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Blog</span>
              <span aria-hidden="true" className="text-[22px] leading-none">↗</span>
            </motion.a>
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[56px] capitalize leading-[0.95] tracking-[-1.08px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="/participate"
              initial={{ opacity: 0, y: 16 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: "-0.1em" }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              Participate
            </motion.a>
          </div>
        </div>
      )}
    </>
  );
}
