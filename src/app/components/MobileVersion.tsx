import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";
import { useStartOnInView } from "./useStartOnInView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importar as mesmas imagens e SVGs do desktop
import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import imgChatGptImageApr232026051856Pm11 from "../../imports/Desktop/a80fa66d44b0ff61c570b989d6fb551d46380225.png";
import imgChatGptImageApr232026051856Pm12 from "../../imports/Desktop/2ed5559bf52ac38f0d906307f0ed5c48d52a224a.png";
import imgChatGptImageApr232026051856Pm13 from "../../imports/Desktop/5358f3e3b9a49f0d5d69994ddaa8f725c44612c4.png";
import aragonLogo from "../../imports/Desktop/aragon-ant-logo-full.svg?no-inline";
import aztecLogo from "../../imports/Desktop/aztec-wordmark-dark.svg";
import boundlessLogo from "../../imports/Desktop/boundless-logo.svg";
import legionLogo from "../../imports/Desktop/legion-logo.svg";
import taikoLogo from "../../imports/Desktop/taiko-h-mono.svg";
import etmStackedLogo from "../../imports/Desktop/encrypt-mempool-stacked.svg";
import { AnimatedExecutionModelGraphic, DesktopFooter } from "../../imports/Desktop/Desktop";
import { ExploreResourceIcon, type ExploreResourceIconKind } from "./ExploreResourceIcon";
import { HeroImage, homeHeroSources } from "./HeroImage";
import { HoverArrowContent, HoverArrowLink } from "./HoverArrowLink";
import { LineReveal } from "./LineReveal";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SiteMobileHeader } from "./SiteMobileHeader";
import { useMobileCarouselOpacity } from "./useMobileCarouselOpacity";

function MobilePartnerLogoFrame({
  children,
  href,
  name,
  visualScale = 1,
}: {
  children: ReactNode;
  href: string;
  name: string;
  visualScale?: number;
}) {
  return (
    <a
      aria-label={name}
      className="flex h-3.5 items-center justify-center sm:h-5"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span
        className="flex items-center justify-center"
        style={{ height: `${visualScale * 100}%` }}
      >
        {children}
      </span>
    </a>
  );
}

function MobilePartnerLogoAsset({ src, aspectRatio }: { src: string; aspectRatio: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-full shrink-0 bg-[#3A5E3C]"
      style={{
        aspectRatio,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskImage: `url(${src})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
    />
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

const mobileLogos = [
  { href: "https://www.aragon.org/", name: "Aragon", visualScale: 0.86, content: <MobilePartnerLogoAsset aspectRatio="2500 / 621" src={aragonLogo} /> },
  { href: "https://taiko.xyz/", name: "Taiko", visualScale: 0.9, content: <MobilePartnerLogoAsset aspectRatio="830 / 228" src={taikoLogo} /> },
  { href: "https://aztec.network/", name: "Aztec", visualScale: 0.78, content: <MobilePartnerLogoAsset aspectRatio="1170 / 300" src={aztecLogo} /> },
  {
    href: "https://www.metalex.tech/", name: "MetaLex", visualScale: 1.06, content: (
      <svg className="h-full w-auto shrink-0" fill="none" viewBox="235 41 70 35">
        <path d={svgPaths.p67816f0} fill="#3A5E3C" />
        <path d={svgPaths.p1c53af00} fill="#3A5E3C" />
        <path d={svgPaths.p3ba98800} fill="#3A5E3C" />
      </svg>
    )
  },
  { href: "https://legion.cc/", name: "Legion", visualScale: 0.58, content: <MobilePartnerLogoAsset aspectRatio="1154 / 170" src={legionLogo} /> },
  {
    href: "https://getsession.org", name: "Session", visualScale: 0.76, content: (
      <svg className="h-full w-auto shrink-0" fill="none" viewBox="738 41 164 35">
        <path d={svgPaths.p1ebc7480} fill="#3A5E3C" />
        <path d={svgPaths.p59a0800} fill="#3A5E3C" />
      </svg>
    )
  },
  { href: "https://boundless.xyz/", name: "Boundless", visualScale: 0.54, content: <MobilePartnerLogoAsset aspectRatio="901 / 114" src={boundlessLogo} /> },
  { href: "https://www.encryptedmempool.org/", name: "Encrypt the Mempool", visualScale: 0.9, content: <MobilePartnerLogoAsset aspectRatio="791 / 219" src={etmStackedLogo} /> },
];

export function MobileVersion() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const logoMarquee = useStartOnInView();
  const possibilityCarouselRef = useMobileCarouselOpacity();

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
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteMobileHeader />

      {/* Hero Section */}
      <div className="flex flex-col bg-[#d9fce8]">
        <div className="interfold-hero-transition relative h-64 w-full overflow-hidden bg-[#d9fce8]">
          <HeroImage
            className="interfold-home-hero-image h-full w-full object-cover object-top mix-blend-darken"
            fadeIn={false}
            pictureClassName="block h-full w-full"
            sources={homeHeroSources}
          />
        </div>
        <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center px-[24px] py-[64px]">
          <ScrollFadeIn className="mb-4 flex w-full justify-center">
            <SectionLabel>Home</SectionLabel>
          </ScrollFadeIn>
          <div className="max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[36px] leading-[0.95] tracking-[-1.08px] capitalize text-[#3a5e3c]">
            <LineReveal lineClassName="leading-[0.95]" lines={["Private Inputs.", "Collective Outcomes."]} />
          </div>
          <ScrollFadeIn className="flex w-full justify-center" delay={0.25}>
            <p data-preview-was="Infrastructure for multiplayer privacy, enabling independent parties to coordinate without exposing inputs." className="max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
              Interfold lets competing companies or complete strangers compute together on sensitive data: private inputs, verifiable outputs, no trusted hardware.
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn className="w-full" delay={0.3}>
          <div data-preview-note="heroCtas" className="mx-auto mt-8 flex w-[min(100%-96px,540px)] flex-col gap-3">
            <div className="w-full">
              <HoverArrowLink
                className="flex w-full items-center justify-center bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
                href="https://docs.theinterfold.com/getting-started"
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                Build on Interfold
              </HoverArrowLink>
            </div>
            <div className="w-full">
              <HoverArrowLink
                className="flex w-full items-center justify-center bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
                href="https://dashboard.theinterfold.com/#operator"
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                Run a ciphernode
              </HoverArrowLink>
            </div>
            <div className="w-full">
              <HoverArrowLink
                className="flex w-full items-center justify-center bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
                href="/participate"
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                Participate
              </HoverArrowLink>
            </div>
          </div>
          </ScrollFadeIn>
        </div>
      </div>

      {/* Logos Section */}
      <ScrollFadeIn className="bg-[rgba(193,217,191,0.8)] py-8">
        <div ref={logoMarquee.ref} className={`interfold-logo-marquee w-full${logoMarquee.started ? " interfold-logo-marquee--running" : ""}`}>
          <div className="interfold-logo-marquee__track">
            {["a", "b"].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-x-6 pr-6" aria-hidden={copy === "b"}>
                {mobileLogos.map((logo, i) => (
                  <MobilePartnerLogoFrame key={`${copy}-${i}`} href={logo.href} name={logo.name} visualScale={logo.visualScale}>
                    {logo.content}
                  </MobilePartnerLogoFrame>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScrollFadeIn>

      {/* Execution Model Section */}
      <ScrollFadeIn className="flex flex-col items-center bg-white px-6 py-16">
        <div className="mx-auto mb-12 w-full max-w-[320px] text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71] opacity-80">
            A new execution Model
          </p>
          <p data-preview-was="The Interfold brings confidential coordination to digital systems, turning private inputs into verifiable outcomes without data custody, input exposure, or trusted hardware." className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#3a5e3c]">
            The Interfold brings confidential coordination to digital systems, allowing multiple parties to compute over encrypted inputs and produce shared, verifiable outcomes.
          </p>
        </div>

        <div className="mb-12 w-full max-w-md">
          <AnimatedExecutionModelGraphic />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="space-y-2">
            <div className="h-0.5 w-full bg-[#3a5e3c]" />
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#3a5e3c]">
              01
            </p>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase">
              Encrypted inputs
            </p>
            <p data-preview-was="Data remains private throughout execution" className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              Sensitive data remains private during execution.
            </p>
          </div>

          <div className="space-y-2">
            <div className="h-0.5 w-full bg-[#3a5e3c]" />
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#3a5e3c]">
              02
            </p>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.2] tracking-[1.2px] uppercase">
              Threshold decryption
            </p>
            <p data-preview-was="A subset of nodes governs execution and release" className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              Ciphernode committees use threshold decryption so no single party controls decryption.
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
            <p data-preview-was="Results are verifiable without revealing inputs" className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c]">
              Results can be verified without revealing the private inputs behind them.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 w-[min(100%-96px,540px)]" data-preview-note="howItWorks">
          <HoverArrowLink
            className="flex w-full items-center justify-center bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
            href="https://blog.theinterfold.com/how-interfold-works/"
            textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
          >
            How Interfold Works
          </HoverArrowLink>
        </div>
      </ScrollFadeIn>

      {/* What Becomes Possible Section */}
      <ScrollFadeIn className="bg-[#d9fce8] px-6 py-16 pb-24">
        <div className="mx-auto mb-12 w-full max-w-[320px] text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            What Becomes Possible
          </p>
          <p data-preview-was="When shared outcomes no longer require exposing inputs or trusting a single operator, new coordination systems become possible." className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#3a5e3c]">
            When shared outcomes no longer require exposing private inputs or trusting a single operator, new forms of coordination become possible.
          </p>
        </div>

        <div className="mobile-what-possible-carousel mx-auto w-full max-w-md" ref={possibilityCarouselRef}>
          <Slider {...carouselSettings}>
            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.95] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Fairer market </p>
                    <p className="whitespace-pre">mechanisms</p>
                  </div>
                  <p data-preview-was="Sealed auction mechanisms where bids remain private and outcomes are verifiable" className="text-[14.429px] leading-[1.075]">
                    Sealed-bid and batch auctions where bids remain private while outcomes remain verifiable.
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover object-bottom scale-[1.02] translate-y-[16px]"
                      decoding="async"
                      loading="lazy"
                      src={imgChatGptImageApr232026051856Pm11}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.95] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Stronger democratic </p>
                    <p className="whitespace-pre">systems</p>
                  </div>
                  <p data-preview-was="Secret ballots with correct, verifiable tallying and no trusted operator" className="text-[14.429px] leading-[1.075]">
                    Confidential ballots with verifiable tallying, receipt-free voting, and no trusted ballot operator.
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover object-bottom scale-[1.02] translate-y-[8px]"
                      decoding="async"
                      loading="lazy"
                      src={imgChatGptImageApr232026051856Pm12}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1.5">
              <div className="flex flex-col gap-[20px] rounded-[24px] bg-[#121718] p-[8px]">
                <div className="flex flex-col gap-[8px] p-[16px] font-['ABC_Gramercy:Regular',sans-serif] text-[#d9fce8]">
                  <div className="text-[32px] leading-[0.95] tracking-[-0.96px]">
                    <p className="mb-0 whitespace-pre">Collaborative </p>
                    <p className="whitespace-pre">Intelligence</p>
                  </div>
                  <p data-preview-was="Multiple parties compute together to produce shared results without exposing data" className="text-[14.429px] leading-[1.075]">
                    Multiple parties compute across sensitive data and produce shared results without revealing the underlying inputs.
                  </p>
                </div>
                <div className="relative h-[324px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#121718]" />
                  <div className="absolute inset-0 mix-blend-plus-lighter">
                    <img
                      alt=""
                      className="h-full w-full object-cover object-bottom scale-[1.02] translate-y-[8px]"
                      decoding="async"
                      loading="lazy"
                      src={imgChatGptImageApr232026051856Pm13}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </ScrollFadeIn>

      {/* Participate Section */}
      <div id="participate">
        <ScrollFadeIn className="flex flex-col items-center bg-[#121718] px-6 py-16 text-center">
          <div className="mx-auto mb-12 w-full max-w-[320px]">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#d4f6da]">
              Participate
            </p>
            <p data-preview-was="Confidential coordination becomes real through both applications and operators: Builders create multiparty systems that use private inputs, while ciphernodes help distribute execution authority and govern outcome release. (the second sentence was dropped)" className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#d4f6da]">
              Confidential coordination becomes real through the people who operate the network, build applications, and bring new use cases to it.
            </p>
          </div>

        <div className="mx-auto flex w-[min(100%-96px,540px)] flex-col gap-3">
          <div className="w-full">
            <HoverArrowLink
              className="flex w-full items-center justify-center bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
              href="https://docs.theinterfold.com/getting-started"
              textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
            >
              Build on Interfold
            </HoverArrowLink>
          </div>
          <div className="w-full">
            <HoverArrowLink
              className="flex w-full items-center justify-center bg-[rgba(193,217,191,0.8)] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
              href="https://dashboard.theinterfold.com/#operator"
              textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
            >
              Run a ciphernode
            </HoverArrowLink>
          </div>
          <div className="w-full">
            <HoverArrowLink
              className="flex w-full items-center justify-center bg-[#82f5ad] px-6 py-4 transition-colors hover:bg-[#3a5e3c]"
              href="/participate"
              textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
            >
              Participate
            </HoverArrowLink>
          </div>
        </div>
        </ScrollFadeIn>
      </div>

      {/* Explore Section */}
      <ScrollFadeIn className="bg-white px-6 py-16">
        <div className="mx-auto mb-12 w-full max-w-[320px] text-center">
          <p className="font-['Office_Code_Pro:Medium',sans-serif] mb-3 text-[12px] leading-[1.2] tracking-[1.2px] uppercase text-[#687d71]">
            Explore
          </p>
          <p data-preview-was="Read the technical documentation, essays, and updates that explain how Interfold works, why confidential coordination matters, and what is live now." className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#3a5e3c]">
            Go deeper into how Interfold works, why confidential coordination matters, and what is live now.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-[10px]">
          <ExploreCard
            kind="docs"
            title="DOCS"
            cta="Explore Docs"
            href="https://docs.theinterfold.com/"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="docs"
          />
          <ExploreCard
            kind="essays"
            title="ESSAYS"
            cta="Read essays"
            href="https://blog.theinterfold.com/tag/confidential-coordination"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="essays"
          />
          <ExploreCard
            kind="blog"
            title="BLOG"
            cta="Read the blog"
            href="https://blog.theinterfold.com/"
            hoveredButton={hoveredButton}
            setHoveredButton={setHoveredButton}
            id="blog"
          />
        </div>
      </ScrollFadeIn>

      <DesktopFooter staticLayout />
    </div>
  );
}

function ExploreCard({
  kind,
  title,
  cta,
  href,
  hoveredButton,
  setHoveredButton,
  id
}: {
  kind: ExploreResourceIconKind;
  title: string;
  cta: string;
  href: string;
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
  id: string;
}) {
  return (
    <a
      className="group flex h-full w-full flex-col bg-white p-[6px] transition-colors hover:bg-[#d9fce8]"
      href={href}
      onMouseEnter={() => setHoveredButton(id)}
      onMouseLeave={() => setHoveredButton(null)}
    >
      <div className="flex h-full flex-col gap-[12px]">
        <div className="h-0 w-full border-t-[2.88577px] border-[#3a5e3c]" />
          <div className="flex h-[56px] w-full shrink-0 items-end justify-start">
            <ExploreResourceIcon className="h-full w-auto text-[#3a5e3c]" kind={kind} />
          </div>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] text-left text-[12px] uppercase leading-[1.075] tracking-[1.2px] text-[#252525]">
          {title}
        </p>
        <div className="mt-auto flex h-[44px] items-center justify-center overflow-hidden bg-[rgba(193,217,191,0.8)] px-1 transition-colors group-hover:bg-[#82f5ad]">
          <div className="relative inline-flex items-center justify-center">
            <motion.p
              className="font-['ABC_Gramercy:Regular',sans-serif] text-center text-[12.5px] leading-[1.075] text-[#3a5e3c]"
              animate={{ x: hoveredButton === id ? -8 : 0 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            >
              {cta}
            </motion.p>
            <motion.span
              className="absolute left-full ml-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: hoveredButton === id ? 1 : 0, x: hoveredButton === id ? 0 : -10 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </a>
  );
}
