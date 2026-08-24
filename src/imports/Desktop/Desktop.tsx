import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { AnimatePresence, motion } from "motion/react";
import svgPaths from "./svg-coxcrzwjvg";
import imgChatGptImageApr232026051856Pm11 from "./a80fa66d44b0ff61c570b989d6fb551d46380225.png";
import imgChatGptImageApr232026051856Pm12 from "./2ed5559bf52ac38f0d906307f0ed5c48d52a224a.png";
import imgChatGptImageApr232026051856Pm13 from "./5358f3e3b9a49f0d5d69994ddaa8f725c44612c4.png";
import aragonLogo from "./aragon-ant-logo-full.svg?no-inline";
import aztecLogo from "./aztec-wordmark-dark.svg";
import boundlessLogo from "./boundless-logo.svg";
import legionLogo from "./legion-logo.svg";
import taikoLogo from "./taiko-h-mono.svg";
import etmStackedLogo from "./encrypt-mempool-stacked.svg";
import { ExploreResourceIcon } from "../../app/components/ExploreResourceIcon";
import { GhostSignupForm } from "../../app/components/GhostSignupForm";
import { HeroImage, homeHeroSources } from "../../app/components/HeroImage";
import { HoverArrowContent, UnderlinedArrowLink } from "../../app/components/HoverArrowLink";
import { LineReveal } from "../../app/components/LineReveal";
import { NetworkStrip } from "../../app/components/NetworkStrip";
import { BUTTON_SIZE, SUPPORTING_LINE, TITLE_BLOCK_GAP } from "../../app/components/titleBlock";
import { LineRevealAuto } from "../../app/components/LineRevealAuto";
import { ScrollFadeIn } from "../../app/components/ScrollFadeIn";
import { useStartOnInView } from "../../app/components/useStartOnInView";

const friendLogos = [
  { name: "Aragon", href: "https://www.aragon.org/" },
  { name: "Taiko", href: "https://taiko.xyz/" },
  { name: "Aztec", href: "https://aztec.network/" },
  { name: "MetaLex", href: "https://www.metalex.tech/" },
  { name: "Legion", href: "https://legion.cc/" },
  { name: "Session", href: "https://getsession.org" },
  { name: "Boundless", href: "https://boundless.xyz/" },
  { name: "Encrypt the Mempool", href: "https://www.encryptedmempool.org/" },
];

const THREE_COLUMN_GRID_CLASS =
  "grid w-full grid-cols-1 gap-[16px] px-4 md:grid-cols-3 md:px-8 lg:w-[1052px] lg:max-w-[calc(100%_-_64px)] lg:px-0";

function PartnerLogoFrame({ children, visualScale = 1 }: { children: ReactNode; visualScale?: number }) {
  return (
    <span className="flex h-5 items-center justify-center lg:h-7">
      <span
        className="flex items-center justify-center"
        style={{ height: `${visualScale * 100}%` }}
      >
        {children}
      </span>
    </span>
  );
}

function PartnerLogoAsset({
  src,
  aspectRatio,
  maskSize = "contain",
}: {
  src: string;
  aspectRatio: string;
  maskSize?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="block h-full shrink-0 bg-[#3A5E3C]"
      style={{
        aspectRatio,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: maskSize,
        maskImage: `url(${src})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize,
      }}
    />
  );
}

function FriendLogo({
  children,
  friend,
  hoveredFriend,
  index,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  friend: (typeof friendLogos)[number];
  hoveredFriend: number | null;
  index: number;
  onMouseMove: (event: MouseEvent<HTMLAnchorElement>, index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}) {
  const isHovered = hoveredFriend === index;
  const isDimmed = hoveredFriend !== null && !isHovered;

  return (
    <motion.a
      aria-label={friend.name}
      className="-m-4 flex shrink-0 origin-center items-center justify-center p-4"
      href={friend.href}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onMouseMove={(event) => onMouseMove(event, index)}
      rel="noreferrer"
      target="_blank"
      animate={{ opacity: isDimmed ? 0.5 : 1, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.a>
  );
}

const logoVisuals: ReactNode[] = [
  <PartnerLogoFrame visualScale={0.86}><PartnerLogoAsset aspectRatio="2500 / 621" src={aragonLogo} /></PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.9}><PartnerLogoAsset aspectRatio="830 / 228" src={taikoLogo} /></PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.78}><PartnerLogoAsset aspectRatio="1170 / 300" src={aztecLogo} /></PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={1.06}>
    <svg className="h-full w-auto shrink-0" fill="none" viewBox="235 41 70 35">
      <path d={svgPaths.p67816f0} fill="#3A5E3C" />
      <path d={svgPaths.p1c53af00} fill="#3A5E3C" />
      <path d={svgPaths.p3ba98800} fill="#3A5E3C" />
    </svg>
  </PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.58}><PartnerLogoAsset aspectRatio="1154 / 170" src={legionLogo} /></PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.76}>
    <svg className="h-full w-auto shrink-0" fill="none" viewBox="738 41 164 35">
      <path d={svgPaths.p1ebc7480} fill="#3A5E3C" />
      <path d={svgPaths.p59a0800} fill="#3A5E3C" />
    </svg>
  </PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.54}><PartnerLogoAsset aspectRatio="901 / 114" src={boundlessLogo} /></PartnerLogoFrame>,
  <PartnerLogoFrame visualScale={0.9}><PartnerLogoAsset aspectRatio="791 / 219" src={etmStackedLogo} /></PartnerLogoFrame>,
];

function Frame() {
  const [hoveredFriend, setHoveredFriend] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const logoMarquee = useStartOnInView();

  const handleFriendMove = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    setHoveredFriend(index);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="relative isolate bg-[#d9fce8] w-full">
      <motion.div
        className="w-full bg-[rgba(193,217,191,0.8)] py-6 md:py-8 min-h-[115px] flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* lg+: static, evenly spaced single row */}
        <div className="mx-auto hidden w-full items-center justify-between gap-x-8 lg:flex lg:w-[1052px] lg:max-w-[calc(100%_-_64px)] lg:px-0">
          {logoVisuals.map((visual, i) => (
            <ScrollFadeIn key={i} className="shrink-0" delay={0.05 + i * 0.1}>
              <FriendLogo friend={friendLogos[i]} hoveredFriend={hoveredFriend} index={i} onMouseEnter={setHoveredFriend} onMouseLeave={() => setHoveredFriend(null)} onMouseMove={handleFriendMove}>
                {visual}
              </FriendLogo>
            </ScrollFadeIn>
          ))}
        </div>
        {/* below lg: not enough room — gently scroll the logos in a continuous marquee */}
        <div ref={logoMarquee.ref} className={`interfold-logo-marquee w-full lg:hidden ${logoMarquee.started ? "interfold-logo-marquee--running" : ""}`}>
          <div className="interfold-logo-marquee__track">
            {["a", "b"].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-x-12 pr-12" aria-hidden={copy === "b"}>
                {logoVisuals.map((visual, i) => (
                  <FriendLogo key={`${copy}-${i}`} friend={friendLogos[i]} hoveredFriend={hoveredFriend} index={i} onMouseEnter={setHoveredFriend} onMouseLeave={() => setHoveredFriend(null)} onMouseMove={handleFriendMove}>
                    {visual}
                  </FriendLogo>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hoveredFriend !== null && (
              <motion.div
                key="friend-tooltip"
                className="pointer-events-none fixed z-[9999] overflow-hidden bg-[#3a5e3c] px-3 py-2 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#d9fce8]"
                initial={{ opacity: 0, scale: 0.96, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 4 }}
                style={{ left: tooltipPosition.x + 18, top: tooltipPosition.y + 18, transformOrigin: "left top" }}
                transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.span
                  className="block whitespace-nowrap"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
                >
                  {friendLogos[hoveredFriend].name} →
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function Frame16() {
  return (
    <div className={`content-stretch flex flex-col ${TITLE_BLOCK_GAP} items-center not-italic relative shrink-0 text-center w-full md:w-[597px] px-4 md:px-0`}>
      <ScrollFadeIn className="w-full">
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] relative shrink-0 text-[#8a9c90] text-[14px] tracking-[1.4px] uppercase w-full">What Becomes Possible</p>
      </ScrollFadeIn>
      <p data-preview-was="When shared outcomes no longer require exposing inputs or trusting a single operator, new coordination systems become possible." className="font-['ABC_Gramercy:Regular',sans-serif] leading-[0.95] relative shrink-0 text-[#3a5e3c] text-[32px] tracking-[-0.96px] w-full">
        <LineRevealAuto delay={0.1} text="New forms of coordination become possible." />
      </p>
      <ScrollFadeIn className="w-full flex justify-center" delay={0.2}>
        <p className={`${SUPPORTING_LINE} relative shrink-0 text-[#687d71] w-full md:w-[440px]`}>When shared outcomes no longer require exposing private inputs or trusting a single operator.</p>
      </ScrollFadeIn>
    </div>
  );
}

function AnimatedButtonContent({
  children,
  isExternal = false,
  isHovered,
  arrowClassName = "absolute left-full ml-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]",
  textClassName,
}: {
  children: string;
  isExternal?: boolean;
  isHovered: boolean;
  arrowClassName?: string;
  textClassName: string;
}) {
  return (
    <HoverArrowContent
      animateInView
      arrowClassName={arrowClassName}
      isExternal={isExternal}
      isHovered={isHovered}
      textClassName={textClassName}
    >
      {children}
    </HoverArrowContent>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col font-['ABC_Gramercy:Regular',sans-serif] gap-[8px] items-start not-italic p-[16px] relative size-full text-[#d9fce8]">
        <div className="leading-[0] relative shrink-0 text-[24px] md:text-[28px] lg:text-[32px] tracking-[-0.96px]">
          <p className="leading-[0.95] mb-0">Fairer market</p>
          <p className="leading-[0.95]">mechanisms</p>
        </div>
        <p data-preview-was="Sealed auction mechanisms where bids remain private and outcomes are verifiable" className="leading-[1.075] relative shrink-0 text-[13px] md:text-[14px] lg:text-[14px] max-w-full">Sealed-bid and batch auctions where bids remain private while outcomes remain verifiable.</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col font-['ABC_Gramercy:Regular',sans-serif] gap-[8px] items-start not-italic p-[16px] relative size-full text-[#d9fce8]">
        <div className="leading-[0] relative shrink-0 text-[24px] md:text-[28px] lg:text-[32px] tracking-[-0.96px]">
          <p className="leading-[0.95] mb-0">Stronger democratic</p>
          <p className="leading-[0.95]">systems</p>
        </div>
        <p data-preview-was="Secret ballots with correct, verifiable tallying and no trusted operator" className="leading-[1.075] relative shrink-0 text-[13px] md:text-[14px] lg:text-[14px] max-w-full">Confidential ballots with verifiable tallying, receipt-free voting, and no trusted ballot operator.</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col font-['ABC_Gramercy:Regular',sans-serif] gap-[8px] items-start not-italic p-[16px] relative size-full text-[#d9fce8]">
        <div className="leading-[0] relative shrink-0 text-[24px] md:text-[28px] lg:text-[32px] tracking-[-0.96px]">
          <p className="leading-[0.95] mb-0">Collaborative</p>
          <p className="leading-[0.95]">Intelligence</p>
        </div>
        <p data-preview-was="Multiple parties compute together to produce shared results without exposing data" className="leading-[1.075] relative shrink-0 text-[13px] md:text-[14px] lg:text-[14px] max-w-full">Multiple parties compute across sensitive data and produce shared results without revealing the underlying inputs.</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className={`${THREE_COLUMN_GRID_CLASS} content-stretch items-stretch relative shrink-0 md:auto-rows-fr lg:h-[550px]`}>
      <ScrollFadeIn className="w-full h-full" delay={0.3}>
        <div className="bg-[#121718] content-stretch flex h-full flex-col items-start overflow-hidden p-[8px] relative rounded-[24px] shrink-0 w-full max-w-none lg:h-[550px]">
          <ScrollFadeIn className="w-full" delay={0.75}>
            <Frame22 />
          </ScrollFadeIn>
          <div className="relative mt-auto flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-[24px] shrink-0 w-full" data-name="ChatGPT Image Apr 23, 2026, 05_18_56 PM (1) 1">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
              <div className="absolute bg-[#121718] inset-0 rounded-[24px]" />
              <div className="absolute inset-0 mix-blend-plus-lighter overflow-hidden rounded-[24px]">
                <img alt="" className="absolute bottom-0 h-auto left-1/2 max-w-none w-[185.58%] -translate-x-1/2 translate-y-[28px]" decoding="async" loading="lazy" src={imgChatGptImageApr232026051856Pm11} />
              </div>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn className="w-full h-full" delay={0.4}>
        <div className="bg-[#121718] content-stretch flex h-full flex-col items-start overflow-hidden p-[8px] relative rounded-[24px] shrink-0 w-full max-w-none lg:h-[550px]">
          <ScrollFadeIn className="w-full" delay={0.85}>
            <Frame24 />
          </ScrollFadeIn>
          <div className="relative mt-auto flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-[24px] shrink-0 w-full" data-name="ChatGPT Image Apr 23, 2026, 05_18_56 PM (1) 1">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
              <div className="absolute bg-[#121718] inset-0 rounded-[24px]" />
              <div className="absolute inset-0 mix-blend-plus-lighter overflow-hidden rounded-[24px]">
                <img alt="" className="absolute bottom-0 h-auto left-1/2 max-w-none w-[155.47%] -translate-x-1/2 translate-y-[10px]" decoding="async" loading="lazy" src={imgChatGptImageApr232026051856Pm12} />
              </div>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn className="w-full h-full" delay={0.5}>
        <div className="bg-[#121718] content-stretch flex h-full flex-col items-start overflow-hidden p-[8px] relative rounded-[24px] shrink-0 w-full max-w-none lg:h-[550px]">
          <ScrollFadeIn className="w-full" delay={0.95}>
            <Frame25 />
          </ScrollFadeIn>
          <div className="relative mt-auto flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-[24px] shrink-0 w-full" data-name="ChatGPT Image Apr 23, 2026, 05_18_56 PM (1) 1">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
              <div className="absolute bg-[#121718] inset-0 rounded-[24px]" />
              <div className="absolute inset-0 mix-blend-plus-lighter overflow-hidden rounded-[24px]">
                <img alt="" className="absolute bottom-0 h-auto left-1/2 max-w-none w-[159.86%] -translate-x-1/2 translate-y-[12px]" decoding="async" loading="lazy" src={imgChatGptImageApr232026051856Pm13} />
              </div>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative bg-[#d9fce8] content-stretch flex flex-col gap-[64px] md:gap-[96px] items-center justify-center py-[64px] md:py-[112px] w-full">
      <Frame16 />
      <Frame23 />
    </div>
  );
}

function Frame8() {
  return (
    <div className={`content-stretch flex flex-col ${TITLE_BLOCK_GAP} items-center not-italic relative shrink-0 text-[#d4f6da] text-center w-full md:w-[540px] px-4 md:px-0`}>
      <ScrollFadeIn className="w-full">
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] relative shrink-0 text-[#d4f6da]/55 text-[14px] tracking-[1.4px] uppercase w-full">Participate</p>
      </ScrollFadeIn>
      <p data-preview-was="Confidential coordination becomes real through both applications and operators: Builders create multiparty systems that use private inputs, while ciphernodes help distribute execution authority and govern outcome release. (the second sentence was dropped)" className="font-['ABC_Gramercy:Regular',sans-serif] leading-[0.95] relative shrink-0 text-[32px] tracking-[-0.96px] w-full">
        <LineRevealAuto delay={0.1} text="Help form the network." />
      </p>
      <ScrollFadeIn className="w-full flex justify-center" delay={0.2}>
        <p className={`${SUPPORTING_LINE} relative shrink-0 text-[#d4f6da]/55 w-full md:w-[440px]`}>Operate the network, build applications, or bring new use cases to Interfold.</p>
      </ScrollFadeIn>
    </div>
  );
}

// Marvin: this section was repeating the hero's CTAs. It is now a compact
// version of the three participation paths from the Participate page —
// title, one line, one link — and a text link to the page itself.
const participationPaths = [
  {
    body: "Operate infrastructure for confidential coordination.",
    cta: "Run a ciphernode",
    href: "https://dashboard.theinterfold.com/#operator",
    title: "Run a ciphernode",
  },
  {
    body: "Build applications using private inputs and verifiable outcomes.",
    cta: "Explore docs",
    href: "https://docs.theinterfold.com/getting-started",
    title: "Build and integrate",
  },
  {
    body: "Bring a live use case to Interfold.",
    cta: "Reach out",
    href: "mailto:comms@gnosisguild.org",
    title: "Partner on a pilot",
  },
];

function Frame9() {
  return (
    <div className="content-stretch flex w-full flex-col items-center gap-[48px]">
      <div className={`${THREE_COLUMN_GRID_CLASS} items-start gap-y-[40px]`}>
        {participationPaths.map((path, index) => (
          <ScrollFadeIn className="w-full" delay={0.3 + index * 0.1} key={path.title}>
            <div className="flex flex-col items-start gap-[8px] text-left">
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] text-[#d9fce8]">
                {path.title}
              </p>
              <p className={`${SUPPORTING_LINE} text-[#d4f6da]/55`}>{path.body}</p>
              <UnderlinedArrowLink
                className="mt-[8px] inline-flex"
                href={path.href}
                textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.2] tracking-[1.4px] text-[#82f5ad] md:text-[14px]"
              >
                {path.cta}
              </UnderlinedArrowLink>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
      <ScrollFadeIn delay={0.6}>
        <UnderlinedArrowLink
          className="inline-flex"
          href="/participate"
          textClassName={`${SUPPORTING_LINE} text-[#82f5ad]`}
        >
          Explore all ways to participate
        </UnderlinedArrowLink>
      </ScrollFadeIn>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex w-full flex-col items-center justify-center gap-[96px] relative shrink-0">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame11() {
  return (
    <div id="participate" className="relative bg-[#121718] content-stretch flex flex-col items-center justify-center py-[64px] md:py-[112px] w-full">
      <Frame10 />
    </div>
  );
}

function Frame18() {
  return (
    <div className={`content-stretch flex flex-col ${TITLE_BLOCK_GAP} items-center not-italic relative shrink-0 text-center w-full md:w-[597px] px-4 md:px-0`}>
      <ScrollFadeIn className="w-full">
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] relative shrink-0 text-[#8a9c90] text-[14px] tracking-[1.4px] uppercase w-full">Explore</p>
      </ScrollFadeIn>
      <p data-preview-was="Read the technical documentation, essays, and updates that explain how Interfold works, why confidential coordination matters, and what is live now." className="font-['ABC_Gramercy:Regular',sans-serif] leading-[0.95] relative shrink-0 text-[#3a5e3c] text-[32px] tracking-[-0.96px] w-full">
        <LineRevealAuto delay={0.1} text="Go deeper." />
      </p>
      <ScrollFadeIn className="w-full flex justify-center" delay={0.2}>
        <p className={`${SUPPORTING_LINE} relative shrink-0 text-[#687d71] w-full md:w-[440px]`}>Explore how Interfold works, why confidential coordination matters, and what is live now.</p>
      </ScrollFadeIn>
    </div>
  );
}

function Frame3() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[rgba(193,217,191,0.8)] content-stretch flex ${BUTTON_SIZE} items-center justify-center relative shrink-0 w-full transition-colors hover:bg-[#3a5e3c]`}
      href="https://docs.theinterfold.com/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        Explore Docs
      </AnimatedButtonContent>
    </a>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex h-full flex-col gap-[16px] items-start p-[8px] relative shrink-0 w-full max-w-none transition-colors hover:bg-[#d9fce8] focus-within:bg-[#d9fce8]">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-2.89px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 2.88577">
            <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="324" y1="1.44289" y2="1.44289" />
          </svg>
        </div>
      </div>
      <div className="flex h-[71px] w-[55px] shrink-0 items-end justify-center">
        <ExploreResourceIcon className="h-full w-auto text-[#3a5e3c]" kind="docs" />
      </div>
      <div className="content-stretch flex min-h-[104px] flex-col gap-[8px] items-start relative shrink-0 w-full">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
              <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" x2="324" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">DOCS</p>
        <p className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Technical documentation, references, and implementation details.</p>
      </div>
      <div className="mt-auto w-full">
        <Frame3 />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-full items-center relative shrink-0 w-full">
        <Frame26 />
      </div>
    </div>
  );
}

function Frame4() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[rgba(193,217,191,0.8)] content-stretch flex ${BUTTON_SIZE} items-center justify-center relative shrink-0 w-full transition-colors hover:bg-[#3a5e3c]`}
      href="https://blog.theinterfold.com/tag/confidential-coordination"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        Read essays
      </AnimatedButtonContent>
    </a>
  );
}

function Frame28() {
  return (
    <div className="bg-white content-stretch flex h-full flex-col gap-[16px] items-start p-[8px] relative shrink-0 w-full max-w-none transition-colors hover:bg-[#d9fce8] focus-within:bg-[#d9fce8]">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-2.89px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 2.88577">
            <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="324" y1="1.44289" y2="1.44289" />
          </svg>
        </div>
      </div>
      <div className="flex h-[71px] w-[55px] shrink-0 items-end justify-center">
        <ExploreResourceIcon className="h-full w-auto text-[#3a5e3c]" kind="essays" />
      </div>
      <div className="content-stretch flex min-h-[104px] flex-col gap-[8px] items-start relative shrink-0 w-full">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
              <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" x2="324" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">essays</p>
        <p className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Writing on confidential coordination and the architecture behind the network.</p>
      </div>
      <div className="mt-auto w-full">
        <Frame4 />
      </div>
    </div>
  );
}

function Frame5() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[rgba(193,217,191,0.8)] content-stretch flex ${BUTTON_SIZE} items-center justify-center relative shrink-0 w-full transition-colors hover:bg-[#3a5e3c]`}
      href="https://blog.theinterfold.com/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        Read the blog
      </AnimatedButtonContent>
    </a>
  );
}

function Frame29() {
  return (
    <div className="bg-white content-stretch flex h-full flex-col gap-[16px] items-start p-[8px] relative shrink-0 w-full max-w-none transition-colors hover:bg-[#d9fce8] focus-within:bg-[#d9fce8]">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-2.89px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 2.88577">
            <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="324" y1="1.44289" y2="1.44289" />
          </svg>
        </div>
      </div>
      <div className="flex h-[71px] w-[55px] shrink-0 items-end justify-center">
        <ExploreResourceIcon className="h-full w-auto text-[#3a5e3c]" kind="blog" />
      </div>
      <div className="content-stretch flex min-h-[104px] flex-col gap-[8px] items-start relative shrink-0 w-full">
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
              <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" x2="324" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">BLOG</p>
        <p className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Updates, research notes, and ecosystem announcements.</p>
      </div>
      <div className="mt-auto w-full">
        <Frame5 />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch grid grid-cols-1 gap-[16px] items-stretch justify-center relative shrink-0 w-full px-4 md:grid-cols-3 md:auto-rows-fr md:px-8 lg:w-[1052px] lg:max-w-[calc(100%_-_64px)] lg:px-0">
      <ScrollFadeIn className="h-full w-full" delay={0.1}>
        <Frame27 />
      </ScrollFadeIn>
      <ScrollFadeIn className="h-full w-full" delay={0.2}>
        <div className="content-stretch flex h-full items-center relative shrink-0 w-full">
          <Frame28 />
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn className="h-full w-full" delay={0.5}>
        <div className="content-stretch flex h-full items-center relative shrink-0 w-full">
          <Frame29 />
        </div>
      </ScrollFadeIn>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative bg-white content-stretch flex flex-col gap-[64px] md:gap-[96px] items-center pb-[64px] md:pb-[224px] pt-[64px] md:pt-[112px] w-full">
      <Frame18 />
      <Frame30 />
    </div>
  );
}

function Frame14() {
  return (
    <div className={`content-stretch flex flex-col ${TITLE_BLOCK_GAP} items-center not-italic opacity-80 relative shrink-0 text-center w-full md:w-[597px] px-4 md:px-0`}>
      <ScrollFadeIn className="w-full flex justify-center">
        <div className="font-['Office_Code_Pro:Medium',sans-serif] leading-[0] relative shrink-0 text-[#8a9c90] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
          <p className="leading-[1.075] mb-0 whitespace-pre">{`A new `}</p>
          <p className="leading-[1.075] whitespace-pre">execution Model</p>
        </div>
      </ScrollFadeIn>
      <p data-preview-was="The Interfold brings confidential coordination to digital systems, turning private inputs into verifiable outcomes without data custody, input exposure, or trusted hardware." className="font-['ABC_Gramercy:Regular',sans-serif] leading-[0.95] min-w-full relative shrink-0 text-[#3a5e3c] text-[32px] tracking-[-0.96px] w-[min-content]">
        <LineRevealAuto delay={0.1} text="The Interfold brings confidential coordination to digital systems." />
      </p>
      <ScrollFadeIn className="w-full flex justify-center" delay={0.2}>
        <p className={`${SUPPORTING_LINE} relative shrink-0 text-[#687d71] w-full md:w-[440px]`}>Multiple parties compute over encrypted inputs and produce shared, verifiable outcomes.</p>
      </ScrollFadeIn>
    </div>
  );
}

const executionFlowLinePaths = [
  { d: svgPaths.p123a9f60, order: 0 },
  { d: svgPaths.p21624440, order: 1 },
  { d: svgPaths.pe4db960, order: 2 },
  { d: svgPaths.p510e600, order: 3 },
  { d: svgPaths.p2e229900, order: 4 },
  { d: svgPaths.pc115780, order: 5 },
  { d: svgPaths.p3bf3d180, order: 6 },
  { d: svgPaths.p3f53d2c0, order: 7 },
  { d: svgPaths.p39d77040, order: 0 },
  { d: svgPaths.p5f6cf80, order: 1 },
  { d: svgPaths.pf569a00, order: 2 },
  { d: svgPaths.p21910e80, order: 3 },
  { d: svgPaths.p313dfde0, order: 4 },
  { d: "M711.769 127.996H778.918", order: 4 },
  { d: svgPaths.pd678600, order: 5 },
  { d: svgPaths.p35357400, order: 6 },
  { d: svgPaths.p1e4e5a40, order: 7 },
  { d: svgPaths.p21bd2000, order: 8 },
  { d: svgPaths.p2a2f8580, order: 9 },
] as const;

const executionFlowMaxOrder = Math.max(...executionFlowLinePaths.map(({ order }) => order));
const executionFlowCycleDuration = 1 / 0.22;
const executionFlowInputSquareLead = 0.09;

const executionFlowViewBox = {
  height: 256,
  width: 819.892,
};

type ExecutionFlowHoverZone = "inputs" | "nodes" | "output" | null;

function getExecutionFlowStagger(order: number, pathIndex = 0) {
  const normalizedOrder = executionFlowMaxOrder === 0 ? 0 : order / executionFlowMaxOrder;
  const easedOrder = normalizedOrder * normalizedOrder * normalizedOrder * (normalizedOrder * (normalizedOrder * 6 - 15) + 10);

  return ((1 - easedOrder) * 0.42 + pathIndex * 0.004) % 1;
}

const executionFlowVertexShader = `
  attribute float aAlong;
  attribute float aOffset;
  varying float vAlong;
  varying float vOffset;

  void main() {
    vAlong = aAlong;
    vOffset = aOffset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const executionFlowFragmentShader = `
  precision highp float;

  uniform float uOpacity;
  uniform float uTime;
  varying float vAlong;
  varying float vOffset;

  void main() {
    float head = fract(uTime + vOffset);
    float distanceToHead = abs(fract(vAlong - head + 0.5) - 0.5);
    float signal = smoothstep(0.24, 0.0, distanceToHead);
    float alpha = pow(signal, 1.18) * uOpacity;

    if (alpha < 0.01) {
      discard;
    }

    gl_FragColor = vec4(0.5098, 0.9608, 0.6784, alpha);
  }
`;

function parseExecutionFlowPath(pathData: string) {
  const tokens = pathData.match(/[MLHV]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const points: THREE.Vector2[] = [];
  let command = "";
  let cursor = new THREE.Vector2(0, 0);

  for (let index = 0; index < tokens.length; ) {
    const token = tokens[index];

    if (/^[MLHV]$/i.test(token)) {
      command = token.toUpperCase();
      index += 1;
      continue;
    }

    if (command === "M" || command === "L") {
      const x = Number(token);
      const y = Number(tokens[index + 1]);
      cursor = new THREE.Vector2(x, y);
      points.push(cursor.clone());
      index += 2;
      if (command === "M") {
        command = "L";
      }
      continue;
    }

    if (command === "H") {
      cursor = new THREE.Vector2(Number(token), cursor.y);
      points.push(cursor.clone());
      index += 1;
      continue;
    }

    if (command === "V") {
      cursor = new THREE.Vector2(cursor.x, Number(token));
      points.push(cursor.clone());
      index += 1;
      continue;
    }

    index += 1;
  }

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  if (firstPoint && lastPoint && (firstPoint.x > lastPoint.x || (firstPoint.x === lastPoint.x && firstPoint.y > lastPoint.y))) {
    points.reverse();
  }

  const distances = [0];
  for (let index = 1; index < points.length; index += 1) {
    distances.push(distances[index - 1] + points[index].distanceTo(points[index - 1]));
  }

  const length = distances[distances.length - 1] ?? 0;

  return { distances, length, points };
}

function getExecutionFlowMiter(points: THREE.Vector2[], pointIndex: number, halfWidth: number) {
  const previousPoint = points[Math.max(0, pointIndex - 1)];
  const point = points[pointIndex];
  const nextPoint = points[Math.min(points.length - 1, pointIndex + 1)];
  const previousDirection = point.clone().sub(previousPoint);
  const nextDirection = nextPoint.clone().sub(point);

  if (previousDirection.lengthSq() === 0 && nextDirection.lengthSq() === 0) {
    return new THREE.Vector2(0, halfWidth);
  }

  if (previousDirection.lengthSq() === 0) {
    const direction = nextDirection.normalize();
    return new THREE.Vector2(-direction.y, direction.x).multiplyScalar(halfWidth);
  }

  if (nextDirection.lengthSq() === 0) {
    const direction = previousDirection.normalize();
    return new THREE.Vector2(-direction.y, direction.x).multiplyScalar(halfWidth);
  }

  const previousNormal = new THREE.Vector2(-previousDirection.y, previousDirection.x).normalize();
  const nextNormal = new THREE.Vector2(-nextDirection.y, nextDirection.x).normalize();
  const miter = previousNormal.clone().add(nextNormal);

  if (miter.lengthSq() < 0.0001) {
    return nextNormal.multiplyScalar(halfWidth);
  }

  miter.normalize();
  const scale = halfWidth / Math.max(0.25, miter.dot(nextNormal));

  return miter.multiplyScalar(Math.min(scale, halfWidth * 3));
}

function createExecutionFlowGeometry(lineWidth: number) {
  const halfWidth = lineWidth / 2;
  const positions: number[] = [];
  const alongs: number[] = [];
  const offsets: number[] = [];
  const indices: number[] = [];

  executionFlowLinePaths.forEach(({ d, order }, pathIndex) => {
    const { distances, length, points } = parseExecutionFlowPath(d);
    if (points.length < 2 || length === 0) {
      return;
    }

    const baseVertexIndex = positions.length / 3;
    const offset = getExecutionFlowStagger(order, pathIndex);

    points.forEach((point, pointIndex) => {
      const normal = getExecutionFlowMiter(points, pointIndex, halfWidth);
      const along = distances[pointIndex] / length;

      positions.push(point.x + normal.x, point.y + normal.y, 0);
      positions.push(point.x - normal.x, point.y - normal.y, 0);
      alongs.push(along, along);
      offsets.push(offset, offset);
    });

    for (let pointIndex = 0; pointIndex < points.length - 1; pointIndex += 1) {
      const current = baseVertexIndex + pointIndex * 2;
      indices.push(current, current + 1, current + 2, current + 1, current + 3, current + 2);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aAlong", new THREE.Float32BufferAttribute(alongs, 1));
  geometry.setAttribute("aOffset", new THREE.Float32BufferAttribute(offsets, 1));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  return geometry;
}

function createExecutionFlowMaterial(opacity: number) {
  return new THREE.ShaderMaterial({
    blending: THREE.NormalBlending,
    depthTest: false,
    depthWrite: false,
    fragmentShader: executionFlowFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uOpacity: { value: opacity },
      uTime: { value: 0 },
    },
    vertexShader: executionFlowVertexShader,
  });
}

function ExecutionFlowThreeGlows({ isHidden }: { isHidden: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mount || reduceMotion.matches) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, executionFlowViewBox.width, 0, executionFlowViewBox.height, -10, 10);
    camera.position.z = 1;

    const haloMaterial = createExecutionFlowMaterial(0.2);
    const coreMaterial = createExecutionFlowMaterial(0.96);
    const haloMesh = new THREE.Mesh(createExecutionFlowGeometry(8.6), haloMaterial);
    const coreMesh = new THREE.Mesh(createExecutionFlowGeometry(3.15), coreMaterial);
    scene.add(haloMesh, coreMesh);

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = (clock.getElapsedTime() * 0.22) % 1;
      haloMaterial.uniforms.uTime.value = time;
      coreMaterial.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      haloMesh.geometry.dispose();
      coreMesh.geometry.dispose();
      haloMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none execution-flow-three-glows transition-opacity duration-200 ${isHidden ? "opacity-0" : "opacity-100"}`}
      ref={mountRef}
    />
  );
}

type ExecutionFlowInputSquareProps = {
  d: string;
  order: number;
};

type ExecutionFlowPulseDotProps = {
  order: number;
  x: number;
  y: number;
};

function ExecutionFlowInputSquare({ d, order }: ExecutionFlowInputSquareProps) {
  return (
    <path
      className="execution-flow-input-square"
      d={d}
      fill="#252525"
      style={{
        animationDelay: `${-(getExecutionFlowStagger(order) + executionFlowInputSquareLead) * executionFlowCycleDuration}s`,
        animationDuration: `${executionFlowCycleDuration}s`,
      }}
    />
  );
}

function ExecutionFlowPulseDot({ order, x, y }: ExecutionFlowPulseDotProps) {
  return (
    <g
      className="execution-flow-pulse-dot"
      style={{
        animationDelay: `${-getExecutionFlowStagger(order) * executionFlowCycleDuration}s`,
        animationDuration: `${executionFlowCycleDuration}s`,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <circle className="execution-flow-pulse-dot-halo" cx={x} cy={y} r="5.6" />
      <circle className="execution-flow-pulse-dot-core" cx={x} cy={y} r="2.7" />
    </g>
  );
}

function ExecutionFlowPulseDotsOverlay({ hoveredZone }: { hoveredZone: ExecutionFlowHoverZone }) {
  const hoverClass =
    hoveredZone === "nodes"
      ? "execution-flow-pulse-dots-hover-nodes"
      : hoveredZone === "output"
        ? "execution-flow-pulse-dots-hover-output"
        : hoveredZone === "inputs"
          ? "execution-flow-pulse-dots-hover-inputs"
          : "";

  return (
    <svg className={`absolute block inset-0 pointer-events-none size-full overflow-visible ${hoverClass}`} fill="none" preserveAspectRatio="none" viewBox="0 0 819.892 256">
      <g clipPath="url(#clip0_execution_flow_pulse_dots)">
        <style>{`
          .execution-flow-pulse-dot {
            animation-name: execution-flow-pulse-dot-scale;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            animation-iteration-count: infinite;
          }

          .execution-flow-pulse-dot-core {
            fill: #82F5AD;
          }

          .execution-flow-pulse-dots-hover-inputs .execution-flow-pulse-dot,
          .execution-flow-pulse-dots-hover-output .execution-flow-pulse-dot {
            opacity: 0.5;
            animation: none;
          }

          .execution-flow-pulse-dots-hover-inputs .execution-flow-final-dot,
          .execution-flow-pulse-dots-hover-nodes .execution-flow-final-dot {
            opacity: 0.5;
            animation: none;
          }

          .execution-flow-pulse-dots-hover-inputs .execution-flow-pulse-dot-core,
          .execution-flow-pulse-dots-hover-inputs .execution-flow-final-dot,
          .execution-flow-pulse-dots-hover-nodes .execution-flow-final-dot,
          .execution-flow-pulse-dots-hover-output .execution-flow-pulse-dot-core {
            fill: #252525 !important;
          }

          .execution-flow-pulse-dots-hover-inputs .execution-flow-pulse-dot-halo,
          .execution-flow-pulse-dots-hover-inputs .execution-flow-final-dot-halo,
          .execution-flow-pulse-dots-hover-nodes .execution-flow-final-dot-halo {
            opacity: 0;
            animation: none;
          }

          .execution-flow-pulse-dots-hover-output .execution-flow-pulse-dot-halo {
            opacity: 0;
            animation: none;
          }

          .execution-flow-pulse-dots-hover-nodes .execution-flow-pulse-dot {
            animation-name: execution-flow-hover-dot-scale;
            animation-duration: 1.8s !important;
            animation-delay: 0s !important;
          }

          .execution-flow-pulse-dots-hover-nodes .execution-flow-pulse-dot-halo {
            animation-name: execution-flow-hover-dot-halo !important;
            animation-duration: 1.8s !important;
            animation-delay: 0s !important;
          }

          .execution-flow-pulse-dots-hover-output .execution-flow-final-dot {
            animation-duration: 1.65s;
            animation-delay: 0s;
            animation-name: execution-flow-hover-final-dot-scale, execution-flow-final-dot-hover-color;
            filter: drop-shadow(0 0 4px rgba(130, 245, 173, 0.65)) drop-shadow(0 0 10px rgba(130, 245, 173, 0.28));
          }

          .execution-flow-pulse-dots-hover-output .execution-flow-final-dot-halo {
            animation-duration: 1.65s;
            animation-delay: 0s;
          }

          .execution-flow-final-dot {
            animation-name: execution-flow-final-dot-scale, execution-flow-final-dot-color;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1);
            animation-iteration-count: infinite, infinite;
            animation-duration: ${executionFlowCycleDuration}s;
            animation-delay: ${-getExecutionFlowStagger(4) * executionFlowCycleDuration}s;
            fill: #252525;
            transform-box: fill-box;
            transform-origin: center;
          }

          .execution-flow-pulse-dot-halo {
            fill: #82F5AD;
            opacity: 0;
          }

          .execution-flow-final-dot-halo {
            animation-name: execution-flow-final-dot-halo;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            animation-iteration-count: infinite;
            animation-duration: ${executionFlowCycleDuration}s;
            animation-delay: ${-getExecutionFlowStagger(4) * executionFlowCycleDuration}s;
            fill: #82F5AD;
            opacity: 0;
          }

          .execution-flow-pulse-dot .execution-flow-pulse-dot-halo {
            animation-name: execution-flow-pulse-dot-halo;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            animation-iteration-count: infinite;
            animation-duration: inherit;
            animation-delay: inherit;
          }

          @keyframes execution-flow-pulse-dot-scale {
            0% {
              transform: scale(1.34);
            }

            12%,
            100% {
              transform: scale(1);
            }
          }

          @keyframes execution-flow-final-dot-scale {
            0% {
              transform: scale(1);
            }

            5% {
              transform: scale(1.09);
            }

            40%,
            100% {
              transform: scale(1);
            }
          }

          @keyframes execution-flow-final-dot-color {
            0% {
              fill: #252525;
            }

            8%,
            18% {
              fill: #82F5AD;
            }

            82%,
            100% {
              fill: #252525;
            }
          }

          @keyframes execution-flow-hover-final-dot-scale {
            0%,
            100% {
              transform: scale(1);
            }

            45% {
              transform: scale(1.12);
            }
          }

          @keyframes execution-flow-final-dot-hover-color {
            0%,
            100% {
              fill: #3a5e3c;
              opacity: 0.86;
            }

            45% {
              fill: #82F5AD;
              opacity: 1;
            }
          }

          @keyframes execution-flow-pulse-dot-halo {
            0% {
              opacity: 0.38;
            }

            16%,
            100% {
              opacity: 0;
            }
          }

          @keyframes execution-flow-hover-dot-scale {
            0%,
            100% {
              transform: scale(1);
            }

            45% {
              transform: scale(1.28);
            }
          }

          @keyframes execution-flow-hover-dot-halo {
            0%,
            100% {
              opacity: 0.08;
            }

            45% {
              opacity: 0.42;
            }
          }

          @keyframes execution-flow-final-dot-halo {
            0% {
              opacity: 0;
            }

            5% {
              opacity: 0.22;
            }

            38%,
            100% {
              opacity: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .execution-flow-pulse-dot,
            .execution-flow-pulse-dot .execution-flow-pulse-dot-halo,
            .execution-flow-final-dot,
            .execution-flow-final-dot-halo {
              animation: none;
            }
          }
        `}</style>
        <circle className="execution-flow-final-dot-halo" cx="805.785" cy="127.979" r="20" />
        <circle className="execution-flow-final-dot" cx="805.785" cy="127.979" r="13.43" />
        <ExecutionFlowPulseDot order={0} x={476.758} y={114.521} />
        <ExecutionFlowPulseDot order={1} x={476.758} y={127.99} />
        <ExecutionFlowPulseDot order={2} x={476.758} y={141.481} />
        <ExecutionFlowPulseDot order={3} x={476.758} y={154.927} />
        <ExecutionFlowPulseDot order={4} x={476.758} y={168.418} />
        <ExecutionFlowPulseDot order={5} x={476.758} y={181.909} />
        <ExecutionFlowPulseDot order={6} x={476.758} y={195.354} />
        <ExecutionFlowPulseDot order={7} x={476.758} y={208.845} />
      </g>
      <defs>
        <clipPath id="clip0_execution_flow_pulse_dots">
          <rect fill="white" height="256" width="840" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ExecutionFlowInputSquaresOverlay({ hoveredZone }: { hoveredZone: ExecutionFlowHoverZone }) {
  const hoverClass =
    hoveredZone === "inputs"
      ? "execution-flow-inputs-hover"
      : hoveredZone
        ? "execution-flow-inputs-hidden"
        : "";

  return (
    <svg className={`absolute block inset-0 pointer-events-none size-full ${hoverClass}`} fill="none" preserveAspectRatio="none" viewBox="0 0 819.892 256">
      <g clipPath="url(#clip0_execution_flow_inputs)">
        <style>{`
          .execution-flow-input-square {
            animation-name: execution-flow-input-square-pulse;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            animation-iteration-count: infinite;
          }

          .execution-flow-inputs-hidden .execution-flow-input-square {
            animation: none;
            fill: #8a9c90;
            opacity: 1;
            filter: none;
          }

          .execution-flow-inputs-hover .execution-flow-input-square {
            animation-name: execution-flow-input-square-hover-pulse;
            animation-duration: 1.7s !important;
            animation-delay: 0s !important;
            filter: drop-shadow(0 0 4px rgba(130, 245, 173, 0.65)) drop-shadow(0 0 10px rgba(130, 245, 173, 0.28));
          }

          @keyframes execution-flow-input-square-pulse {
            0% {
              fill: #252525;
            }

            8%,
            18% {
              fill: #82F5AD;
            }

            82%,
            100% {
              fill: #252525;
            }
          }

          @keyframes execution-flow-input-square-hover-pulse {
            0%,
            100% {
              fill: #3a5e3c;
              opacity: 0.86;
            }

            45% {
              fill: #82F5AD;
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .execution-flow-input-square {
              animation: none;
              fill: #252525;
            }
          }
        `}</style>
        <g id="Group">
          <ExecutionFlowInputSquare d={svgPaths.p154fa380} order={0} />
          <ExecutionFlowInputSquare d={svgPaths.p3ec38f00} order={1} />
          <ExecutionFlowInputSquare d={svgPaths.p34011b80} order={2} />
          <ExecutionFlowInputSquare d={svgPaths.p13a07d80} order={3} />
          <ExecutionFlowInputSquare d={svgPaths.p8ed2f00} order={4} />
          <ExecutionFlowInputSquare d={svgPaths.p1b97f400} order={5} />
          <ExecutionFlowInputSquare d={svgPaths.p384c6a00} order={6} />
          <ExecutionFlowInputSquare d={svgPaths.p3983bd80} order={7} />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_execution_flow_inputs">
          <rect fill="white" height="256" width="819.892" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Layer({ hoveredZone, isFullWidth = false }: { hoveredZone: ExecutionFlowHoverZone; isFullWidth?: boolean }) {
  return (
    <div className={`col-1 aspect-[819.892/256] justify-self-center ml-0 relative row-1 ${isFullWidth ? "w-full" : "w-[77.936%]"}`} data-name="Layer_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819.892 256">
        <g clipPath="url(#clip0_0_363)" id="Layer_1">
          <g className="transition-opacity duration-200" style={{ opacity: hoveredZone ? 0.5 : 1 }}>
            <path d={svgPaths.p123a9f60} id="Vector_9" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p21624440} id="Vector_10" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.pe4db960} id="Vector_11" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p510e600} id="Vector_12" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p2e229900} id="Vector_13" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.pc115780} id="Vector_14" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p3bf3d180} id="Vector_15" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p3f53d2c0} id="Vector_16" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p21bd2000} id="Vector_17" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p313dfde0} id="Vector_18" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d="M711.769 127.996H778.918" id="Vector_19" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p5f6cf80} id="Vector_21" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p2a2f8580} id="Vector_22" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p21910e80} id="Vector_23" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p39d77040} id="Vector_24" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p1e4e5a40} id="Vector_25" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.pf569a00} id="Vector_26" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.p35357400} id="Vector_27" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
            <path d={svgPaths.pd678600} id="Vector_28" stroke="var(--stroke-0, #252525)" strokeMiterlimit="10" strokeWidth="2.18269" />
          </g>
          <g
            className="transition-[color,opacity] duration-200"
            id="Group_2"
            style={{
              color: hoveredZone ? "#252525" : "#82F5AD",
              opacity: hoveredZone ? 0.5 : 1,
            }}
          >
            <path d={svgPaths.p3380c5c0} fill="currentColor" id="Vector_29" />
            <path d={svgPaths.pe920280} fill="currentColor" id="Vector_32" />
            <path d={svgPaths.p3280f7f0} fill="currentColor" id="Vector_33" />
            <path d={svgPaths.p3216000} fill="currentColor" id="Vector_34" />
            <path d={svgPaths.p273e9000} fill="currentColor" id="Vector_35" />
            <path d={svgPaths.p150b080} fill="currentColor" id="Vector_36" />
            <path d={svgPaths.p2a0b8e20} fill="currentColor" id="Vector_37" />
            <path d={svgPaths.p288df0c0} fill="currentColor" id="Vector_38" />
            <path d={svgPaths.p23cba280} fill="currentColor" id="Vector_39" />
            <path d={svgPaths.pec12580} fill="currentColor" id="Vector_40" />
            <path d={svgPaths.p18023200} fill="currentColor" id="Vector_41" />
            <path d={svgPaths.p327059b0} fill="currentColor" id="Vector_42" />
            <path d={svgPaths.p3acfbc80} fill="currentColor" id="Vector_43" />
            <path d={svgPaths.p3ec56c80} fill="currentColor" id="Vector_44" />
            <path d={svgPaths.p250e9e00} fill="currentColor" id="Vector_45" />
            <path d={svgPaths.p1be45100} fill="currentColor" id="Vector_46" />
            <path d={svgPaths.p1decb600} fill="currentColor" id="Vector_47" />
          </g>
          <path
            className="transition-opacity duration-200"
            d="M476.758 208.821V114.505"
            id="Vector_54"
            stroke="var(--stroke-0, #252525)"
            strokeMiterlimit="10"
            strokeWidth="2.18269"
            style={{ opacity: hoveredZone ? 0.5 : 1 }}
          />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_363" x1="332.379" x2="332.379" y1="6.73522" y2="114.525">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_363" x1="285.386" x2="285.386" y1="87.5685" y2="127.99">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_0_363" x1="365.955" x2="365.955" y1="101.06" y2="141.481">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_0_363" x1="312.242" x2="312.242" y1="114.505" y2="154.927">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_0_363" x1="292.094" x2="292.094" y1="127.996" y2="168.418">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_0_363" x1="329.025" x2="329.025" y1="141.487" y2="181.909">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_0_363" x1="245.101" x2="245.101" y1="154.933" y2="249.249">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_0_363" x1="345.818" x2="345.818" y1="168.424" y2="208.845">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_0_363" x1="587.554" x2="587.554" y1="114.505" y2="154.927">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint9_linear_0_363" x1="594.269" x2="594.269" y1="127.996" y2="168.418">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint10_linear_0_363" x1="745.344" x2="745.344" y1="127.996" y2="128.996">
            <stop offset="0.509615" stopColor="#231F20" />
            <stop offset="0.735577" stopColor="#00FF88" />
          </linearGradient>
          <clipPath id="clip0_0_363">
            <rect fill="white" height="256" width="819.892" />
          </clipPath>
        </defs>
      </svg>
      <ExecutionFlowThreeGlows isHidden={hoveredZone !== null} />
      <ExecutionFlowPulseDotsOverlay hoveredZone={hoveredZone} />
      <ExecutionFlowInputSquaresOverlay hoveredZone={hoveredZone} />
    </div>
  );
}

export function AnimatedExecutionModelGraphic() {
  return <Layer hoveredZone={null} isFullWidth />;
}

function Group({
  hoveredZone,
  setHoveredZone,
}: {
  hoveredZone: ExecutionFlowHoverZone;
  setHoveredZone: (zone: ExecutionFlowHoverZone) => void;
}) {
  const tagClass = (zone: Exclude<ExecutionFlowHoverZone, null>) => {
    const opacity = hoveredZone && hoveredZone !== zone ? "opacity-50" : "opacity-100";

    return `bg-[#3a5e3c] col-1 content-stretch flex items-center justify-center relative row-1 size-[32px] transition-opacity duration-200 ${opacity}`;
  };

  return (
    <div className="grid-cols-[1fr] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-[calc(100vw-64px)] max-w-[1052px]">
      <Layer hoveredZone={hoveredZone} />
      <div className={`${tagClass("inputs")} ml-[14.639%] mt-0`}>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">01</p>
      </div>
      <div className={`${tagClass("nodes")} ml-[48.479%] mt-0`}>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">02</p>
      </div>
      <div className={`${tagClass("output")} ml-[82.319%] mt-0`}>
        <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">03</p>
      </div>
      <div aria-hidden="true" className="absolute left-0 top-0 z-10 h-full w-[32.319%]" onMouseEnter={() => setHoveredZone("inputs")} />
      <div aria-hidden="true" className="absolute left-[33.84%] top-0 z-10 h-full w-[32.319%]" onMouseEnter={() => setHoveredZone("nodes")} />
      <div aria-hidden="true" className="absolute left-[67.681%] top-0 z-10 h-full w-[32.319%]" onMouseEnter={() => setHoveredZone("output")} />
    </div>
  );
}

function getExecutionModelCardClass(zone: Exclude<ExecutionFlowHoverZone, null>, hoveredZone: ExecutionFlowHoverZone) {
  const base = "content-stretch flex flex-col gap-[16px] items-start justify-center p-[8px] relative shrink-0 w-full max-w-none transition-[background-color,opacity] duration-200";
  const background = hoveredZone === zone ? "bg-[#d9fce8]" : "bg-white";
  const opacity = hoveredZone && hoveredZone !== zone ? "opacity-50" : "opacity-100";

  return `${base} ${background} ${opacity}`;
}

function Frame31({
  hoveredZone,
  setHoveredZone,
}: {
  hoveredZone: ExecutionFlowHoverZone;
  setHoveredZone: (zone: ExecutionFlowHoverZone) => void;
}) {
  return (
    <div className="content-stretch grid grid-cols-1 gap-[16px] items-start relative shrink-0 w-full px-4 md:grid-cols-3 md:px-8 lg:w-[1052px] lg:max-w-[calc(100%_-_64px)] lg:px-0">
      <ScrollFadeIn className="w-full" delay={0.1}>
        <div className={getExecutionModelCardClass("inputs", hoveredZone)} onMouseEnter={() => setHoveredZone("inputs")}>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-2.89px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 340 2.88577">
                <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="340" y1="1.44289" y2="1.44289" />
              </svg>
            </div>
          </div>
          <div className="font-['Office_Code_Pro:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#3a5e3c] text-[0px] tracking-[1.4px] uppercase whitespace-nowrap">
            <p className="leading-[1.075] mb-0 text-[#3a5e3c] text-[14px]">01</p>
            <p data-preview-was="Confidential inputs" className="leading-[1.075] mb-0 text-[14px]">Encrypted</p>
            <p className="leading-[1.075] text-[14px]">inputs</p>
          </div>
          <p data-preview-was="Data remains private throughout execution" className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Sensitive data remains private during execution.</p>
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn className="w-full" delay={0.2}>
        <div className={getExecutionModelCardClass("nodes", hoveredZone)} onMouseEnter={() => setHoveredZone("nodes")}>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-2.89px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 340 2.88577">
                <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="340" y1="1.44289" y2="1.44289" />
              </svg>
            </div>
          </div>
          <div className="font-['Office_Code_Pro:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#3a5e3c] text-[0px] tracking-[1.4px] uppercase whitespace-nowrap">
            <p className="leading-[1.075] mb-0 text-[#3a5e3c] text-[14px] whitespace-pre">02</p>
            <p className="leading-[1.075] mb-0 text-[14px] whitespace-pre">{`Threshold `}</p>
            <p data-preview-was="Threshold enforcement" className="leading-[1.075] text-[14px] whitespace-pre">decryption</p>
          </div>
          <p data-preview-was="A subset of nodes governs execution and release" className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Ciphernode committees use threshold decryption so no single party controls decryption.</p>
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn className="w-full" delay={0.3}>
        <div className={getExecutionModelCardClass("output", hoveredZone)} onMouseEnter={() => setHoveredZone("output")}>
          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute inset-[-2.89px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 340 2.88577">
                <line id="Line 1934" stroke="var(--stroke-0, #3A5E3C)" strokeWidth="2.88577" x2="340" y1="1.44289" y2="1.44289" />
              </svg>
            </div>
          </div>
          <div className="font-['Office_Code_Pro:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#3a5e3c] text-[0px] tracking-[1.4px] uppercase whitespace-nowrap">
            <p className="leading-[1.075] mb-0 text-[#3a5e3c] text-[14px] whitespace-pre">03</p>
            <p className="leading-[1.075] mb-0 text-[14px] whitespace-pre">{`Verifiable `}</p>
            <p className="leading-[1.075] text-[14px] whitespace-pre">outcomes</p>
          </div>
          <p data-preview-was="Results are verifiable without revealing inputs" className="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] min-w-full not-italic relative shrink-0 text-[#3a5e3c] text-[14px] w-[min-content]">Results can be verified without revealing the private inputs behind them.</p>
        </div>
      </ScrollFadeIn>
    </div>
  );
}

function HowItWorksCta() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[rgba(193,217,191,0.8)] content-stretch flex ${BUTTON_SIZE} items-center justify-center px-6 relative shrink-0 w-full md:w-[288px] max-w-[288px] transition-colors hover:bg-[#3a5e3c]`}
      data-preview-note="howItWorks"
      href="https://blog.theinterfold.com/how-interfold-works/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        How Interfold Works
      </AnimatedButtonContent>
    </a>
  );
}

function Frame15() {
  const [hoveredZone, setHoveredZone] = useState<ExecutionFlowHoverZone>(null);
  const executionHoverZones: Exclude<ExecutionFlowHoverZone, null>[] = ["inputs", "nodes", "output"];

  return (
    <div
      id="execution-model"
      className="relative bg-white content-stretch flex flex-col gap-[64px] md:gap-[96px] items-center py-[64px] md:py-[112px] w-full"
    >
      <Frame14 />
      <div className="content-stretch relative flex flex-col gap-[64px] md:gap-[96px] items-center w-full" onMouseLeave={() => setHoveredZone(null)}>
        <ScrollFadeIn delay={0.2}>
          <Group hoveredZone={hoveredZone} setHoveredZone={setHoveredZone} />
        </ScrollFadeIn>
        <Frame31 hoveredZone={hoveredZone} setHoveredZone={setHoveredZone} />
        <ScrollFadeIn delay={0.4}>
          <HowItWorksCta />
        </ScrollFadeIn>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden w-[1052px] max-w-[calc(100%_-_64px)] -translate-x-1/2 grid-cols-3 gap-[16px] md:grid">
          {executionHoverZones.map((zone) => (
            <div
              aria-hidden="true"
              className="pointer-events-auto"
              key={zone}
              onMouseEnter={() => setHoveredZone(zone)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="capitalize content-stretch flex font-['ABC_Gramercy:Regular',sans-serif] gap-[24px] md:gap-[40px] items-center justify-end leading-[1.05] not-italic text-[#3a5e3c] text-[18px] md:text-[22px] text-right tracking-[-0.66px] whitespace-nowrap">
      <motion.a
        animate={{ opacity: 1, y: 0 }}
        className="relative shrink-0 transition-colors hover:text-[#82f5ad]"
        href="https://docs.theinterfold.com/"
        initial={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        Docs
      </motion.a>
      <motion.a
        animate={{ opacity: 1, y: 0 }}
        className="relative shrink-0 transition-colors hover:text-[#82f5ad]"
        href="https://blog.theinterfold.com/"
        initial={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        Blog
      </motion.a>
      <motion.a
        animate={{ opacity: 1, y: 0 }}
        className="relative shrink-0 transition-colors hover:text-[#82f5ad]"
        href="/participate"
        initial={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Participate
      </motion.a>
    </div>
  );
}

function Frame12() {
  return (
    <div className={`content-stretch flex flex-col ${TITLE_BLOCK_GAP} items-center not-italic relative shrink-0 text-center w-full px-4 md:px-0`}>
      <div className="w-full capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[0] relative shrink-0 text-[#3a5e3c] text-[40px] md:text-[64px] tracking-[-1.92px]">
        <LineReveal lineClassName="leading-[0.87]" lines={["Private Inputs.", "Collective Outcomes."]} />
      </div>
      <ScrollFadeIn className="w-full flex justify-center" delay={0.28}>
        <p data-preview-was="Infrastructure for multiplayer privacy, enabling independent parties to coordinate without exposing inputs." className={`${SUPPORTING_LINE} relative shrink-0 text-[#687d71] w-full md:w-[440px]`}>Interfold lets competing companies or complete strangers compute together on sensitive data: private inputs, verifiable outputs, no trusted hardware.</p>
      </ScrollFadeIn>
    </div>
  );
}

function Frame6() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[rgba(193,217,191,0.8)] content-stretch flex ${BUTTON_SIZE} items-center justify-center py-[16px] relative shrink-0 w-full md:w-[288px] max-w-[288px] transition-colors hover:bg-[#3a5e3c]`}
      href="https://docs.theinterfold.com/getting-started"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        Build on Interfold
      </AnimatedButtonContent>
    </a>
  );
}

function FrameRunCiphernode() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group bg-[#82f5ad] content-stretch flex ${BUTTON_SIZE} items-center justify-center py-[16px] relative shrink-0 w-full md:w-[288px] max-w-[288px] transition-colors hover:bg-[#3a5e3c]`}
      href="https://dashboard.theinterfold.com/#operator"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedButtonContent
        isExternal
        isHovered={isHovered}
        textClassName="font-['ABC_Gramercy:Regular',sans-serif] leading-[1.075] not-italic relative shrink-0 text-[#3a5e3c] text-[14px] text-center whitespace-nowrap transition-colors group-hover:text-[#82f5ad]"
      >
        Run a ciphernode
      </AnimatedButtonContent>
    </a>
  );
}

function Frame17() {
  return (
    // Three 288px buttons do not fit one row until well past the md breakpoint,
    // so this wraps and centres rather than overflowing between 768px and ~940px.
    <div data-preview-note="heroCtas" className="content-stretch flex flex-col md:flex-row md:flex-wrap gap-[16px] items-center justify-center relative shrink-0 w-full md:w-auto px-4 md:px-0">
      <ScrollFadeIn delay={0.2}>
        <Frame6 />
      </ScrollFadeIn>
      <ScrollFadeIn delay={0.3}>
        <FrameRunCiphernode />
      </ScrollFadeIn>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative bg-[#d9fce8] content-stretch flex flex-col gap-[48px] items-center py-[64px] md:py-[112px] w-full">
      <Frame12 />
      <Frame17 />
    </div>
  );
}

export function DesktopFooter() {
  return (
    <footer className="relative bg-[#d9fce8] w-full">
      <div className="mx-auto grid min-h-[312px] max-w-[1440px] grid-cols-1 gap-12 px-4 py-6 md:min-h-[412px] md:grid-cols-4 md:grid-rows-[1fr_auto] md:gap-x-8 md:gap-y-10 md:px-6">
        <div className="md:col-start-1 md:row-start-1">
          <ScrollFadeIn>
            <p
              className="-ml-[8px] capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[0.87] not-italic text-[#3a5e3c] text-[40px] tracking-[-1.92px] md:-ml-[12px] md:text-[64px]"
              style={{ fontFeatureSettings: '"liga" 1, "clig" 1', fontVariantLigatures: "common-ligatures" }}
            >
              <span className="block">The</span>
              <span className="block pl-[8px] md:pl-[12px]">Interfold</span>
            </p>
          </ScrollFadeIn>
        </div>

        <div className="not-italic md:col-start-3 md:row-start-1">
          <div className="flex flex-col gap-[8px]">
            <ScrollFadeIn delay={0.1}>
              <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">Legal</p>
            </ScrollFadeIn>
            <div className="capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[1.05] text-[#3a5e3c] text-[22px] tracking-[-0.66px] [&_a]:font-normal">
              <ScrollFadeIn delay={0.2}>
                <button className="block text-left transition-colors hover:text-[#82f5ad]">Privacy</button>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.3}>
                <button className="block text-left transition-colors hover:text-[#82f5ad]">{`Terms & Conditions`}</button>
              </ScrollFadeIn>
            </div>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[8px] items-start not-italic w-full md:col-start-4 md:row-start-1">
          <div className="flex flex-col gap-[8px] w-full">
            <ScrollFadeIn delay={0.1}>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">Follow us</p>
            </ScrollFadeIn>
            <div className="capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[1.05] text-[#3a5e3c] text-[22px] tracking-[-0.66px]">
              <ScrollFadeIn delay={0.2}>
                <a className="block text-left text-base font-medium leading-[1.5] transition-colors hover:text-[#82f5ad]" href="https://t.me/enclave_e3">Telegram</a>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.3}>
                <a data-preview-note="footerGithub" data-preview-was="https://github.com/gnosisguild/enclave/" className="block text-left text-base font-medium leading-[1.5] transition-colors hover:text-[#82f5ad]" href="https://github.com/theinterfold/interfold">Github</a>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.4}>
                <a className="block text-left text-base font-medium leading-[1.5] transition-colors hover:text-[#82f5ad]" href="https://x.com/theinterfold">X</a>
              </ScrollFadeIn>
            </div>
          </div>
        </div>

        <div className="interfold-footer-baseline-item interfold-footer-signup w-full md:col-span-2 md:col-start-3 md:row-start-2 xl:col-span-1 xl:col-start-4">
          <ScrollFadeIn className="w-full" delay={0.5}>
            <GhostSignupForm className="interfold-footer-signup-form md:py-0" />
          </ScrollFadeIn>
        </div>

        <div className="interfold-footer-baseline-item font-['Office_Code_Pro:Medium',sans-serif] leading-[1.075] not-italic text-[#3a5e3c] text-[14px] tracking-[1.4px] uppercase md:col-start-1 md:row-start-2">
          <ScrollFadeIn delay={0.7}>
            <p>{`All Rights Reserved © 2026`}</p>
          </ScrollFadeIn>
        </div>
      </div>
    </footer>
  );
}

function Frame32() {
  return <DesktopFooter />;
}

export default function Desktop() {
  return (
    <div className="interfold-page-transition relative min-h-screen w-full overflow-x-clip bg-[#d9fce8]" data-name="Desktop">
      <div className="interfold-hero-transition relative h-[min(44.444vw,640px)] w-full overflow-hidden bg-[#121718]" data-name="image 66">
        <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden bg-[#d9fce8] pointer-events-none">
          <HeroImage
            className="interfold-home-hero-image absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
            fadeIn={false}
            sources={homeHeroSources}
          />
        </div>
      </div>
      {/* 63px is the header's height: the header is fixed, so the strip pins to
          its underside rather than to the top of the window. */}
      <NetworkStrip className="sticky top-[63px] z-40" />
      {/* Reading order is now the order on screen. It used to be
          Frame, Frame19, Frame11, Frame20, Frame15, Frame13 while the page read
          Frame13, Frame, Frame15, Frame19, Frame11, Frame20, because every block
          was placed by an absolute top and the markup order did not matter. */}
      <Frame13 />
      <Frame />
      <Frame15 />
      <Frame19 />
      <Frame11 />
      <Frame20 />
      <Frame32 />
    </div>
  );
}
