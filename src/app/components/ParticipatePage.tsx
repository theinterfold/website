import { ActorGlyph, type ActorGlyphName } from "./ActorGlyph";
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
      "E3 committee participation",
      "Distributed key generation",
      "Threshold decryption",
      "Protocol-defined duties",
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
      "Work with us to bring confidential coordination into live systems.",
      "Partners can integrate Interfold into governance, research, public-interest, and other multiparty use cases.",
      "This includes:",
    ],
    bullets: [
      "Onchain governance systems",
      "Public + civic institutions",
      "Secure computation research",
      "Agent coordination teams",
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
const actors: Array<{ title: string; role: string; detail: string; glyph: ActorGlyphName }> = [
  {
    title: "Requesters",
    role: "Initiating E3s",
    detail:
      "Requesters define and initiate confidential computations. Applications, protocols, or other systems can act as requesters.",
    glyph: "requester",
  },
  {
    title: "Participants",
    role: "Contributing private inputs",
    detail:
      "Participants contribute the private information an E3 computes over, encrypted before submission. They can be people, applications, organizations, or other systems.",
    glyph: "provider",
  },
  {
    title: "Ciphernodes",
    role: "DKG + threshold decryption",
    detail:
      "Ciphernodes form computation-specific committees that collectively generate encryption keys and decrypt permitted outputs once the required threshold is reached.",
    glyph: "committee",
  },
];

// Marvin reordered these so the token comes before what it is for: get FOLD,
// then bond it to operate, then lock it to govern. The line above used to say
// "two forms of network participation" while three cards sat under it; he
// rewrote that too.
const foldActions = [
  {
    title: "Get FOLD",
    copy: ["FOLD gives holders access to the network's operator and governance pathways."],
    actions: [
      {
        label: "Swap on Uniswap",
        // The token address matches the one on the auction page.
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
  {
    title: "Bond to operate",
    copy: [
      "Ciphernodes do more than validate activity: they participate in computation-specific committees, distributed key generation, threshold decryption, and other network duties.",
    ],
    actions: [
      { label: "Bond FOLD", href: "https://dashboard.theinterfold.com/#operator", primary: true },
      { label: "Learn about ciphernodes", href: "https://docs.theinterfold.com/ciphernode-operators", primary: false },
    ],
  },
  {
    title: "Lock to govern",
    copy: [
      "Locked FOLD gives holders voting power to create proposals, vote on consequential network decisions, and participate in confidential, receipt-free governance.",
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
          <div className="space-y-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075]">
            {pathway.copy.slice(0, -1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1" />
          <div className="shrink-0">
            <div className="mb-3 h-px bg-[#82f5ad]/35" />
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075]">
              {pathway.copy[pathway.copy.length - 1]}
            </p>
            <ul className="mt-5 space-y-3">
              {pathway.bullets.map((bullet) => (
                <li className="grid grid-cols-[7px_1fr] gap-3" key={bullet}>
                  <span className="mt-[5px] size-[5px] rounded-full bg-[#82f5ad]" />
                  <span className="whitespace-pre-line font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.38] tracking-[1.4px] text-[#82f5ad]">
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
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
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
      <div className="space-y-3 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075]">
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
            textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
          >
            {action.label}
          </HoverArrowLink>
        ))}
      </div>
    </article>
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
            </ScrollFadeIn>
            <ScrollFadeIn className="w-full">
              <h1 className="font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.87] tracking-[-1.92px] md:text-[64px]">
                Different Roles.
                <br />
                Shared Infrastructure.
              </h1>
            </ScrollFadeIn>
            <ScrollFadeIn className="flex w-full justify-center" delay={0.1}>
              <p className={`w-full max-w-[320px] ${SUPPORTING_LINE} text-[#687d71] md:w-[440px] md:max-w-none`}>
                Confidential coordination brings different parties into a shared computation.
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[600px]">
              <SectionLabel>Overview</SectionLabel>
              <p className="mx-auto mt-[12px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:max-w-none md:text-[32px] md:leading-[0.95]">
                Interfold enables programs to compute over encrypted inputs.
              </p>
              <p className={`mx-auto mt-4 max-w-[320px] ${SUPPORTING_LINE} text-[#687d71] md:max-w-none`}>
                The underlying data stays private, and no single party controls decryption.
              </p>
              <div className="mt-8">
                <SectionLabel>This requires three core roles:</SectionLabel>
              </div>
            </ScrollFadeIn>

            {/* Concentric corners: the inner radius is the outer radius minus
                the gap between them, or the two curves run at different rates
                and the nesting reads as a mistake. The panel keeps the site's
                24px and the padding is 40, so the frames come out square —
                24 minus 40 has no positive answer. White is the light-section
                panel tone: it is what the FOLD cards use. */}
            <div className="mx-auto mt-4 max-w-md rounded-[24px] bg-white p-6 min-[1100px]:mt-16 min-[1100px]:max-w-[1052px] min-[1100px]:p-10">
            {/* Two up until the three fit: stacked one-wide, the square frames
                grew to the full panel and the section ran for pages. */}
            {/* Three roles do not divide into two columns, so below the
                four-across breakpoint each one is a row instead: the frame keeps
                its square, shrinks to a fixed size, and the copy sits beside it.
                No orphan, and no tower of full-width squares either. */}
            <div className="flex flex-col gap-8 min-[1100px]:grid min-[1100px]:grid-cols-3 min-[1100px]:items-start min-[1100px]:gap-4">
              {actors.map(({ title, role, detail, glyph }) => (
                <ScrollFadeIn className="relative flex w-full max-w-md gap-4 text-left min-[1100px]:max-w-none min-[1100px]:flex-col min-[1100px]:gap-0" key={title}>
                    <ActorGlyph className="w-[104px] shrink-0 bg-[#d9fce8] min-[1100px]:aspect-square min-[1100px]:w-full" glyph={glyph} />
                    <div className="flex min-w-0 flex-col">
                      <p className="max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.95] min-[1100px]:mt-6 min-[1100px]:max-w-md">
                        {title}
                      </p>
                      <p className="mt-3 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71] min-[1100px]:max-w-md min-[1100px]:text-[14px]">
                        {role}
                      </p>
                      <p
                        className="mt-3 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.2] text-[#3a5e3c] min-[1100px]:max-w-md"
                      >
                        {detail}
                      </p>
                    </div>
                </ScrollFadeIn>
              ))}
            </div>
            </div>

            <ScrollFadeIn className="mt-14 flex justify-center" delay={0.1}>
              <div>
              <HoverArrowLink
                className={`flex w-full max-w-[320px] items-center justify-center ${BUTTON_SIZE} bg-[#82f5ad] px-6 transition-colors hover:bg-[#3a5e3c] md:w-auto`}
                href="https://blog.theinterfold.com/how-interfold-works/"
                textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
              >
                How Interfold works
              </HoverArrowLink>
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#687d71] px-4 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[600px]">
              <SectionLabel className="text-[#d9fce8]/55">Participate</SectionLabel>
              <p className="mx-auto mt-[12px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] md:max-w-none md:text-[32px] md:leading-[0.95] md:tracking-[-0.96px]">
                Help form the network
              </p>
              <p className={`mx-auto mt-4 max-w-[320px] ${SUPPORTING_LINE} md:max-w-[600px]`}>
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
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[600px]">
              <SectionLabel>FOLD</SectionLabel>
              <p className="mx-auto mt-[12px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] md:max-w-none md:text-[32px] md:leading-[0.95] md:tracking-[-0.96px]">
                FOLD in the network
              </p>
              <p className={`mx-auto mt-4 max-w-[320px] ${SUPPORTING_LINE} md:max-w-[600px]`}>
                FOLD connects token holders to network participation and governance.
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
              <ScrollFadeIn className="mx-auto mt-[12px] max-w-[320px] md:w-[600px] md:max-w-md">
                <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#82f5ad] md:text-[32px] md:leading-[0.95]">
                  The network has entered its next stage:
                </p>
              </ScrollFadeIn>
              {/* The stages sit on their own panel so the sequence reads as one
                  object rather than as loose marks on the section background.
                  24px is the radius the cards already use — the only large radius
                  in the system. #1c2426 is the panel tone from the auction page. */}
              <div className="mx-auto mt-16 max-w-md rounded-[24px] bg-[#1c2426] p-6 md:max-w-none md:p-10">
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
                  <p className="mt-4 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]/55 md:max-w-md md:text-[14px]">
                    Network formation continues
                  </p>
                </ScrollFadeIn>
              </div>
              </div>
              <ScrollFadeIn className="mx-auto mt-14 max-w-[320px] md:max-w-[760px]">
                <p className={`${SUPPORTING_LINE} text-[#82f5ad]`}>
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
                  textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
                >
                  Explore Network Alpha
                </HoverArrowLink>
                <HoverArrowLink
                  className={`flex w-full items-center justify-center ${BUTTON_SIZE} bg-[rgba(193,217,191,0.8)] px-6 transition-colors hover:bg-[#3a5e3c] md:w-auto`}
                  href="https://blog.theinterfold.com/network-alpha-mainnet/"
                  textClassName="font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-[1.075] text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]"
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
