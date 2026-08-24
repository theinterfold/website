import Slider from "react-slick";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { HeroImage, participateHeroSources } from "./HeroImage";
import { HoverArrowLink } from "./HoverArrowLink";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SectionLabel } from "./SectionLabel";
import { BUTTON_SIZE, SUPPORTING_LINE, TITLE_BLOCK_GAP } from "./titleBlock";
import { useMobileCarouselOpacity } from "./useMobileCarouselOpacity";

// `outro` used to live on each pathway and was never rendered — dead strings
// that still shipped in the bundle, including one about "invite-only testnet"
// from before Network Alpha. Removed rather than updated.
const pathways = [
  {
    title: "01. Run a ciphernode",
    copy: [
      "Run infrastructure for confidential coordination. Ciphernodes are selected into computation-specific committees and take part in distributed key generation, threshold decryption, and other protocol-defined duties.",
      "Ciphernodes participate in:",
    ],
    bullets: [
      "Computation-specific committees",
      "Distributed key generation",
      "Threshold decryption",
    ],
    actions: [
      { label: "Run a ciphernode", href: "https://dashboard.theinterfold.com/#operator", primary: true },
      { label: "Learn about ciphernodes", href: "https://docs.theinterfold.com/ciphernode-operators", primary: false },
    ],
  },
  {
    title: "02. Build and integrate",
    copy: [
      "Build applications where multiple parties need to produce shared, verifiable outcomes from private inputs.",
      "Early areas of focus include:",
    ],
    bullets: [
      "Private voting and governance",
      "Sealed-bid and batch auctions",
      "Multi-party analytics",
      "Agent-mediated coordination",
    ],
    actions: [
      { label: "Explore docs", href: "https://docs.theinterfold.com/getting-started", primary: true },
      { label: "Chat with us", href: "https://t.me/enclave_e3", primary: false },
    ],
  },
  {
    title: "03. Partner on a pilot",
    copy: [
      "Work with us to test and deploy confidential coordination in live use cases.",
      "Partners may participate as requesters, data providers, or both, depending on the use case.",
      "This includes:",
    ],
    bullets: [
      "Onchain entities and governance frameworks",
      "Privacy-focused applications",
      "Research groups in secure computation",
      "Teams working on agent coordination",
    ],
    actions: [
      { label: "Reach out", href: "mailto:comms@gnosisguild.org", primary: true },
      { label: "Chat with us", href: "https://t.me/enclave_e3", primary: false },
    ],
  },
];

// All three are reached now — Network Alpha is live, so nothing here is still
// ahead of the network.
const timelineItems = [
  "Internal devnet",
  "Public testnet",
  "Network Alpha",
];

// Each actor names its drawing rather than relying on its position in this
// array, so reordering the row can never silently shuffle the glyphs.
type ActorGlyphName = "requester" | "provider" | "committee";

const actors: Array<{ title: string; role: string; detail: string; glyph: ActorGlyphName }> = [
  {
    title: "Requesters",
    role: "Initiating E3s",
    detail: "Requesters define and initiate confidential computations.",
    glyph: "requester",
  },
  {
    title: "Data providers",
    role: "Contributing encrypted inputs",
    detail: "Data providers contribute sensitive information in encrypted form.",
    glyph: "provider",
  },
  {
    title: "Compute providers",
    role: "Executing E3 programs",
    detail: "Compute providers run the defined computation over encrypted inputs.",
    // PLACEHOLDER DRAWING — this is the Requesters glyph, borrowed so the fourth
    // actor can ship with the copy. Tiago is drawing the real one. To swap it in,
    // add the <svg> to ActorGlyph under a new name and change this one word.
    glyph: "requester",
  },
  {
    title: "Ciphernode committees",
    role: "DKG + threshold decryption",
    detail:
      "Ciphernode committees collectively generate encryption keys and decrypt permitted outputs once the required threshold is reached.",
    glyph: "committee",
  },
];

// Marvin's intro says "two forms of network participation" while there are three
// cards: transferring is not participation, it is just what the token also does.
// Kept as written; worth a second look with him.
const foldActions = [
  {
    title: "Bond FOLD",
    copy: [
      "Bond FOLD to become eligible to run a ciphernode.",
      "Bonded operators can be selected into computation-specific committees responsible for distributed key generation, threshold decryption, and other network duties.",
    ],
    actions: [
      { label: "Bond FOLD", href: "https://dashboard.theinterfold.com/#operator", primary: true },
      { label: "Learn about ciphernodes", href: "https://docs.theinterfold.com/ciphernode-operators", primary: false },
    ],
  },
  {
    title: "Lock FOLD",
    copy: [
      "Lock FOLD to participate in Interfold governance and receive governance weight.",
      "Confidential, receipt-free voting is being brought onchain through the Interfold governance system.",
    ],
    actions: [
      { label: "Lock FOLD", href: "https://governance.theinterfold.com", primary: true },
      {
        label: "Learn about confidential governance",
        href: "https://blog.theinterfold.com/verifiable-secret-ballots-with-interfold-and-aragon/",
        primary: false,
      },
    ],
  },
  {
    title: "Transfer FOLD",
    // The token address matches the one on the auction page.
    copy: ["FOLD is generally transferable on Ethereum mainnet."],
    actions: [
      {
        label: "Swap on Uniswap",
        href: "https://app.uniswap.org/explore/tokens/ethereum/0xe172e9b6cfbeeb5593bdce3f077356fdb33af904",
        primary: true,
      },
      {
        label: "View market",
        href: "https://dexscreener.com/ethereum/0x909e4a022a7505d44b19b36fe76ee18567379ee4c9697438acde2e159c006c32",
        primary: false,
      },
    ],
  },
];

const carouselSettings = {
  centerMode: true,
  centerPadding: "0px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  touchThreshold: 10,
};

function ParticipationCard({ pathway }: { pathway: (typeof pathways)[number] }) {
  const [pathwayNumber, ...pathwayTitleParts] = pathway.title.split(". ");
  const pathwayTitle = pathwayTitleParts.join(". ");
  const formattedTitle =
    pathwayNumber === "01" ? (
      <>
        Run a
        <br />
        ciphernode
      </>
    ) : pathwayNumber === "02" ? (
      <>
        Build and
        <br />
        integrate
      </>
    ) : pathwayNumber === "03" ? (
      <>
        Partner on a
        <br />
        pilot
      </>
    ) : (
      pathwayTitle
    );

  return (
    <article className="flex h-[640px]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[#121718] p-6 text-[#d9fce8]">
        <div className="shrink-0">
          <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
            {pathwayNumber}
          </span>
          <h2 className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[0.95] tracking-[-0.96px]">
            {formattedTitle}
          </h2>
        </div>
        <div className="my-7 h-px shrink-0 bg-[#82f5ad]/35" />
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075]">
            {pathway.copy.slice(0, -1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1" />
          <div className="shrink-0">
            <div className="mb-3 h-px bg-[#82f5ad]/35" />
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075]">
              {pathway.copy[pathway.copy.length - 1]}
            </p>
            <ul className="mt-5 space-y-3">
              {pathway.bullets.map((bullet) => (
                <li className="grid grid-cols-[7px_1fr] gap-3" key={bullet}>
                  <span className="mt-[5px] size-[5px] rounded-full bg-[#82f5ad]" />
                  <span className="whitespace-pre-line font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.38] tracking-[2.4px] text-[#82f5ad]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-7 flex shrink-0 flex-col gap-2">
            {pathway.actions.map((action) => (
              <HoverArrowLink
                className={`flex w-full items-center justify-center ${BUTTON_SIZE} px-4 transition-colors hover:bg-[#3a5e3c] ${
                  action.primary ? "bg-[#82f5ad] text-[#3a5e3c]" : "bg-[rgba(193,217,191,0.8)] text-[#3a5e3c]"
                }`}
                href={action.href}
                key={action.label}
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                {action.label}
              </HoverArrowLink>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FoldCard({ item }: { item: (typeof foldActions)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] bg-white p-6">
      <h3 className="font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[0.95] tracking-[-0.96px]">
        {item.title}
      </h3>
      <div className="my-7 h-px bg-[#3a5e3c]/20" />
      <div className="space-y-3 font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075]">
        {item.copy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-7">
        {item.actions.map((action) => (
          <HoverArrowLink
            className={`flex w-full items-center justify-center ${BUTTON_SIZE} px-4 text-center transition-colors hover:bg-[#3a5e3c] ${
              action.primary ? "bg-[#82f5ad] text-[#3a5e3c]" : "bg-[rgba(193,217,191,0.8)] text-[#3a5e3c]"
            }`}
            href={action.href}
            key={action.label}
            textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
          >
            {action.label}
          </HoverArrowLink>
        ))}
      </div>
    </article>
  );
}

function ActorGlyph({ className = "", glyph }: { className?: string; glyph: ActorGlyphName }) {
  const iconClass = "actor-glyph__svg h-16 w-[68px] overflow-visible";
  // The mint fills sit inside a dark outline, so they still read on white. The
  // three accent *strokes* do not — mint line work on a white panel all but
  // disappears — so they take the dark green and the mint stays a fill colour.
  const accent = "#82f5ad";
  const accentStroke = "#3a5e3c";

  return (
    <div className={`actor-glyph relative grid size-[76px] place-items-center text-[#3a5e3c] ${className}`}>
      {glyph === "requester" ? (
        <svg aria-hidden="true" className={iconClass} fill="none" focusable="false" viewBox="0 0 52.1 44.7">
          <path d="M9.55,14.55c-3.2,0-5.7,2.7-5.7,5.8s2.5,5.9,5.7,5.9,5.9-2.7,5.9-5.9-2.7-5.8-5.9-5.8Z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M9.65,28.65c-4.3,0-8.9,3.9-8.9,9.7v3.1h18.1v-3.1c0-5.8-4.9-9.7-9.2-9.7Z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M23.25,11.45V3.65h23.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <rect height="22" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="21" x="23.25" y="11.45" />
          <g className="actor-glyph__request-code">
            <polyline points="30.55 19.55 27.65 22.35 30.55 25.35" stroke={accentStroke} strokeMiterlimit="10" strokeWidth="1.5" />
            <polyline points="37.15 19.35 40.05 22.45 37.15 25.35" stroke={accentStroke} strokeMiterlimit="10" strokeWidth="1.5" />
            <line stroke={accentStroke} strokeMiterlimit="10" strokeWidth="1.5" x1="32.25" x2="35.35" y1="27.05" y2="17.65" />
          </g>
          <circle className="actor-glyph__pulse actor-glyph__pulse--a" cx="48.65" cy="3.45" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M44.25,33.25v7.8h-23.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--b" cx="18.85" cy="41.25" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        </svg>
      ) : glyph === "provider" ? (
        <svg aria-hidden="true" className={`${iconClass} translate-x-0.5`} fill="none" focusable="false" viewBox="0 0 61.4 54">
          <polyline points="46.05 18.05 32.05 18.05 32.05 35.15 48.55 35.15 48.55 18.05 46.05 18.05" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="13.65 7.2 23.65 7.2 32.05 18.05" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="14.1 46.55 24.1 46.55 32.05 35.15" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="13.65" x2="32.43" y1="26.15" y2="26.15" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="48.85" x2="57.85" y1="26.15" y2="26.15" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="40.45" x2="40.45" y1="4.95" y2="18.05" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="40.45" x2="40.45" y1="35.45" y2="47.95" />
          <rect className="actor-glyph__provider-core" fill={accent} height="5.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="5.4" x="37.85" y="23.45" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--a" cx="40.45" cy="3.65" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--c" cx="40.45" cy="49.35" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--b" cx="59.05" cy="26.15" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <g className="actor-glyph__provider-source actor-glyph__provider-source--a">
            <rect height="12.9" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".75" y=".75" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="4" y2="4" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="7.2" y2="7.2" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="10.4" y2="10.4" />
          </g>
          <g className="actor-glyph__provider-source actor-glyph__provider-source--b">
            <rect height="13.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".85" y="19.45" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="22.95" y2="22.95" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="26.15" y2="26.15" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="29.35" y2="29.35" />
          </g>
          <g className="actor-glyph__provider-source actor-glyph__provider-source--c">
            <rect height="13.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".85" y="39.85" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="43.35" y2="43.35" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="46.55" y2="46.55" />
            <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="49.75" y2="49.75" />
          </g>
        </svg>
      ) : (
        <svg aria-hidden="true" className={iconClass} fill="none" focusable="false" viewBox="0 0 45.7 52.21">
          <polygon className="actor-glyph__committee-ring" points="42.25 36.95 42.25 14.55 22.85 3.35 3.45 14.55 3.45 36.95 22.85 48.15 42.25 36.95" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--d" cx="22.85" cy="48.76" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--a" cx="22.85" cy="3.35" fill={accent} r="2.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--c" cx="3.45" cy="37.35" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="22.85" x2="22.85" y1="5.95" y2="13.35" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="22.85" x2="22.85" y1="38.66" y2="46.06" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="41.65" x2="33.65" y1="35.95" y2="31.65" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="5.45" x2="12.45" y1="36.05" y2="32.05" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--e" cx="42.25" cy="37.35" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polygon points="33.65 31.99 33.65 19.51 22.85 13.28 12.05 19.51 12.05 31.99 22.85 38.22 33.65 31.99" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <g className="actor-glyph__committee-core">
            <polygon fill={accent} points="28.35 30.85 17.95 30.85 17.95 20.35 28.25 20.35 28.35 30.85" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
            <polyline points="20.65 24.85 22.55 27.15 25.95 23.25" stroke="#3a5e3c" strokeMiterlimit="10" strokeWidth="1.5" />
          </g>
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="12.05" x2="3.45" y1="19.51" y2="14.55" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="33.65" x2="42.25" y1="19.51" y2="14.55" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--b" cx="3.45" cy="14.23" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle className="actor-glyph__pulse actor-glyph__pulse--f" cx="42.25" cy="14.23" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export function ParticipatePage() {
  const participationCarouselRef = useMobileCarouselOpacity();

  return (
    <div className="interfold-page-transition min-h-screen overflow-x-clip bg-[#d9fce8] text-[#3a5e3c]">
      <main>
        <div className="interfold-hero-transition relative h-64 w-full overflow-hidden bg-white md:h-[min(44.444vw,640px)]">
          <HeroImage
            className="h-full w-full object-cover object-top md:hidden"
            fadeIn={false}
            pictureClassName="block h-full w-full md:hidden"
            sources={participateHeroSources}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full -translate-x-1/2 overflow-hidden bg-white md:block">
            <HeroImage
              className="absolute inset-0 h-full w-full object-cover object-top"
              fadeIn={false}
              sources={participateHeroSources}
            />
          </div>
        </div>

        <section className="bg-white px-4 py-[64px] text-center md:py-[112px]">
          <div className={`mx-auto flex max-w-md flex-col items-center ${TITLE_BLOCK_GAP} md:max-w-[760px]`}>
            <ScrollFadeIn className="flex w-full justify-center">
              <SectionLabel>Participate</SectionLabel>
            </ScrollFadeIn>
            <ScrollFadeIn className="w-full">
              <h1 className="font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.87] tracking-[-1.92px] md:text-[64px]">
                Different Roles.
                <br />
                Shared Infrastructure.
              </h1>
            </ScrollFadeIn>
            <ScrollFadeIn className="flex w-full justify-center" delay={0.1}>
              <p data-preview-was="Builders, operators, and partners each help bring confidential coordination into practice." className={`w-full max-w-[320px] ${SUPPORTING_LINE} text-[#687d71] md:w-[440px] md:max-w-none`}>
                Confidential coordination depends on multiple roles working together.
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[597.355px]">
              <SectionLabel>Overview</SectionLabel>
              <p data-preview-was="Interfold enables programs to run across encrypted inputs without exposing the data or concentrating execution in a single place." className="mx-auto mt-[11.543px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:max-w-none md:text-[32px] md:leading-[0.95]">
                Interfold enables programs to compute over encrypted inputs without exposing the underlying data or placing decryption control in a single party.
              </p>
              <p className={`mx-auto mt-8 max-w-[320px] ${SUPPORTING_LINE} md:max-w-none`}>
                This requires coordination between multiple actors:
              </p>
            </ScrollFadeIn>

            {/* The same panel the stages sit on further down the page: 24px, one
                step off the section background, so the four roles read as one
                object. White is the light-section panel tone — it is what the
                FOLD cards use. */}
            <div className="mx-auto mt-4 max-w-md rounded-[24px] bg-white px-6 py-12 min-[1100px]:mt-16 min-[1100px]:max-w-[1052px] min-[1100px]:px-10 min-[1100px]:py-14">
            <div className="flex flex-col gap-16 pt-4 min-[1100px]:grid min-[1100px]:grid-cols-4 min-[1100px]:items-start min-[1100px]:gap-4 min-[1100px]:pt-0">
              {actors.map(({ title, role, detail, glyph }) => (
                <ScrollFadeIn className="relative flex w-full max-w-md flex-col text-left min-[1100px]:max-w-none" key={title}>
                    <ActorGlyph className="self-center" glyph={glyph} />
                    <div className="flex min-w-0 flex-col">
                      <p className="mt-4 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95] min-[1100px]:mt-6 min-[1100px]:max-w-md">
                        {title}
                      </p>
                      <p className="mt-3 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71] min-[1100px]:max-w-md min-[1100px]:text-[14px]">
                        {role}
                      </p>
                      <p
                        data-preview-note={title === "Compute providers" ? "computeProviders" : undefined}
                        className="mt-3 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.2] text-[#3a5e3c] min-[1100px]:max-w-md"
                      >
                        {detail}
                      </p>
                    </div>
                </ScrollFadeIn>
              ))}
            </div>
            </div>

            <ScrollFadeIn className="mt-14 flex justify-center" delay={0.1}>
              <div data-preview-note="howItWorksParticipate">
              <HoverArrowLink
                className={`flex w-full max-w-[320px] items-center justify-center ${BUTTON_SIZE} bg-[#82f5ad] px-6 transition-colors hover:bg-[#3a5e3c] md:w-auto`}
                href="https://blog.theinterfold.com/how-interfold-works/"
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                How Interfold works
              </HoverArrowLink>
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#687d71] px-4 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[597.355px]">
              <SectionLabel className="text-[#d9fce8]/55">Participate</SectionLabel>
              <p data-preview-was="Participation is not one-size-fits-all. Each role has different responsibilities, constraints, and timelines. (eyebrow was PARTICIPATION PATHWAYS)" className="mx-auto mt-[11.543px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] md:max-w-none md:text-[32px] md:leading-[1.02] md:tracking-[-0.96px]">
                Help form the network
              </p>
              <p className="mx-auto mt-4 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] md:max-w-[597.355px]">
                Operate infrastructure, build applications, or bring a real-world use case.
              </p>
            </ScrollFadeIn>
            <div className="mx-auto mt-16 w-full max-w-md min-[1100px]:hidden">
              <div className="mobile-what-possible-carousel participation-pathways-carousel -mx-1.5 w-[calc(100%+12px)] [&_.slick-slide>div]:h-full [&_.slick-slide]:h-auto [&_.slick-track]:items-stretch" ref={participationCarouselRef}>
              <Slider {...carouselSettings}>
                {pathways.map((pathway) => (
                  <div className="h-full px-1.5" key={pathway.title}>
                    <ParticipationCard pathway={pathway} />
                  </div>
                ))}
              </Slider>
              </div>
            </div>
            <div className="mt-16 hidden grid-cols-3 gap-4 min-[1100px]:grid">
              {pathways.map((pathway, index) => (
                <ScrollFadeIn className="h-full w-full" delay={index * 0.1} key={pathway.title}>
                  <ParticipationCard pathway={pathway} />
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[597.355px]">
              <SectionLabel>FOLD</SectionLabel>
              <p data-preview-note="foldSection" className="mx-auto mt-[11.543px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] md:max-w-none md:text-[32px] md:leading-[1.02] md:tracking-[-0.96px]">
                Operate. Govern. Transfer.
              </p>
              <p className="mx-auto mt-4 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] md:max-w-[597.355px]">
                FOLD supports two forms of network participation: operating and governing.
              </p>
            </ScrollFadeIn>
            <div className="mx-auto mt-16 grid max-w-md gap-4 md:max-w-none md:grid-cols-3">
              {foldActions.map((item, index) => (
                <ScrollFadeIn className="h-full w-full" delay={index * 0.1} key={item.title}>
                  <FoldCard item={item} />
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#121718] px-4 py-[64px] text-[#82f5ad] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel className="text-[#d9fce8]/55">Now live</SectionLabel>
              </ScrollFadeIn>
              <ScrollFadeIn className="mx-auto mt-[11.543px] max-w-[320px] md:w-[597.355px] md:max-w-md">
                <p data-preview-was="The network is forming in stages: (eyebrow was WHAT'S NEXT, and only the first two stages were marked as reached)" className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#82f5ad] md:text-[32px] md:leading-[0.95]">
                  The network has entered its next stage:
                </p>
              </ScrollFadeIn>
              {/* The stages sit on their own panel so the sequence reads as one
                  object rather than as loose marks on the section background.
                  24px is the radius the cards already use — the only large radius
                  in the system. #1c2426 is the panel tone from the auction page. */}
              <div className="mx-auto mt-16 max-w-md rounded-[24px] bg-[#1c2426] px-6 py-12 md:max-w-none md:px-10 md:py-14">
              {/* Four columns, but only three stages: the fourth is the continuation
                  marker below. The connector percentages are column centres, so they
                  move whenever the column count does. */}
              <div className="relative grid gap-10 md:grid-cols-4 md:gap-4">
                <div className="absolute left-[calc(12.5%+36px)] right-[calc(62.5%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                <div className="absolute left-[calc(37.5%+36px)] right-[calc(37.5%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                <div className="absolute left-[calc(62.5%+36px)] right-[calc(12.5%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                {timelineItems.map((item, index) => {
                  const isActive = true;

                  return (
                    <ScrollFadeIn className="relative flex flex-col items-center" delay={index * 0.1} key={item}>
                      <span className={`relative z-10 grid size-10 place-items-center font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] md:text-[14px] ${isActive ? "bg-[#82f5ad] text-[#121718]" : "bg-[#687d71] text-[#121718]"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`mt-4 block size-3 rounded-full ${isActive ? "bg-[#82f5ad]" : "bg-[#687d71]"}`} />
                      <span className={`mt-3 h-8 w-px ${isActive ? "bg-[#82f5ad]/60" : "bg-[#687d71]"}`} />
                      <p className={`mt-4 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] md:max-w-md md:text-[14px] ${isActive ? "text-[#d9fce8]" : "text-[#d9fce8]/55"}`}>
                        {item}
                      </p>
                    </ScrollFadeIn>
                  );
                })}

                {/* Deliberately not a stage 04: no number, hollow marker, muted
                    colour. It says the sequence keeps going, not that something
                    else is scheduled. */}
                <ScrollFadeIn className="relative flex flex-col items-center" delay={timelineItems.length * 0.1}>
                  <span className="relative z-10 grid size-10 place-items-center border border-dotted border-[#687d71] font-['Office_Code_Pro:Medium',sans-serif] text-[14px] leading-none text-[#687d71]">
                    &rarr;
                  </span>
                  <span className="mt-4 block size-3 rounded-full border border-dotted border-[#687d71]" />
                  <span className="mt-3 h-8 w-px bg-[#687d71]" />
                  <p data-preview-note="continues" className="mt-4 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55 md:max-w-md md:text-[14px]">
                    Network formation continues
                  </p>
                </ScrollFadeIn>
              </div>
              </div>
              <ScrollFadeIn className="mx-auto mt-14 max-w-[320px] md:max-w-[760px]">
                <p data-preview-note="alphaCtas" data-preview-was="Access will expand gradually as the system stabilizes. This page will be updated as participation opens." className={`${SUPPORTING_LINE} text-[#82f5ad]`}>
                  Network Alpha is live on Ethereum mainnet.
                  <br />
                  More operators join, more applications and E3s go live, and governance comes online from here.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn
                className="mx-auto mt-10 flex w-full max-w-[320px] flex-col items-center gap-2 md:max-w-none md:flex-row md:justify-center md:gap-3"
                delay={0.1}
              >
                <HoverArrowLink
                  className={`flex w-full items-center justify-center ${BUTTON_SIZE} bg-[#82f5ad] px-6 transition-colors hover:bg-[#3a5e3c] md:w-auto`}
                  href="https://dashboard.theinterfold.com/"
                  textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                >
                  Explore Network Alpha
                </HoverArrowLink>
                <HoverArrowLink
                  className={`flex w-full items-center justify-center ${BUTTON_SIZE} bg-[rgba(193,217,191,0.8)] px-6 transition-colors hover:bg-[#3a5e3c] md:w-auto`}
                  href="https://blog.theinterfold.com/network-alpha-mainnet/"
                  textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                >
                  Read the launch post
                </HoverArrowLink>
              </ScrollFadeIn>
            </div>
          </div>
        </section>

      </main>

      <DesktopFooter />
    </div>
  );
}
