import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importar as mesmas imagens e SVGs do desktop
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import imgImage66 from "../../imports/Desktop/b2a665648dcdbaa537f982baed705f51f9563175.png";
import imgChatGptImageApr232026051856Pm11 from "../../imports/Desktop/a80fa66d44b0ff61c570b989d6fb551d46380225.png";
import imgChatGptImageApr232026051856Pm12 from "../../imports/Desktop/2ed5559bf52ac38f0d906307f0ed5c48d52a224a.png";
import imgChatGptImageApr232026051856Pm13 from "../../imports/Desktop/5358f3e3b9a49f0d5d69994ddaa8f725c44612c4.png";
import imgChatGptImageApr232026060921Pm11 from "../../imports/Desktop/999c0b9f82c1e2e15b0d5e34e873ebd783b7b03f.png";

function AnimatedMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hamburger-button relative h-4 w-7"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={`hamburger-toggle ${isOpen ? 'active-menu' : ''}`}
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

function MobileExecutionModelGraphic() {
  return (
    <svg className="h-auto w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 819.892 256">
      <g clipPath="url(#mobile-execution-clip)" id="Layer_1">
        <g id="Group">
          <path d={svgPaths.p154fa380} fill="#82F5AD" />
          <path d={svgPaths.p3ec38f00} fill="#82F5AD" />
          <path d={svgPaths.p384c6a00} fill="#82F5AD" />
          <path d={svgPaths.p13a07d80} fill="#82F5AD" />
          <path d={svgPaths.p1b97f400} fill="#82F5AD" />
          <path d={svgPaths.p34011b80} fill="#82F5AD" />
          <path d={svgPaths.p8ed2f00} fill="#82F5AD" />
          <path d={svgPaths.p3983bd80} fill="#82F5AD" />
        </g>
        <path d={svgPaths.p123a9f60} stroke="url(#mobile-execution-paint0)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p21624440} stroke="url(#mobile-execution-paint1)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.pe4db960} stroke="url(#mobile-execution-paint2)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p510e600} stroke="url(#mobile-execution-paint3)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p2e229900} stroke="url(#mobile-execution-paint4)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.pc115780} stroke="url(#mobile-execution-paint5)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p3bf3d180} stroke="url(#mobile-execution-paint6)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p3f53d2c0} stroke="url(#mobile-execution-paint7)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p21bd2000} stroke="url(#mobile-execution-paint8)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p313dfde0} stroke="url(#mobile-execution-paint9)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d="M711.769 127.996H778.918" stroke="url(#mobile-execution-paint10)" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p12f7bbf0} fill="#82F5AD" />
        <path d={svgPaths.p5f6cf80} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p2a2f8580} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p21910e80} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p39d77040} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p1e4e5a40} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.pf569a00} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.p35357400} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <path d={svgPaths.pd678600} stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
        <g>
          <path d={svgPaths.p3380c5c0} fill="#82F5AD" />
          <path d={svgPaths.p3daf0740} fill="#82F5AD" />
          <path d={svgPaths.p8d83300} fill="#82F5AD" />
          <path d={svgPaths.pe920280} fill="#82F5AD" />
          <path d={svgPaths.p3280f7f0} fill="#82F5AD" />
          <path d={svgPaths.p3216000} fill="#82F5AD" />
          <path d={svgPaths.p273e9000} fill="#82F5AD" />
          <path d={svgPaths.p150b080} fill="#82F5AD" />
          <path d={svgPaths.p2a0b8e20} fill="#82F5AD" />
          <path d={svgPaths.p288df0c0} fill="#82F5AD" />
          <path d={svgPaths.p23cba280} fill="#82F5AD" />
          <path d={svgPaths.pec12580} fill="#82F5AD" />
          <path d={svgPaths.p18023200} fill="#82F5AD" />
          <path d={svgPaths.p327059b0} fill="#82F5AD" />
          <path d={svgPaths.p3acfbc80} fill="#82F5AD" />
          <path d={svgPaths.p3ec56c80} fill="#82F5AD" />
          <path d={svgPaths.p250e9e00} fill="#82F5AD" />
          <path d={svgPaths.p1be45100} fill="#82F5AD" />
          <path d={svgPaths.p1decb600} fill="#82F5AD" />
          <path d={svgPaths.p3eb1bfb0} fill="#82F5AD" />
          <path d={svgPaths.p6c9f0f0} fill="#82F5AD" />
          <path d={svgPaths.p1ac31b00} fill="#82F5AD" />
          <path d={svgPaths.p12da0980} fill="#82F5AD" />
          <path d={svgPaths.p1b738b00} fill="#82F5AD" />
          <path d={svgPaths.p38896440} fill="#82F5AD" />
        </g>
        <path d="M476.758 208.821V114.505" stroke="#252525" strokeMiterlimit="10" strokeWidth="2.18269" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint0" x1="332.379" x2="332.379" y1="6.73522" y2="114.525">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint1" x1="285.386" x2="285.386" y1="87.5685" y2="127.99">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint2" x1="365.955" x2="365.955" y1="101.06" y2="141.481">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint3" x1="312.242" x2="312.242" y1="114.505" y2="154.927">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint4" x1="292.094" x2="292.094" y1="127.996" y2="168.418">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint5" x1="329.025" x2="329.025" y1="141.487" y2="181.909">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint6" x1="245.101" x2="245.101" y1="154.933" y2="249.249">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint7" x1="345.818" x2="345.818" y1="168.424" y2="208.845">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint8" x1="587.554" x2="587.554" y1="114.505" y2="154.927">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint9" x1="594.269" x2="594.269" y1="127.996" y2="168.418">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="mobile-execution-paint10" x1="745.344" x2="745.344" y1="127.996" y2="128.996">
          <stop offset="0.509615" stopColor="#231F20" />
          <stop offset="0.735577" stopColor="#00FF88" />
        </linearGradient>
        <clipPath id="mobile-execution-clip">
          <rect fill="white" height="256" width="819.892" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MobileVersion() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isNewsletterFocused, setIsNewsletterFocused] = useState(false);
  const [isJoinHovered, setIsJoinHovered] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const hasEmail = email.trim().length > 0;

  const carouselSettings = {
    centerMode: true,
    centerPadding: '16px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Header */}
      <div className="interfold-header-drop sticky top-0 z-50 relative flex items-center justify-center bg-[#d9fce8] px-6 py-4">
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
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#d9fce8]"
        >
          <div className="absolute right-6 top-4">
            <AnimatedMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
          <p className="font-['Office_Code_Pro:Medium',sans-serif] absolute top-6 uppercase tracking-[1px] text-[#687d71] text-[12px]">
            Menu
          </p>
          <div className="flex flex-col gap-0 p-[0px] m-[0px]">
            <a
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://docs.theinterfold.com/"
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: '-0.1em' }}
            >
              Docs
            </a>
            <a
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="https://blog.theinterfold.com/"
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: '-0.1em' }}
            >
              Blog
            </a>
            <a
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href="#participate"
              onClick={() => setIsMenuOpen(false)}
              style={{ wordSpacing: '-0.1em' }}
            >
              Participate
            </a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col bg-[#d9fce8]">
        <div className="relative h-64 w-full overflow-hidden bg-[#d9fce8]">
          <img
            alt=""
            className="h-full w-full object-cover mix-blend-darken"
            src={imgImage66}
          />
        </div>

        <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center px-[24px] py-[64px]">
          <div className="font-['ABC_Gramercy:Regular',sans-serif] text-[36px] leading-[0.92] tracking-[-1.08px] capitalize text-[#3a5e3c]">
            <p className="mb-0">Private Inputs.</p>
            <p>Collective Outcomes.</p>
          </div>
          <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            The Interfold enables independent parties to produce shared, verifiable outcomes from private inputs
          </p>

          <div className="mx-auto mt-8 flex w-[min(100%-96px,540px)] flex-col gap-3">
            <div className="w-full">
              <a
                className="group w-full bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
                href="https://docs.theinterfold.com/"
                onMouseEnter={() => setHoveredButton('build')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="flex items-center justify-center gap-1">
                  <motion.p
                    className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] capitalize text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                    animate={{ x: hoveredButton === 'build' ? -8 : 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Build on Interfold
                  </motion.p>
                  <motion.span
                    className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: hoveredButton === 'build' ? 1 : 0, x: hoveredButton === 'build' ? 0 : -10 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    →
                  </motion.span>
                </div>
              </a>
            </div>
            <div className="w-full">
              <a
                className="group w-full bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
                href="#participate"
                onMouseEnter={() => setHoveredButton('participate')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="flex items-center justify-center gap-1">
                  <motion.p
                    className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] capitalize text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                    animate={{ x: hoveredButton === 'participate' ? -8 : 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Participate
                  </motion.p>
                  <motion.span
                    className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: hoveredButton === 'participate' ? 1 : 0, x: hoveredButton === 'participate' ? 0 : -10 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    →
                  </motion.span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logos Section */}
      <div className="bg-[rgba(193,217,191,0.8)] py-8">
        <div className="flex items-center justify-center gap-8 px-6">
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="235 41 70 35">
            <path d={svgPaths.p67816f0} fill="#3A5E3C" />
            <path d={svgPaths.p1c53af00} fill="#3A5E3C" />
            <path d={svgPaths.p3ba98800} fill="#3A5E3C" />
          </svg>
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="422 41 46 35">
            <path d={svgPaths.pfe27200} fill="#3A5E3C" />
          </svg>
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="586 41 34 35">
            <path d={svgPaths.p36323370} fill="#3A5E3C" />
            <path d={svgPaths.pdec5d70} fill="#3A5E3C" />
            <path d={svgPaths.p1ce05600} fill="#3A5E3C" />
            <path d={svgPaths.p3250d600} fill="#3A5E3C" />
          </svg>
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="738 41 164 35">
            <path d={svgPaths.p1ebc7480} fill="#3A5E3C" />
            <path d={svgPaths.p59a0800} fill="#3A5E3C" />
          </svg>
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="1020 41 34 35">
            <path clipRule="evenodd" d={svgPaths.p2f408d00} fill="#3A5E3C" fillRule="evenodd" />
          </svg>
          <svg className="h-4 sm:h-6 md:h-8 w-auto shrink-0" fill="none" viewBox="1172 41 34 35">
            <path d={svgPaths.p1b95080} fill="#3A5E3C" />
          </svg>
        </div>
      </div>

      {/* Execution Model Section */}
      <div className="flex flex-col items-center bg-white px-6 py-16">
        <div className="mx-auto mb-12 w-full max-w-md text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71] opacity-80">
            A new execution Model
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            The Interfold introduces a structural fold in digital systems, making coordination possible without
            third-party custody, data exposure, or trusted hardware.
          </p>
        </div>

        <div className="mb-12 w-full max-w-md">
          <MobileExecutionModelGraphic />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="space-y-2">
            <div className="h-0.5 w-full bg-[#3a5e3c]" />
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#3a5e3c]">
              01
            </p>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase">
              Confidential inputs
            </p>
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              Data remains private throughout execution
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-0.5 w-full bg-[#3a5e3c]" />
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#3a5e3c]">
              02
            </p>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase">
              Threshold enforcement
            </p>
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              A subset of nodes governs execution and release
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-0.5 w-full bg-[#3a5e3c]" />
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#3a5e3c]">
              03
            </p>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase">
              Verifiable outcomes
            </p>
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              Results are verifiable without revealing inputs
            </p>
          </div>
        </div>
      </div>

      {/* What Becomes Possible Section */}
      <div className="bg-[#d9fce8] px-6 py-16 pb-24">
        <div className="mx-auto mb-12 w-full max-w-md text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            What Becomes Possible
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            When shared outcomes no longer require exposing inputs or trusting a single operator, new coordination
            systems become possible.
          </p>
        </div>

        <div className="mobile-what-possible-carousel mx-auto w-full max-w-md">
          <Slider {...carouselSettings}>
            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.92] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Fairer market </p>
                    <p className="whitespace-pre">mechanisms</p>
                  </div>
                  <p className="text-[14.429px] leading-[1.075]">
                    Sealed auction mechanisms where bids remain private and outcomes are verifiable
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={imgChatGptImageApr232026051856Pm11}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.92] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Stronger democratic </p>
                    <p className="whitespace-pre">systems</p>
                  </div>
                  <p className="text-[14.429px] leading-[1.075]">
                    Secret ballots with correct, verifiable tallying and no trusted operator
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={imgChatGptImageApr232026051856Pm12}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.92] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Collaborative </p>
                    <p className="whitespace-pre">Intelligence</p>
                  </div>
                  <p className="text-[14.429px] leading-[1.075]">
                    Multiple parties compute together to produce shared results without exposing data
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={imgChatGptImageApr232026051856Pm13}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      {/* Participate Section */}
      <div id="participate" className="flex flex-col items-center bg-[#121718] px-6 py-16 text-center">
        <div className="mx-auto mb-12 w-full max-w-md">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#d4f6da]">
            Participate
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] mb-4 text-[24px] leading-[0.95] tracking-[-0.72px] text-[#d4f6da]">
            Confidential coordination becomes real through both applications and operators:
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#d4f6da]">
            Builders create multiparty systems that use private inputs, while ciphernodes help distribute execution
            authority and govern outcome release.
          </p>
        </div>

        <div className="mx-auto flex w-[min(100%-96px,540px)] flex-col gap-3">
          <div className="w-full">
            <a
              className="group w-full bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
              href="https://docs.theinterfold.com/"
              onMouseEnter={() => setHoveredButton('participate-build')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className="flex items-center justify-center gap-1">
                <motion.p
                  className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] capitalize text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                  animate={{ x: hoveredButton === 'participate-build' ? -8 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  Build on Interfold
                </motion.p>
                <motion.span
                  className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hoveredButton === 'participate-build' ? 1 : 0, x: hoveredButton === 'participate-build' ? 0 : -10 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  →
                </motion.span>
              </div>
            </a>
          </div>
          <div className="w-full">
            <a
              className="group w-full bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
              href="#participate"
              onMouseEnter={() => setHoveredButton('participate-participate')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className="flex items-center justify-center gap-1">
                <motion.p
                  className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] capitalize text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                  animate={{ x: hoveredButton === 'participate-participate' ? -8 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  Participate
                </motion.p>
                <motion.span
                  className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hoveredButton === 'participate-participate' ? 1 : 0, x: hoveredButton === 'participate-participate' ? 0 : -10 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  →
                </motion.span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="bg-white px-6 py-16">
        <div className="mx-auto mb-12 w-full max-w-md text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            Explore
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            Read the technical documentation, essays, and updates that explain how Interfold works, why confidential
            coordination matters, and what is live now.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-[16px]">
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="DOCS"
            description="Technical documentation, references, and implementation details."
            cta="Explore Docs"
            href="https://docs.theinterfold.com/"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="docs"
          />
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="ESSAYS"
            description="Writing on confidential coordination and the architecture behind the network."
            cta="Read essays"
            href="https://blog.theinterfold.com/tag/confidential-coordination"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="essays"
          />
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="BLOG"
            description="Updates, research notes, and ecosystem announcements."
            cta="Read blog"
            href="https://blog.theinterfold.com/"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="blog"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#d9fce8] px-6 py-6">
        <div className="mobile-possibility-slider mx-auto w-full max-w-md">
          <h2
            className="font-['ABC_Gramercy:Regular',sans-serif] mb-8 text-[40px] leading-[0.87] tracking-[-1.2px] capitalize text-[#3a5e3c]"
            style={{ fontFeatureSettings: '"liga" 1, "clig" 1', fontVariantLigatures: "common-ligatures" }}
          >
            The Interfold
          </h2>

          <div className="mb-6 flex flex-col gap-2">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] leading-[1.075] tracking-[1.4px] uppercase text-[#252525]">
              Follow us
            </p>
            <div className="font-['ABC_Gramercy:Regular',sans-serif] flex flex-col text-[22px] leading-[1.05] capitalize text-[#3a5e3c]">
              <a className="text-left transition-colors hover:text-[#82f5ad]" href="https://t.me/enclave_e3">
                Telegram
              </a>
              <a className="text-left transition-colors hover:text-[#82f5ad]" href="https://github.com/gnosisguild/enclave/">
                Github
              </a>
              <a className="text-left transition-colors hover:text-[#82f5ad]" href="https://x.com/theinterfold">
                X
              </a>
            </div>
          </div>

          <form
            className={`relative -mx-3 mb-6 px-3 py-2 transition-colors duration-300 ${
              isNewsletterFocused ? 'bg-[rgba(193,217,191,0.34)]' : 'hover:bg-[rgba(193,217,191,0.2)]'
            }`}
            onSubmit={(event) => event.preventDefault()}
          >
            <p className="mb-3 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] leading-[1.075] tracking-[1.4px] uppercase text-[#252525]">
              Updates
            </p>
            <label className="block w-full">
              <span className="sr-only">Email for Interfold updates</span>
              <input
                id="email-input"
                type="email"
                placeholder={isNewsletterFocused ? "" : "Email"}
                value={email}
                onBlur={() => setIsNewsletterFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsNewsletterFocused(true)}
                className="font-['ABC_Gramercy:Regular',sans-serif] w-full border-b border-[#3a5e3c] bg-transparent outline-none text-[#3a5e3c] pb-2 text-[14.429px] placeholder:text-[#3a5e3c] placeholder:capitalize"
              />
            </label>
            <AnimatePresence>
              {hasEmail && (
                <motion.button
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`mt-4 flex h-[52px] w-full origin-top items-center justify-center overflow-hidden transition-colors ${
                    isValidEmail(email) ? 'bg-[#3a5e3c] text-[#d9fce8]' : 'bg-[rgba(193,217,191,0.8)] text-[#687d71]'
                  }`}
                  disabled={!isValidEmail(email)}
                  exit={{ opacity: 0, scale: 0.965, y: 6 }}
                  initial={{ opacity: 0, scale: 0.965, y: 6 }}
                  onMouseEnter={() => setIsJoinHovered(true)}
                  onMouseLeave={() => setIsJoinHovered(false)}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  type="submit"
                >
                  <span className="inline-grid grid-cols-[14px_auto_14px] items-center gap-1">
                    <span aria-hidden="true" className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] opacity-0">
                      →
                    </span>
                    <motion.span
                      animate={{ x: isJoinHovered && isValidEmail(email) ? -8 : 0 }}
                      className="font-['ABC_Gramercy:Regular',sans-serif] block text-[14.429px] leading-[1.075] capitalize"
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Join
                    </motion.span>
                    <motion.span
                      animate={{ opacity: isJoinHovered && isValidEmail(email) ? 1 : 0, x: isJoinHovered && isValidEmail(email) ? 0 : -8 }}
                      className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px]"
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          <div className="mb-6 flex flex-col gap-2">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] leading-[1.075] tracking-[1.4px] uppercase text-[#252525]">
              Legal
            </p>
            <div className="font-['ABC_Gramercy:Regular',sans-serif] flex flex-col text-[22px] leading-[1.05] capitalize text-[#3a5e3c]">
              <button className="text-left transition-colors hover:text-[#82f5ad]">Privacy</button>
              <button className="text-left transition-colors hover:text-[#82f5ad]">Terms & Conditions</button>
            </div>
          </div>

          <div className="font-['Office_Code_Pro:Medium',sans-serif] mb-4 flex flex-col text-[10px] leading-[1.4] tracking-[1px] uppercase text-[#687d71]">
            <p>—</p>
            <p>All Rights Reserved © 2026</p>
          </div>

          <div className="font-['Office_Code_Pro:Medium',sans-serif] text-[10px] leading-[1.4] tracking-[1px] uppercase text-[#687d71]">
            <p>Open source protocol.</p>
            <p>Built by Gnosis Guild.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreCard({
  image,
  title,
  description,
  cta,
  href,
  hoveredButton,
  setHoveredButton,
  id
}: {
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
  id: string;
}) {
  return (
    <a
      className="group w-full bg-white p-[8px] transition-colors hover:bg-[#d9fce8]"
      href={href}
      onMouseEnter={() => setHoveredButton(id)}
      onMouseLeave={() => setHoveredButton(null)}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="h-0 w-full border-t-[2.88577px] border-[#3a5e3c]" />
          <div className="h-[71px] relative shrink-0 w-[55px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full"
              src={image}
            />
          </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] text-left text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#252525]">
            {title}
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-left text-[14.429px] leading-[1.075] text-[#3a5e3c]">
            {description}
          </p>
        </div>
        <div className="flex h-[52px] items-center justify-center overflow-hidden bg-[rgba(193,217,191,0.8)] transition-colors group-hover:bg-[#82f5ad]">
          <div className="flex items-center gap-1">
            <motion.p
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] capitalize leading-[1.075] text-[#3a5e3c]"
              animate={{ x: hoveredButton === id ? -8 : 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {cta}
            </motion.p>
            <motion.span
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: hoveredButton === id ? 1 : 0, x: hoveredButton === id ? 0 : -10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </a>
  );
}
