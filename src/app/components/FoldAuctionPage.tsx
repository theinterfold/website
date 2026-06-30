import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { Header } from "./Header";
import { HeroImage, homeHeroSources } from "./HeroImage";
import { HoverArrowLink } from "./HoverArrowLink";
import { InterfoldSymbol } from "./InterfoldSymbol";
import { LineRevealAuto } from "./LineRevealAuto";
import { ScrollFadeIn } from "./ScrollFadeIn";

// -----------------------------------------------------------------------------
// Launch configuration — fill these in before going live.
// Anything still set to a TODO_* value is a placeholder.
// -----------------------------------------------------------------------------
const TODO_LINK = "#"; // TODO: replace with the real URL
const TODO_TEXT = "TBA"; // TODO: replace with the real value

// Drives the hero title, status strip and primary CTA. Set this to the
// current launch phase before deploying.
type Phase = "pre-reg" | "registration" | "live" | "ended" | "cooldown";
const PHASE: Phase = "live"; // TODO: set to the current launch phase

const AUCTION = {
  // Participate
  uniswapCcaUrl: TODO_LINK, // TODO: official Uniswap CCA link
  registrationUrl: TODO_LINK, // TODO: registration / KYC link
  participationGuideUrl: TODO_LINK, // TODO: "How to Participate" guide
  // Learn more
  auctionFaqUrl: "https://docs.theinterfold.com/faq/auction",
  tokenFaqUrl: "https://docs.theinterfold.com/faq/fold-token",
  tokenomicsUrl: "https://docs.theinterfold.com/tokenomics",
  auctionTermsUrl: TODO_LINK, // TODO: official Auction Terms
  auditUrl: TODO_LINK, // TODO: smart-contract audit report — pending sign-off with Auryn
  understandingFoldUrl: "https://blog.theinterfold.com/fold-token-interfold-network/",
  howItWorksUrl: "https://blog.theinterfold.com/how-interfold-works/",
  launchPrimerUrl: "https://blog.theinterfold.com/fold-auction-uniswap/",
  networkAlphaUrl: "https://blog.theinterfold.com/what-is-network-alpha/",
  docsUrl: "https://docs.theinterfold.com/",
  blogUrl: "https://blog.theinterfold.com/",
  // Social
  telegramUrl: "https://t.me/enclave_e3",
  discordUrl: TODO_LINK, // TODO: Discord invite
  xUrl: "https://x.com/theinterfold",
  // Verification
  officialDomain: "www.theinterfold.com",
  explorerBaseUrl: "https://etherscan.io/token/", // TODO: confirm explorer / network
  // Timeline / details
  registrationDates: "July 6–7",
  auctionWindow: "Opens July 8 for 48 hours",
  tgeDate: "August 19",
  // ISO datetime the countdown ticks toward (e.g. "2026-07-15T15:00:00Z").
  // Leave empty to hide the countdown.
  countdownTarget: "", // TODO: set countdown target (ISO 8601)
  // Contracts — PLACEHOLDER values (realistic format, for layout only).
  foldContract: "0xF01Dc0ffEE254729296A45A3885639AC7E10F9d4", // TODO: real FOLD token contract address
  auctionContract: "0xA0C710dDEe2c9B3E6f5B8A14c2D7e9F013Ab45C6", // TODO: real auction contract address / link
  network: "Ethereum Mainnet", // TODO: confirm network
};

const META_DESCRIPTION =
  "The FOLD auction is distributed through a Continuous Clearing Auction on Uniswap. Registration required. Use official links only.";

const phaseContent: Record<
  Phase,
  {
    heroTitle: string;
    statusLead: string;
    countdownLabel: string;
    primaryCta: { label: string; href: string };
  }
> = {
  "pre-reg": {
    heroTitle: "The FOLD Auction Is Coming",
    statusLead: "FOLD Auction coming soon",
    countdownLabel: "Registration opens in",
    primaryCta: { label: "Read How to Participate", href: AUCTION.participationGuideUrl },
  },
  registration: {
    heroTitle: "FOLD Auction Registration Is Open",
    statusLead: "Registration open now",
    countdownLabel: "Auction begins in",
    primaryCta: { label: "Start Registration", href: AUCTION.registrationUrl },
  },
  live: {
    heroTitle: "The FOLD Auction Is Live",
    statusLead: "FOLD Auction live now",
    countdownLabel: "Auction closes in",
    primaryCta: { label: "Join the FOLD Auction", href: AUCTION.uniswapCcaUrl },
  },
  ended: {
    heroTitle: "The FOLD Auction Has Ended",
    statusLead: "Auction ended",
    countdownLabel: "",
    primaryCta: { label: "Read the Auction FAQ", href: AUCTION.auctionFaqUrl },
  },
  cooldown: {
    heroTitle: "FOLD Is in the Cooldown Period",
    statusLead: "Auction ended · cooldown in progress",
    countdownLabel: "Transferability in",
    primaryCta: { label: "Read the FOLD Token FAQ", href: AUCTION.tokenFaqUrl },
  },
};

const phase = phaseContent[PHASE];

const statusStripDetails = [
  "Registration required",
  "40-day transfer restriction",
  "Use official links only",
];

function SectionLabel({ children, className = "text-[#687d71]" }: { children: string; className?: string }) {
  return (
    <p className={`font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.2] tracking-[1.2px] md:text-[14px] md:leading-[1.075] md:tracking-[1.4px] ${className}`}>
      {children}
    </p>
  );
}

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: string;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <HoverArrowLink
      className={`flex h-[52px] w-full items-center justify-center rounded-[6px] px-6 transition-colors hover:bg-[#3a5e3c] ${
        isPrimary ? "bg-[#82f5ad] text-[#3a5e3c]" : "bg-[rgba(193,217,191,0.8)] text-[#3a5e3c]"
      }`}
      href={href}
      textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
    >
      {children}
    </HoverArrowLink>
  );
}

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <HoverArrowLink
      className="inline-flex"
      href={href}
      textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#3a5e3c] underline decoration-[1px] underline-offset-[5px] transition-colors group-hover:text-[#82f5ad]"
    >
      {children}
    </HoverArrowLink>
  );
}

// Accordion row whose answer reveals with the site's fade-up motion.
function FaqRow({ item }: { item: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const revealOffset = shouldReduceMotion ? 0 : 12;

  return (
    <div className="border-b border-[#3a5e3c]/30">
      <button
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.1] tracking-[-0.5px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad] md:text-[24px]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span>{item.question}</span>
        <span aria-hidden="true" className={`shrink-0 text-[24px] leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              animate={{ y: 0, opacity: 1 }}
              className="pb-5 font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.25] text-[#687d71] md:text-[18px]"
              initial={{ y: revealOffset, opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Live countdown to AUCTION.countdownTarget. Renders nothing until a valid
// future target is configured.
function Countdown() {
  const target = AUCTION.countdownTarget;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) {
      return;
    }
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) {
    return null;
  }

  const remaining = new Date(target).getTime() - now;
  if (Number.isNaN(remaining) || remaining <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const units = [
    { label: "Days", value: Math.floor(totalSeconds / 86400) },
    { label: "Hrs", value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: "Min", value: Math.floor((totalSeconds % 3600) / 60) },
    { label: "Sec", value: totalSeconds % 60 },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      {phase.countdownLabel && (
        <SectionLabel className="text-[#687d71]">{phase.countdownLabel}</SectionLabel>
      )}
      <div className="flex items-start gap-3 md:gap-4">
        {units.map((unit) => (
          <div className="flex min-w-[56px] flex-col items-center md:min-w-[68px]" key={unit.label}>
            <span className="font-['ABC_Gramercy:Regular',sans-serif] text-[40px] leading-[0.9] tracking-[-1.2px] text-[#3a5e3c] tabular-nums md:text-[52px]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Monospace value with copy-to-clipboard. Falls back gracefully for
// placeholders and where the Clipboard API is unavailable. `tone` adapts the
// value colour for light vs dark backgrounds.
function CopyableValue({ value, tone = "light" }: { value: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const isPlaceholder = value === TODO_TEXT;
  const valueColor =
    tone === "dark"
      ? "text-[#d9fce8]/80 group-hover:text-[#d9fce8]"
      : "text-[#687d71] group-hover:text-[#3a5e3c]";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — leave the value visible for manual copy.
    }
  };

  if (isPlaceholder) {
    return (
      <span className={`break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] ${tone === "dark" ? "text-[#d9fce8]/55" : "text-[#687d71]"}`}>
        {value}
      </span>
    );
  }

  return (
    <button
      aria-label={copied ? "Copied to clipboard" : `Copy ${value}`}
      className="group inline-flex max-w-full items-center gap-2 text-left transition-colors"
      onClick={handleCopy}
      type="button"
    >
      <span className={`break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] transition-colors ${valueColor}`}>
        {value}
      </span>
      <span aria-hidden="true" className="shrink-0 text-[#82f5ad] transition-colors group-hover:text-[#d9fce8]">
        {copied ? (
          <svg className="size-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg className="size-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="11" rx="2" width="11" x="9" y="9" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}

const detailRows: Array<{ term: string; value: string; href?: string }> = [
  { term: "Auction format", value: "Continuous Clearing Auction (CCA)" },
  { term: "Registration / KYC", value: AUCTION.registrationDates },
  { term: "Auction window", value: AUCTION.auctionWindow },
  { term: "Transfer restriction", value: "40-day cooldown after the auction" },
  { term: "Target TGE / transferability", value: AUCTION.tgeDate },
  { term: "Venue", value: "Uniswap CCA interface", href: AUCTION.uniswapCcaUrl },
];

const checklistItems: string[] = [
  "Start from the official auction page",
  "Complete the required registration and KYC flow",
  "Review the auction mechanics",
  "Decide your maximum budget before placing a bid",
  "Use only official links published through verified Interfold channels",
];

const timelineItems: Array<{
  title: string;
  body: string;
  when?: string;
  actions?: Array<{ label: string; href: string }>;
}> = [
  {
    title: "Registration",
    when: AUCTION.registrationDates,
    body: "Eligible participants complete registration and required onboarding.",
    actions: [{ label: "Start Registration", href: AUCTION.registrationUrl }],
  },
  {
    title: "FOLD Auction",
    when: AUCTION.auctionWindow,
    body: "The FOLD auction opens through the Uniswap Continuous Clearing Auction interface and runs for 48 hours.",
    actions: [
      { label: "Join the FOLD Auction", href: AUCTION.uniswapCcaUrl },
      { label: "Read the Launch Primer", href: AUCTION.launchPrimerUrl },
    ],
  },
  {
    title: "After Auction",
    body: "FOLD purchased through the CCA is subject to a 40-day transfer restriction period, except for ciphernode bonding.",
  },
  {
    title: "TGE and Token Transferability",
    when: AUCTION.tgeDate,
    body: "Following the cooldown period, token transferability is expected to activate at the contract level. August 19 is the date for transferability and current target for TGE, subject to official terms and final launch conditions.",
  },
  {
    title: "Network Alpha",
    body: "Network Alpha is the first coordinated phase of the Interfold network, with selected ciphernodes and early integrations.",
    actions: [{ label: "Read the Network Alpha primer", href: AUCTION.networkAlphaUrl }],
  },
];

const foldRoles: Array<{ number: string; title: string; body: string }> = [
  {
    number: "01",
    title: "Operator Bonding",
    body: "Ciphernodes bond FOLD to participate in the network and become economically accountable.",
  },
  {
    number: "02",
    title: "E3 Request Economics",
    body: "Applications use FOLD to request ciphernode participation for confidential computations.",
  },
  {
    number: "03",
    title: "Operator Rewards",
    body: "Ciphernodes earn rewards for distributed key generation, execution coordination, and threshold decryption.",
  },
  {
    number: "04",
    title: "Governance",
    body: "FOLD holders participate in governance over network parameters and protocol decisions.",
  },
];

const supportsExamples: Array<{ title: string; body: string }> = [
  { title: "Sealed-bid auctions", body: "without trusted auctioneers" },
  { title: "Verifiable secret ballots", body: "without revealing individual votes" },
  { title: "Collaborative analysis", body: "without pooling sensitive datasets" },
  { title: "Multiparty systems", body: "where private inputs produce shared, verifiable outcomes" },
];

const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: "Who can participate?",
    answer:
      "Eligible participants who complete the required registration and onboarding. Participation is subject to eligibility requirements and jurisdictional restrictions. The auction is not available to persons in the United Kingdom or the United States, U.S. Persons, or persons acting on their behalf.",
  },
  {
    question: "How does the clearing price work?",
    answer:
      "FOLD is distributed through a Continuous Clearing Auction on Uniswap. Participants submit orders during the auction window, and successful bids clear through the CCA's uniform clearing-price mechanics as demand develops over the auction period.",
  },
  {
    question: "When can I transfer FOLD?",
    answer:
      "FOLD purchased through the CCA is subject to a 40-day transfer restriction after the auction, except for ciphernode bonding. August 19 is the date for transferability and current target for TGE, subject to official terms and final launch conditions.",
  },
  {
    question: "Where do I actually take part?",
    answer:
      "Start from this official auction page. From here, eligible participants can access the official registration flow and Uniswap CCA interface when available. Do not use links from DMs, unofficial Telegram accounts, impersonator X accounts, or copied contract addresses.",
  },
  {
    question: "How do I avoid scams?",
    answer:
      "Use only the links on this page and verify contract addresses through official Interfold channels. The team will never DM you first, ask for your seed phrase, or ask for private keys.",
  },
];

const linkGroups: Array<{ heading: string; rows: Array<{ label: string; href: string }> }> = [
  {
    heading: "Participate",
    rows: [
      { label: "FOLD Auction", href: AUCTION.uniswapCcaUrl },
      { label: "Registration / KYC", href: AUCTION.registrationUrl },
      { label: "How to Participate", href: AUCTION.participationGuideUrl },
    ],
  },
  {
    heading: "Learn more",
    rows: [
      { label: "Auction FAQ", href: AUCTION.auctionFaqUrl },
      { label: "Token FAQ", href: AUCTION.tokenFaqUrl },
      { label: "Tokenomics", href: AUCTION.tokenomicsUrl },
      { label: "Understanding the FOLD Token", href: AUCTION.understandingFoldUrl },
    ],
  },
];

const contractRows: Array<{ label: string; value: string; explorer?: boolean }> = [
  { label: "FOLD token contract", value: AUCTION.foldContract, explorer: true },
  { label: "Auction contract", value: AUCTION.auctionContract, explorer: true },
  { label: "Network", value: AUCTION.network },
];

const credibilityRows: Array<{ label: string; value: string; href?: string }> = [
  { label: "Auction Terms", value: "Read the official terms", href: AUCTION.auctionTermsUrl },
  { label: "Audit & Terms", value: "Token and auction contract audit report", href: AUCTION.auditUrl },
  { label: "Issuer", value: "Interfold Ltd." },
  { label: "Built by", value: "Gnosis Guild" },
];

// Dark "coin" card: contract info on the front, credibility on the back,
// flipped in 3D by the button.
function ContractsCard() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const flipped = rotation % 360 !== 0;

  // Always advance the rotation clockwise (to the right) by half a turn, so
  // repeated flips keep spinning the same direction instead of rocking back.
  const flip = () => {
    if (!shouldReduceMotion) {
      setSpinning(true);
    }
    setRotation((current) => current + 180);
  };

  // Pinned to the bottom-right corner with an equal right/bottom inset, identical on
  // both faces, so the flip button stays under the cursor across repeated flips.
  const flipButtonClass =
    "absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-[#82f5ad]/40 px-5 py-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-none tracking-[1.4px] text-[#82f5ad] transition-colors hover:bg-[#82f5ad] hover:text-[#121718] md:bottom-10 md:right-10";
  // The shine/glare and the relief light direction both track the cursor via CSS
  // custom properties updated on pointer move (no React re-render).
  const cardRef = useRef<HTMLDivElement>(null);

  const pointerDefaults = {
    "--mx": "50%",
    "--my": "0%",
    "--emb-hl-x": "0px",
    "--emb-hl-y": "-0.6px",
    "--emb-sh-x": "0px",
    "--emb-sh-y": "0.6px",
  } as CSSProperties;

  const handlePointer = (event: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (event.clientX - rect.left) / rect.width;
    const my = (event.clientY - rect.top) / rect.height;
    const lx = mx - 0.5;
    const ly = my - 0.5;
    const k = 1.6;
    const base = 0.6; // keeps a default top-light bias so the relief never goes flat
    el.style.setProperty("--mx", `${mx * 100}%`);
    el.style.setProperty("--my", `${my * 100}%`);
    el.style.setProperty("--emb-hl-x", `${lx * k}px`);
    el.style.setProperty("--emb-hl-y", `${ly * k - base}px`);
    el.style.setProperty("--emb-sh-x", `${-lx * k}px`);
    el.style.setProperty("--emb-sh-y", `${-ly * k + base}px`);
  };

  const resetPointer = () => {
    const el = cardRef.current;
    if (!el) return;
    for (const [key, value] of Object.entries(pointerDefaults)) {
      el.style.setProperty(key, String(value));
    }
  };

  // Embossed (raised) symbol on the front; debossed (pressed-in) on the back — so
  // flipping the card reveals "the other side" of the same relief. The highlight/shadow
  // offsets come from the cursor-tracked CSS vars, so the relief lighting follows the mouse.
  const embossRaised = {
    filter:
      "drop-shadow(var(--emb-hl-x) var(--emb-hl-y) 0 rgba(255,255,255,0.12)) drop-shadow(var(--emb-sh-x) var(--emb-sh-y) 1px rgba(0,0,0,0.5))",
  } as const;
  // Inked (light) raised lettering: the white highlight is invisible on light text, so
  // the lift comes from a crisp dark edge plus a soft cast shadow, both opposite the light.
  const embossInkRaised = {
    filter:
      "drop-shadow(var(--emb-sh-x) var(--emb-sh-y) 0 rgba(0,0,0,0.55)) drop-shadow(calc(var(--emb-sh-x) * 2) calc(var(--emb-sh-y) * 2) 4px rgba(0,0,0,0.4))",
  } as const;
  const embossDeboss = {
    filter:
      "drop-shadow(var(--emb-sh-x) var(--emb-sh-y) 0 rgba(255,255,255,0.11)) drop-shadow(var(--emb-hl-x) var(--emb-hl-y) 1px rgba(0,0,0,0.5))",
  } as const;

  // Lit surface (radial gradient, brighter at top) + beveled edge (top highlight,
  // hairline inner border, bottom inner shadow) to give the card real material depth.
  const shellClass =
    "relative h-full overflow-hidden rounded-[28px] bg-[radial-gradient(130%_120%_at_var(--mx)_var(--my),#1e2729_0%,#141a1b_48%,#0d1112_100%)] px-6 py-12 text-[#d9fce8] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-50px_80px_-50px_rgba(0,0,0,0.6),0_24px_55px_-22px_rgba(0,0,0,0.6),0_10px_22px_-14px_rgba(0,0,0,0.5)] md:px-12 md:py-14";

  return (
    <div
      ref={cardRef}
      className={`w-full [perspective:1600px] ${spinning ? "interfold-card-spinning" : ""}`}
      onAnimationEnd={(event) => {
        if (event.animationName === "interfold-card-spin-blur") {
          setSpinning(false);
        }
      }}
      onMouseMove={handlePointer}
      onMouseLeave={resetPointer}
      style={pointerDefaults}
    >
      <div
        className="relative grid transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* Front — contracts */}
        <div aria-hidden={flipped} className={`[grid-area:1/1] [backface-visibility:hidden] ${flipped ? "pointer-events-none" : ""}`}>
          <div className={shellClass}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 h-40 w-72 -translate-x-1/2 rounded-full bg-[#82f5ad]/12 blur-[100px]" />
            <div className="relative flex h-full flex-col pb-16">
              <header className="flex items-center justify-between gap-5">
                <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[38px] leading-[0.8] tracking-[-1.8px] text-[#d9fce8] md:text-[64px]" style={embossInkRaised}>
                  FOLD Token
                </h3>
                <div aria-hidden="true" className="shrink-0" style={embossRaised}>
                  <InterfoldSymbol className="h-12 w-auto text-[#191f20] md:h-16" />
                </div>
              </header>
              <div className="mt-10 flex items-center gap-3 self-start">
                <span aria-hidden="true" className="h-px w-7 bg-[#82f5ad]/50" />
                <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-none tracking-[2px] text-[#d9fce8]/55">
                  Contracts
                </span>
              </div>
              <dl className="mt-4 w-full border-t border-[#d9fce8]/10">
                {contractRows.map((row) => {
                  const isAddress = row.explorer && row.value !== TODO_TEXT;

                  return (
                    <div className="grid gap-x-6 gap-y-3 border-b border-[#d9fce8]/10 py-4 md:grid-cols-[1fr_auto] md:items-center" key={row.label}>
                      <div>
                        <dt className="font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55">
                          {row.label}
                        </dt>
                        <dd className="mt-2">
                          {row.explorer ? (
                            <CopyableValue tone="dark" value={row.value} />
                          ) : (
                            <span className="break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] text-[#d9fce8]/80">
                              {row.value}
                            </span>
                          )}
                        </dd>
                      </div>
                      {isAddress && (
                        <a
                          className="justify-self-start font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-none tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[3px] transition-colors hover:text-[#d9fce8] md:justify-self-end"
                          href={`${AUCTION.explorerBaseUrl}${row.value}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          View on explorer
                        </a>
                      )}
                    </div>
                  );
                })}
              </dl>
            </div>
            <button className={flipButtonClass} onClick={flip} type="button">
              View Audit &amp; Terms
              <svg aria-hidden="true" className="size-[13px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 4v5h-5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Back — credibility */}
        <div aria-hidden={!flipped} className={`[grid-area:1/1] [transform:rotateY(180deg)] [backface-visibility:hidden] ${flipped ? "" : "pointer-events-none"}`}>
          <div className={shellClass}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 h-40 w-72 -translate-x-1/2 rounded-full bg-[#82f5ad]/10 blur-[100px]" />
            <div className="relative flex h-full flex-col pb-16">
              <header className="flex items-center justify-between gap-5">
                <div aria-hidden="true" className="shrink-0 -scale-x-100" style={embossDeboss}>
                  <InterfoldSymbol className="h-12 w-auto text-[#191f20] md:h-16" />
                </div>
                <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[38px] leading-[0.8] tracking-[-1.8px] text-[#191f20] md:text-[64px] -scale-x-100" style={embossDeboss}>
                  FOLD Token
                </h3>
              </header>
              <div className="mt-10 flex items-center gap-3 self-start">
                <span aria-hidden="true" className="h-px w-7 bg-[#82f5ad]/50" />
                <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-none tracking-[2px] text-[#d9fce8]/55">
                  Audit &amp; Terms
                </span>
              </div>
              <dl className="mt-4 w-full border-t border-[#d9fce8]/10">
                {credibilityRows.map((row) => (
                  <div className="grid gap-x-6 gap-y-3 border-b border-[#d9fce8]/10 py-4 md:grid-cols-[1fr_auto] md:items-center" key={row.label}>
                    <div>
                      <dt className="font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55">
                        {row.label}
                      </dt>
                      <dd className="mt-2">
                        {row.href ? (
                          <a
                            className="break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] text-[#d9fce8]/80 underline decoration-[1px] underline-offset-[3px] transition-colors hover:text-[#82f5ad]"
                            href={row.href}
                            rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                            target={row.href.startsWith("http") ? "_blank" : undefined}
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] text-[#d9fce8]/80">
                            {row.value}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <button className={flipButtonClass} onClick={flip} type="button">
              View contracts
              <svg aria-hidden="true" className="size-[13px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 4v5h-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkGroup({ group }: { group: (typeof linkGroups)[number] }) {
  return (
    <>
      <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
        {group.heading}
      </p>
      <ul className="mt-4 border-t border-[#3a5e3c]/30">
        {group.rows.map((row) => (
          <li className="border-b border-[#3a5e3c]/30" key={row.label}>
            <a
              className="flex items-center justify-between gap-4 py-4 font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.05] tracking-[-0.5px] text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
              href={row.href}
              rel={row.href.startsWith("http") ? "noreferrer" : undefined}
              target={row.href.startsWith("http") ? "_blank" : undefined}
            >
              <span>{row.label}</span>
              <span aria-hidden="true" className="text-[18px]">→</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function FoldAuctionPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FOLD Auction · The Interfold";

    const upsertMeta = (selector: string, attr: string, key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    upsertMeta('meta[name="description"]', "name", "description", META_DESCRIPTION);
    upsertMeta('meta[property="og:title"]', "property", "og:title", "FOLD Auction · The Interfold");
    upsertMeta('meta[property="og:description"]', "property", "og:description", META_DESCRIPTION);
    upsertMeta('meta[property="og:url"]', "property", "og:url", `https://${AUCTION.officialDomain}/fold-auction`);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d9fce8] text-[#3a5e3c]">
      <Header activePath="fold-auction" animateOpening />

      <main>
        {/* Hero visual band — same treatment as the homepage hero */}
        <div className="relative h-64 w-full overflow-hidden bg-[#d9fce8] md:h-[min(44.444vw,640px)]">
          <HeroImage
            className="interfold-home-hero-image h-full w-full object-cover object-top mix-blend-darken md:hidden"
            pictureClassName="block h-full w-full md:hidden"
            sources={homeHeroSources}
          />
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 overflow-hidden bg-[#121718] md:block">
            <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden bg-[#d9fce8]">
              <HeroImage
                className="interfold-home-hero-image absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
                sources={homeHeroSources}
              />
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div className="bg-[#121718] px-4 py-3 text-[#82f5ad] md:px-8">
          <div className="mx-auto flex max-w-[1052px] items-center justify-center gap-x-3 text-center font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.4] tracking-[1.4px] md:text-[12px]">
            <span aria-hidden="true" className="size-[7px] shrink-0 animate-pulse rounded-full bg-[#82f5ad] motion-reduce:animate-none" />
            <span>{phase.statusLead}</span>
            <span className="group relative inline-flex">
              <button
                aria-label={`More details: ${statusStripDetails.join(", ")}`}
                className="flex size-[16px] items-center justify-center rounded-full border border-[#82f5ad]/50 text-[#82f5ad] transition-colors hover:border-[#82f5ad] hover:bg-[#82f5ad] hover:text-[#121718] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82f5ad] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121718]"
                type="button"
              >
                <svg aria-hidden="true" className="size-[9px]" viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="1" r="1" />
                  <rect x="3.25" y="3" width="1.5" height="4" rx="0.5" />
                </svg>
              </button>
              <span
                className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 flex w-max max-w-[80vw] -translate-x-1/2 flex-col items-center gap-y-1 rounded-[8px] border border-[#82f5ad]/15 bg-[#121718] px-4 py-2.5 text-[11px] leading-[1.4] tracking-[1.2px] text-[#82f5ad] opacity-0 shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                role="tooltip"
              >
                <span aria-hidden="true" className="absolute -top-[5px] left-1/2 size-[10px] -translate-x-1/2 rotate-45 border-l border-t border-[#82f5ad]/15 bg-[#121718]" />
                {statusStripDetails.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
              </span>
            </span>
          </div>
        </div>

        {/* Hero copy */}
        <section className="bg-[#d9fce8] px-4 md:px-8 py-[64px] text-center md:py-[112px]">
          <div className="mx-auto flex max-w-md flex-col items-center gap-6 md:max-w-[760px]">
            <h1 className="w-full font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.9] tracking-[-1.92px] md:text-[64px]">
              <LineRevealAuto text={phase.heroTitle} />
            </h1>
            <ScrollFadeIn className="flex w-full justify-center" delay={0.1}>
              <p className="max-w-[520px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]">
                FOLD supports The Interfold network, where independent parties can compute together
                without exposing private inputs.
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn className="w-full" delay={0.12}>
              <Countdown />
            </ScrollFadeIn>
            <ScrollFadeIn className="mx-auto grid w-full max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2" delay={0.15}>
              <CtaButton href={phase.primaryCta.href}>{phase.primaryCta.label}</CtaButton>
              <CtaButton href={AUCTION.participationGuideUrl} variant="secondary">How to Participate</CtaButton>
            </ScrollFadeIn>
            <ScrollFadeIn className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2" delay={0.2}>
              <TextLink href={AUCTION.auctionFaqUrl}>Read the Auction FAQ</TextLink>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Auction details */}
        <section className="bg-white px-4 md:px-8 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>Auction Details</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="FOLD is being distributed through a Uniswap Continuous Clearing Auction." />
              </p>
              <p className="mx-auto mt-6 max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="Participants submit orders during the auction window. Successful bids clear through the CCA's uniform clearing-price mechanics, with price discovery unfolding over the auction period." />
              </p>
            </div>

            <div className="mt-10">
              <dl className="border-t border-[#3a5e3c]/30">
                {detailRows.map((row, index) => (
                  <ScrollFadeIn delay={index * 0.06} key={row.term}>
                  <div className="grid gap-1 border-b border-[#3a5e3c]/30 py-4 md:grid-cols-2 md:items-baseline">
                    <dt className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
                      {row.term}
                    </dt>
                    <dd className="font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.075] text-[#3a5e3c]">
                      {row.href ? (
                        <a className="underline decoration-[1px] underline-offset-[4px] transition-colors hover:text-[#82f5ad]" href={row.href}>
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                  </ScrollFadeIn>
                ))}
              </dl>
            </div>

            <ScrollFadeIn className="mt-8" delay={0.15}>
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.2] text-[#687d71]">
                Participation is subject to eligibility requirements, jurisdictional restrictions, and completion of the required onboarding process.
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn className="mx-auto mt-8 w-full max-w-[288px]" delay={0.2}>
              <CtaButton href={AUCTION.uniswapCcaUrl}>Join the FOLD Auction</CtaButton>
            </ScrollFadeIn>
          </div>
        </section>

        {/* How to participate */}
        <section className="bg-[#d9fce8] px-4 md:px-8 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>How to Participate</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="Register first. Bid through the official CCA interface." />
              </p>
              <p className="mx-auto mt-6 max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="Eligible participants must complete registration and verification before participating in the FOLD auction. Once the auction opens, participants can submit an order through the official Uniswap CCA interface during the auction window." />
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-[520px]">
              <ScrollFadeIn>
                <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
                  Before Participating
                </p>
              </ScrollFadeIn>
              <ul className="mt-5 space-y-3">
                {checklistItems.map((item, index) => (
                  <li key={item}>
                    <ScrollFadeIn className="grid grid-cols-[7px_1fr] gap-3" delay={0.05 + index * 0.08}>
                      <span className="mt-[9px] size-[5px] rounded-full bg-[#82f5ad]" />
                      <span className="font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#3a5e3c] md:text-[18px]">
                        {item}
                      </span>
                    </ScrollFadeIn>
                  </li>
                ))}
              </ul>
            </div>

            <ScrollFadeIn className="mx-auto mt-10 grid w-full max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2" delay={0.15}>
              <CtaButton href={AUCTION.registrationUrl}>Start Registration</CtaButton>
              <CtaButton href={AUCTION.participationGuideUrl} variant="secondary">Read the Participation Guide</CtaButton>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Launch timeline */}
        <section className="bg-[#687d71] px-4 md:px-8 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel className="text-[#d9fce8]">Launch Timeline</SectionLabel>
              </ScrollFadeIn>
            </div>
            <ol className="mt-12 space-y-px">
              {timelineItems.map((item, index) => (
                <ScrollFadeIn delay={index * 0.05} key={item.title}>
                  <li className="grid grid-cols-[40px_1fr] gap-4 border-t border-[#d9fce8]/20 py-6 md:grid-cols-[56px_1fr] md:gap-6">
                    <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1] tracking-[-0.72px] text-[#d9fce8] md:text-[28px]">
                          {item.title}
                        </h3>
                        {item.when && item.when !== TODO_TEXT && (
                          <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
                            {item.when}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-[620px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#d9fce8] md:text-[18px]">
                        {item.body}
                      </p>
                      {item.actions && item.actions.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                          {item.actions.map((action) => (
                            <HoverArrowLink
                              className="inline-flex"
                              href={action.href}
                              key={action.label}
                              textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[5px] transition-colors group-hover:text-[#d9fce8]"
                            >
                              {action.label}
                            </HoverArrowLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                </ScrollFadeIn>
              ))}
            </ol>
            <ScrollFadeIn className="mt-10 text-center" delay={0.1}>
              <HoverArrowLink
                className="inline-flex"
                href={AUCTION.auctionFaqUrl}
                textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[5px] transition-colors group-hover:text-[#d9fce8]"
              >
                Read the Auction FAQ
              </HoverArrowLink>
            </ScrollFadeIn>
          </div>
        </section>

        {/* The role of FOLD */}
        <section className="bg-[#121718] px-4 md:px-8 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="mx-auto max-w-[760px] text-center">
              <ScrollFadeIn>
                <SectionLabel className="text-[#d9fce8]/55">The Role of FOLD</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#82f5ad] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="FOLD supports participation in The Interfold network." />
              </p>
              <p className="mx-auto mt-6 max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#d9fce8] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="Each request forms a ciphernode committee to coordinate key generation, support execution, and perform threshold decryption. FOLD is used to request, reward, bond, and govern this network participation." />
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {foldRoles.map((role, index) => (
                <ScrollFadeIn delay={index * 0.05} key={role.number}>
                  <article className="flex h-full flex-col gap-3 rounded-[20px] bg-[#1c2426] p-6">
                    <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
                      {role.number}
                    </span>
                    <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[28px] leading-[0.95] tracking-[-0.84px] text-[#d9fce8]">
                      {role.title}
                    </h3>
                    <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#d9fce8]/85 md:text-[18px]">
                      {role.body}
                    </p>
                  </article>
                </ScrollFadeIn>
              ))}
            </div>

            <ScrollFadeIn className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" delay={0.1}>
              {[
                { label: "Understanding the FOLD Token", href: AUCTION.understandingFoldUrl },
                { label: "Read the FOLD Token FAQ", href: AUCTION.tokenFaqUrl },
                { label: "View Tokenomics", href: AUCTION.tokenomicsUrl },
              ].map((link) => (
                <HoverArrowLink
                  className="inline-flex"
                  href={link.href}
                  key={link.label}
                  textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[5px] transition-colors group-hover:text-[#d9fce8]"
                >
                  {link.label}
                </HoverArrowLink>
              ))}
            </ScrollFadeIn>
          </div>
        </section>

        {/* What FOLD supports */}
        <section className="bg-[#d9fce8] px-4 md:px-8 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>What FOLD Supports</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="The Interfold supports systems where multiple parties need one verifiable result without exposing the inputs behind it." />
              </p>
              <p className="mx-auto mt-6 max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#687d71] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="Private inputs. Shared outcomes." />
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {supportsExamples.map((example, index) => (
                <ScrollFadeIn delay={index * 0.05} key={example.title}>
                  <div className="grid h-full grid-cols-[7px_1fr] gap-3 rounded-[16px] bg-white p-5">
                    <span className="mt-[9px] size-[5px] rounded-full bg-[#82f5ad]" />
                    <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.1] text-[#3a5e3c] md:text-[20px]">
                      <span>{example.title}</span> <span className="text-[#687d71]">{example.body}</span>
                    </p>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>

            <ScrollFadeIn className="mt-10 text-center" delay={0.1}>
              <p className="mx-auto max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.1] tracking-[-0.6px] md:text-[24px]">
                This is multiplayer privacy: privacy for systems where many parties need one verifiable result.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <TextLink href={AUCTION.howItWorksUrl}>Learn how The Interfold works</TextLink>
                <TextLink href={AUCTION.docsUrl}>Explore E3 Documentation</TextLink>
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 md:px-8 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>Frequently Asked</SectionLabel>
              </ScrollFadeIn>
            </div>
            <div className="mt-10">
              <div className="border-t border-[#3a5e3c]/30">
                {faqItems.map((item, index) => (
                  <ScrollFadeIn delay={index * 0.05} key={item.question}>
                    <FaqRow item={item} />
                  </ScrollFadeIn>
                ))}
              </div>
            </div>
            <ScrollFadeIn className="mt-8 text-center" delay={0.15}>
              <TextLink href={AUCTION.auctionFaqUrl}>Read the full Auction FAQ</TextLink>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Official links & contracts */}
        <section className="bg-[#d9fce8] px-4 md:px-8 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>Official Links &amp; Contract Information</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="Use only official Interfold links when participating in the FOLD auction." />
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
              <ScrollFadeIn>
                <LinkGroup group={linkGroups[0]} />
              </ScrollFadeIn>
              <ScrollFadeIn>
                <LinkGroup group={linkGroups[1]} />
              </ScrollFadeIn>
            </div>

            <ScrollFadeIn className="mt-10" delay={0.1}>
              <ContractsCard />
              <p className="mx-auto mt-6 max-w-[620px] text-center font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.2] text-[#687d71]">
                Always verify links and contract addresses through The Interfold&rsquo;s official channels.
                The team will never DM you first and will never ask for your seed phrase or private keys.
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Important information */}
        <section className="bg-white px-4 md:px-8 py-[64px] md:py-[96px]">
          <div className="mx-auto max-w-[760px]">
            <ScrollFadeIn>
              <SectionLabel>Important Information</SectionLabel>
            </ScrollFadeIn>
            <div className="mt-6 space-y-4 font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.6] tracking-[0.3px] text-[#687d71]">
              <ScrollFadeIn delay={0.04}>
                <p>
                  The FOLD auction, TGE, token transferability, and Network Alpha are distinct parts of the launch sequence.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.1}>
                <p>
                  Official information will be published only through The Interfold&rsquo;s verified channels.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.16}>
                <p>
                  <span className="text-[#3a5e3c]">Information for Persons in the United Kingdom and the United States.</span>{" "}
                  This communication is directed only at persons outside the United Kingdom and the United States. Persons in the
                  United Kingdom, persons in the United States, U.S. Persons, and persons acting for or on behalf of any such person
                  are not permitted to participate in the FOLD public auction and must not act upon this communication in relation to
                  the FOLD public auction.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.22}>
                <p>
                  <span className="text-[#3a5e3c]">Issuer notice.</span>{" "}
                  The FOLD auction will be conducted by Interfold Ltd. (the &ldquo;Issuer&rdquo;). Participation in the FOLD auction
                  will be subject to the official Auction Terms, eligibility requirements, and verification procedures published
                  before registration opens.
                </p>
              </ScrollFadeIn>
            </div>
          </div>
        </section>
      </main>

      <DesktopFooter staticLayout />
    </div>
  );
}
