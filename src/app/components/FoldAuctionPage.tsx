import { useEffect, useState } from "react";
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
  auctionFaqUrl: TODO_LINK, // TODO: Auction FAQ
  tokenFaqUrl: TODO_LINK, // TODO: FOLD Token FAQ
  tokenomicsUrl: TODO_LINK, // TODO: Tokenomics
  auctionTermsUrl: TODO_LINK, // TODO: official Auction Terms
  auditUrl: TODO_LINK, // TODO: smart-contract audit report
  understandingFoldUrl: "https://blog.theinterfold.com/fold-token-interfold-network/",
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
  registrationDates: TODO_TEXT, // TODO: registration / KYC date range
  auctionWindow: TODO_TEXT, // TODO: auction window date range
  tgeDate: TODO_TEXT, // TODO: target TGE / transferability date
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

const statusStripItems = [
  phase.statusLead,
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
      className="group inline-flex max-w-full items-center gap-2 text-left transition-colors"
      onClick={handleCopy}
      type="button"
    >
      <span className={`break-all font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-[1.4] tracking-[0.5px] transition-colors ${valueColor}`}>
        {value}
      </span>
      <span className="shrink-0 font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-none tracking-[1.4px] text-[#82f5ad]">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

const detailRows: Array<{ term: string; value: string; href?: string }> = [
  { term: "Auction format", value: "Uniswap Continuous Clearing Auction" },
  { term: "Registration / KYC", value: AUCTION.registrationDates },
  { term: "Auction window", value: AUCTION.auctionWindow },
  { term: "Transfer restriction", value: "40-day cooldown after the auction" },
  { term: "Target TGE / transferability", value: AUCTION.tgeDate },
  { term: "Venue", value: "Uniswap CCA interface", href: AUCTION.uniswapCcaUrl },
];

const checklistItems: string[] = [
  "A compatible wallet, ready and funded",
  "Completed registration and KYC / onboarding",
  "Connection to the correct network",
  "Only the official links from this page",
];

const timelineItems: Array<{ title: string; body: string; action?: { label: string; href: string } }> = [
  {
    title: "Registration",
    body: "Eligible participants complete registration and required onboarding.",
    action: { label: "Start Registration", href: AUCTION.registrationUrl },
  },
  {
    title: "FOLD Auction",
    body: "The FOLD auction takes place through the Uniswap Continuous Clearing Auction interface.",
    action: { label: "Join the FOLD Auction", href: AUCTION.uniswapCcaUrl },
  },
  {
    title: "Cooldown Period",
    body: "After the auction, FOLD remains subject to a 40-day transfer restriction period.",
  },
  {
    title: "TGE and Token Transferability",
    body: "TGE and token transferability are part of the same launch sequence. Following the cooldown period, transferability is expected to activate at the contract level according to the defined token mechanics.",
  },
  {
    title: "Network Alpha",
    body: "The Interfold Network Alpha will roll out as the first controlled phase of the network, with selected ciphernodes and early integrations.",
  },
];

const foldRoles: Array<{ number: string; title: string; body: string }> = [
  {
    number: "01",
    title: "Operator Bonding",
    body: "Ciphernodes bond FOLD to participate in the network and become economically accountable for correct behavior.",
  },
  {
    number: "02",
    title: "E3 Request Fees",
    body: "Applications use FOLD to request encrypted computations through The Interfold.",
  },
  {
    number: "03",
    title: "Operator Rewards",
    body: "Ciphernodes earn rewards for participating in E3 setup, execution coordination, and threshold decryption.",
  },
  {
    number: "04",
    title: "Governance",
    body: "FOLD holders participate in governance over network parameters and protocol development.",
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
      "FOLD is distributed through a Continuous Clearing Auction on Uniswap. Participants submit orders during the auction window, and all successful participants receive FOLD at the same final clearing price.",
  },
  {
    question: "When can I transfer FOLD?",
    answer:
      "FOLD is subject to a 40-day transfer restriction after the auction. Transferability is expected to activate at the contract level following the cooldown, as part of the TGE.",
  },
  {
    question: "Where do I actually take part?",
    answer:
      "Only through the official Uniswap CCA interface, reached via the official links on this page. Always verify the contract address before interacting.",
  },
  {
    question: "How do I avoid scams?",
    answer:
      "Use only the links on this page. Verify the official domain and the contract address against the explorer. The team will never DM you first, and will never ask for your seed phrase or private keys.",
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
      { label: "Auction Terms", href: AUCTION.auctionTermsUrl },
      { label: "Understanding the FOLD Token", href: AUCTION.understandingFoldUrl },
      { label: "Docs", href: AUCTION.docsUrl },
      { label: "Blog", href: AUCTION.blogUrl },
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
  { label: "Audit", value: "Smart-contract audit report", href: AUCTION.auditUrl },
  { label: "Issuer", value: "Interfold Ltd." },
  { label: "Built by", value: "Gnosis Guild" },
];

// Dark "coin" card: contract info on the front, credibility on the back,
// flipped in 3D by the button.
function ContractsCard() {
  const [flipped, setFlipped] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const flip = (next: boolean) => {
    if (!shouldReduceMotion) {
      setSpinning(true);
    }
    setFlipped(next);
  };

  const flipButtonClass =
    "mt-auto inline-flex items-center gap-2 rounded-full border border-[#82f5ad]/40 px-5 py-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-none tracking-[1.4px] text-[#82f5ad] transition-colors hover:bg-[#82f5ad] hover:text-[#121718]";
  const shellClass =
    "relative h-full overflow-hidden rounded-[28px] bg-[#121718] px-6 py-12 text-[#d9fce8] md:px-12 md:py-14";

  return (
    <div className="[perspective:1600px]">
      <div
        className={`relative grid transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${spinning ? "interfold-card-spinning" : ""} ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        onAnimationEnd={(event) => {
          if (event.animationName === "interfold-card-spin-blur") {
            setSpinning(false);
          }
        }}
      >
        {/* Front — contracts */}
        <div aria-hidden={flipped} className={`[grid-area:1/1] [backface-visibility:hidden] ${flipped ? "pointer-events-none" : ""}`}>
          <div className={shellClass}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-6 h-56 w-56 -translate-x-1/2 rounded-full bg-[#82f5ad]/25 blur-[90px]" />
            <div className="relative mx-auto flex h-full max-w-[620px] flex-col items-center">
              <div className="relative mb-8 grid place-items-center">
                <div aria-hidden="true" className="absolute h-24 w-24 animate-pulse rounded-full bg-[#82f5ad]/30 blur-2xl motion-reduce:animate-none" />
                <InterfoldSymbol className="relative h-14 w-auto text-[#82f5ad] drop-shadow-[0_0_14px_rgba(130,245,173,0.55)]" />
              </div>
              <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
                Contracts
              </p>
              <dl className="mt-6 w-full border-t border-[#d9fce8]/10">
                {contractRows.map((row) => {
                  const isAddress = row.explorer && row.value !== TODO_TEXT;

                  return (
                    <div className="border-b border-[#d9fce8]/10 py-4" key={row.label}>
                      <dt className="font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55">
                        {row.label}
                      </dt>
                      <dd className="mt-2">
                        <CopyableValue tone="dark" value={row.value} />
                      </dd>
                      {isAddress && (
                        <a
                          className="mt-2 inline-block font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-none tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[3px] transition-colors hover:text-[#d9fce8]"
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
              <button className={flipButtonClass} onClick={() => flip(true)} type="button">
                View credibility
                <span aria-hidden="true">↻</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back — credibility */}
        <div aria-hidden={!flipped} className={`[grid-area:1/1] [transform:rotateY(180deg)] [backface-visibility:hidden] ${flipped ? "" : "pointer-events-none"}`}>
          <div className={shellClass}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-6 h-56 w-56 -translate-x-1/2 rounded-full bg-[#82f5ad]/20 blur-[90px]" />
            <div className="relative mx-auto flex h-full max-w-[620px] flex-col items-center">
              <div className="relative mb-8 grid place-items-center">
                <InterfoldSymbol className="relative h-10 w-auto text-[#82f5ad]/70" />
              </div>
              <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
                Credibility
              </p>
              <dl className="mt-6 grid w-full gap-x-8 gap-y-5 border-t border-[#d9fce8]/10 pt-5 sm:grid-cols-2">
                {credibilityRows.map((row) => (
                  <div className="flex flex-col gap-1" key={row.label}>
                    <dt className="font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55">
                      {row.label}
                    </dt>
                    <dd className="font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.1] text-[#d9fce8]">
                      {row.href ? (
                        <a
                          className="underline decoration-[1px] underline-offset-[4px] transition-colors hover:text-[#82f5ad]"
                          href={row.href}
                          rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <button className={flipButtonClass} onClick={() => flip(false)} type="button">
                View contracts
                <span aria-hidden="true">↻</span>
              </button>
            </div>
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

function EligibilityNote({ className = "" }: { className?: string }) {
  return (
    <p className={`font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.4] tracking-[1.2px] text-[#687d71] ${className}`}>
      Not available to persons in the UK or US, or U.S. Persons. Subject to eligibility and jurisdictional restrictions.
    </p>
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
        <div className="bg-[#121718] px-4 py-3 text-[#82f5ad]">
          <div className="mx-auto flex max-w-[1052px] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-['Office_Code_Pro:Medium',sans-serif] text-[11px] uppercase leading-[1.4] tracking-[1.4px] md:text-[12px]">
            <span aria-hidden="true" className="size-[7px] shrink-0 animate-pulse rounded-full bg-[#82f5ad] motion-reduce:animate-none" />
            {statusStripItems.map((item, index) => (
              <span className="flex items-center gap-x-3" key={item}>
                <span>{item}</span>
                {index < statusStripItems.length - 1 && (
                  <span aria-hidden="true" className="text-[#687d71]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Hero copy */}
        <section className="bg-[#d9fce8] px-4 py-[64px] text-center md:py-[112px]">
          <div className="mx-auto flex max-w-md flex-col items-center gap-6 md:max-w-[760px]">
            <h1 className="w-full font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.9] tracking-[-1.92px] md:text-[64px]">
              <LineRevealAuto text={phase.heroTitle} />
            </h1>
            <ScrollFadeIn className="flex w-full justify-center" delay={0.1}>
              <p className="max-w-[520px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]">
                FOLD supports The Interfold network: a distributed network for confidential coordination,
                enabling independent parties to compute together without exposing private inputs.
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn className="w-full" delay={0.12}>
              <Countdown />
            </ScrollFadeIn>
            <ScrollFadeIn className="mx-auto grid w-full max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2" delay={0.15}>
              <CtaButton href={phase.primaryCta.href}>{phase.primaryCta.label}</CtaButton>
              <CtaButton href={AUCTION.participationGuideUrl} variant="secondary">How to Participate</CtaButton>
            </ScrollFadeIn>
            <ScrollFadeIn className="w-full" delay={0.17}>
              <EligibilityNote className="mx-auto max-w-[420px]" />
            </ScrollFadeIn>
            <ScrollFadeIn className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2" delay={0.2}>
              <TextLink href={AUCTION.auctionFaqUrl}>Read the Auction FAQ</TextLink>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Auction details */}
        <section className="bg-white px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>Auction Details</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="FOLD is being distributed through a Continuous Clearing Auction on Uniswap." />
              </p>
              <p className="mx-auto mt-6 max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="The auction is designed for price discovery. Participants submit orders during the auction window, and all successful participants receive FOLD at the same final clearing price." />
              </p>
            </div>

            <div className="mt-10">
              <dl className="border-t border-[#3a5e3c]/30">
                {detailRows.map((row, index) => (
                  <ScrollFadeIn delay={index * 0.06} key={row.term}>
                  <div className="grid gap-1 border-b border-[#3a5e3c]/30 py-4 md:grid-cols-[1fr_1.4fr] md:items-baseline">
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
        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[760px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>How to Participate</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[600px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="To participate in the FOLD auction, eligible participants must complete the required registration and onboarding process, then submit an order through the official Uniswap CCA interface during the auction window." />
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-[520px]">
              <ScrollFadeIn>
                <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
                  Before you start
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
        <section className="bg-[#687d71] px-4 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[860px]">
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
                      <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1] tracking-[-0.72px] text-[#d9fce8] md:text-[28px]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[620px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#d9fce8] md:text-[18px]">
                        {item.body}
                      </p>
                      {item.action && (
                        <div className="mt-4">
                          <HoverArrowLink
                            className="inline-flex"
                            href={item.action.href}
                            textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad] underline decoration-[1px] underline-offset-[5px] transition-colors group-hover:text-[#d9fce8]"
                          >
                            {item.action.label}
                          </HoverArrowLink>
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
        <section className="bg-[#121718] px-4 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="mx-auto max-w-[760px] text-center">
              <ScrollFadeIn>
                <SectionLabel className="text-[#d9fce8]/55">The Role of FOLD</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#82f5ad] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="FOLD supports the economic layer of The Interfold network." />
              </p>
              <p className="mx-auto mt-6 max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#d9fce8] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="The Interfold coordinates encrypted computations through E3s: ephemeral Encrypted Execution Environments where private inputs are processed into shared, verifiable outcomes. Ciphernodes participate in the network processes that support E3 setup, execution coordination, and threshold decryption." />
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
        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[860px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel>What FOLD Supports</SectionLabel>
              </ScrollFadeIn>
              <p className="mx-auto mt-[11.543px] max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95]">
                <LineRevealAuto delay={0.08} text="The Interfold enables confidential coordination: systems where multiple parties need one shared result from private inputs." />
              </p>
              <p className="mx-auto mt-6 max-w-[640px] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] text-[#687d71] md:text-[18px]">
                <LineRevealAuto delay={0.2} text="The Interfold makes these systems possible through encrypted execution, verifiable outcomes, and distributed threshold authority." />
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
                <TextLink href={AUCTION.docsUrl}>Learn how The Interfold works</TextLink>
                <TextLink href={AUCTION.docsUrl}>Explore E3 Documentation</TextLink>
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 py-[64px] md:py-[112px]">
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
        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
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
                The team will never DM you first and will never ask for your seed phrase.
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn className="mx-auto mt-12 grid w-full max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-3" delay={0.15}>
              <CtaButton href={AUCTION.telegramUrl} variant="secondary">Join Telegram</CtaButton>
              <CtaButton href={AUCTION.discordUrl} variant="secondary">Join Discord</CtaButton>
              <CtaButton href={AUCTION.xUrl} variant="secondary">Follow on X</CtaButton>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Important information */}
        <section className="bg-white px-4 py-[64px] md:py-[96px]">
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
