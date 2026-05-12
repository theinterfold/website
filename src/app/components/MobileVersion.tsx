import { useState } from "react";
import { motion } from "motion/react";
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

export function MobileVersion() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const carouselSettings = {
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
      <div className="sticky top-0 z-50 relative flex items-center justify-center bg-[#d9fce8] px-6 py-4">
        <div className="absolute left-6 h-4 w-28">
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
        </div>

        <div className="h-7 w-8">
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
        </div>

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
            <button
              onClick={() => setIsMenuOpen(false)}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              style={{ wordSpacing: '-0.1em' }}
            >
              Community
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              style={{ wordSpacing: '-0.1em' }}
            >
              Protocol
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize tracking-[-2px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              style={{ wordSpacing: '-0.1em' }}
            >
              Docs
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col bg-[#d9fce8]">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            alt=""
            className="h-full w-full object-cover mix-blend-darken opacity-80"
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

          <div className="mt-8 flex w-full flex-col gap-3">
            <button
              className="group w-full bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
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
            </button>
            <button
              className="group w-full bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
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
            </button>
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
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71] opacity-80">
            A new execution Model
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            The Interfold introduces a structural fold in digital systems, making coordination possible without
            third-party custody, data exposure, or trusted hardware.
          </p>
        </div>

        <div className="mb-12 w-full max-w-md">
          <svg className="h-auto w-full" fill="none" viewBox="0 0 820 256">
            <g clipPath="url(#clip0_0_363)">
              <g>
                <path d={svgPaths.p154fa380} fill="#82F5AD" />
                <path d={svgPaths.p3ec38f00} fill="#82F5AD" />
                <path d={svgPaths.p384c6a00} fill="#82F5AD" />
                <path d={svgPaths.p13a07d80} fill="#82F5AD" />
                <path d={svgPaths.p1b97f400} fill="#82F5AD" />
                <path d={svgPaths.p34011b80} fill="#82F5AD" />
                <path d={svgPaths.p8ed2f00} fill="#82F5AD" />
                <path d={svgPaths.p3983bd80} fill="#82F5AD" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_0_363">
                <rect fill="white" height="256" width="820" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="mx-auto flex max-w-md flex-col gap-6 px-6">
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
      <div className="bg-[#d9fce8] py-16 pb-24">
        <div className="mx-auto mb-12 max-w-2xl px-6 text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            What Becomes Possible
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            When shared outcomes no longer require exposing inputs or trusting a single operator, new coordination
            systems become possible.
          </p>
        </div>

        <div className="w-full">
          <Slider {...carouselSettings}>
            <div className="px-6">
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

            <div className="px-6">
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

            <div className="px-6">
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
      <div className="flex flex-col items-center bg-[#121718] px-6 py-16 text-center">
        <div className="mx-auto mb-12 max-w-2xl">
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

        <div className="flex w-full max-w-md flex-col gap-3">
          <button
            className="group w-full bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
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
          </button>
          <button
            className="group w-full bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
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
          </button>
        </div>
      </div>

      {/* Explore Section */}
      <div className="bg-white px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            Explore
          </p>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[0.95] tracking-[-0.72px] text-[#3a5e3c]">
            Read the technical documentation, essays, and updates that explain how Interfold works, why confidential
            coordination matters, and what is live now.
          </p>
        </div>

        <div className="mx-auto flex max-w-md flex-col gap-[16px]">
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="DOCS"
            description="Technical documentation, references, and implementation details."
            cta="Read the docs"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="docs"
          />
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="ESSAYS"
            description="Writing on confidential coordination and the architecture behind the network."
            cta="Read essays"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="essays"
          />
          <ExploreCard
            image={imgChatGptImageApr232026060921Pm11}
            title="BLOG"
            description="Updates, research notes, and ecosystem announcements."
            cta="Read blog"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="blog"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#d9fce8] px-4 py-6">
        <div className="mx-auto max-w-md">
          <h2 className="font-['ABC_Gramercy:Regular',sans-serif] mb-8 text-[40px] leading-[0.87] tracking-[-1.2px] capitalize text-[#3a5e3c]">
            The Interfold
          </h2>

          <div className="mb-6 flex flex-col gap-2">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] leading-[1.075] tracking-[1.4px] uppercase text-[#252525]">
              Follow us
            </p>
            <div className="font-['ABC_Gramercy:Regular',sans-serif] flex flex-col text-[22px] leading-[1.05] capitalize text-[#3a5e3c]">
              <button className="text-left transition-colors hover:text-[#82f5ad]">
                Telegram
              </button>
              <button className="text-left transition-colors hover:text-[#82f5ad]">
                Github
              </button>
              <button className="text-left transition-colors hover:text-[#82f5ad]">
                X
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-['ABC_Gramercy:Regular',sans-serif] w-full border-b border-[#3a5e3c] bg-transparent outline-none text-[#3a5e3c] pb-2 text-[14.429px] placeholder:text-[#3a5e3c] placeholder:capitalize"
            />
          </div>

          <button
            disabled={!isValidEmail(email)}
            className={`mb-6 flex h-[52px] w-full items-center justify-center bg-[rgba(193,217,191,0.8)] transition-colors group ${
              isValidEmail(email) ? 'hover:bg-[#3a5e3c] cursor-pointer' : 'cursor-not-allowed opacity-50'
            }`}
          >
            <p className={`font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] capitalize text-[#687d71] ${
              isValidEmail(email) ? 'transition-colors group-hover:text-[#82f5ad]' : ''
            }`}>
              Subscribe
            </p>
          </button>

          <div className="font-['ABC_Gramercy:Regular',sans-serif] mb-4 flex flex-col text-[22px] leading-[1.05] capitalize text-[#3a5e3c]">
            <button className="text-left transition-colors hover:text-[#82f5ad]">Privacy</button>
            <button className="text-left transition-colors hover:text-[#82f5ad]">Terms & Conditions</button>
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
  hoveredButton,
  setHoveredButton,
  id
}: {
  image: string;
  title: string;
  description: string;
  cta: string;
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
  id: string;
}) {
  return (
    <button
      className="group w-full bg-white p-[8px] transition-colors hover:bg-[#d9fce8]"
      onMouseEnter={() => setHoveredButton(id)}
      onMouseLeave={() => setHoveredButton(null)}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="h-0 w-full border-t-[2.88577px] border-[#3a5e3c]" />
        <div className="h-[71px] w-auto">
          <img
            alt=""
            className="h-full w-auto object-bottom mix-blend-hard-light"
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
    </button>
  );
}
