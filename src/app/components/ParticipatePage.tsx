import imgHero from "../../imports/Desktop/TheInterfold_Participate.png";
import Slider from "react-slick";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { useMobileCarouselOpacity } from "./useMobileCarouselOpacity";

const pathways = [
  {
    title: "01. Run a ciphernode",
    copy: [
      "Ciphernodes are network operators selected into committees that coordinate encrypted execution, threshold enforcement, and outcome release.",
      "Ciphernodes participate in:",
    ],
    bullets: [
      "PER-COMPUTATION COMMITTEES",
      "ENCRYPTED EXECUTION COORDINATION",
      "THRESHOLD ENFORCEMENT",
      "OUTCOME RELEASE",
    ],
    outro: [
      "Responsibility is shared.",
      "No single node can reconstruct the data or unilaterally affect results.",
      "We are currently preparing the initial operator cohort ahead of invite-only testnet.",
    ],
    actions: [
      { label: "Apply here", href: "https://tally.so/r/meJPjo", primary: true },
      { label: "Learn more about ciphernodes", href: "https://docs.theinterfold.com/", primary: false },
    ],
  },
  {
    title: "02. Build and integrate",
    copy: [
      "Interfold supports applications that require coordination across multiple private inputs.",
      "Early areas of focus include:",
    ],
    bullets: [
      "private voting and governance",
      "sealed-bid and batch auctions",
      "multi-party\nanalytics",
      "agent-mediated coordination",
    ],
    outro: [
      "Developers can explore early documentation, collaborate on use case design, and prepare integrations ahead of testnet.",
    ],
    actions: [
      { label: "Explore docs", href: "https://docs.theinterfold.com/", primary: true },
      { label: "Chat with us for support", href: "https://t.me/enclave_e3", primary: false },
    ],
  },
  {
    title: "03. Partner on a pilot",
    copy: [
      "We are working with early collaborators to test where confidential coordination is needed in practice.",
      "This includes:",
    ],
    bullets: [
      "onchain entities and governance frameworks",
      "privacy-focused applications",
      "research groups in secure computation",
      "teams working on agent coordination",
    ],
    outro: [
      "Participation at this stage is collaborative.",
      "The goal is to test assumptions, define system constraints, and identify meaningful deployments.",
    ],
    actions: [
      { label: "Reach out", href: "mailto:comms@gnosisguild.org", primary: true },
      { label: "Join Telegram", href: "https://t.me/enclave_e3", primary: false },
    ],
  },
];

const timelineItems = [
  "Invite-only testnet",
  "Initial operator cohort",
  "Mainnet Launch",
];

const actors = [
  ["Requesters", "Submitting programs"],
  ["Data providers", "Contributing encrypted inputs"],
  ["Ciphernode committees", "Coordinating Execution"],
];

const carouselSettings = {
  centerMode: true,
  centerPadding: "16px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  touchThreshold: 10,
};

function SectionLabel({ children, className = "text-[#687d71]" }: { children: string; className?: string }) {
  return (
    <p className={`font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.2] tracking-[1.2px] md:text-[14px] md:leading-[1.075] md:tracking-[1.4px] ${className}`}>
      {children}
    </p>
  );
}

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
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-[#121718] p-6 text-[#d9fce8]">
        <div className="shrink-0">
          <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
            {pathwayNumber}
          </span>
          <h2 className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[0.92] tracking-[-0.96px]">
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
              <a
                className={`flex h-[46px] w-full items-center justify-center rounded-[6px] px-4 font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] transition-colors hover:bg-[#3a5e3c] hover:text-[#82f5ad] ${
                  action.primary ? "bg-[#82f5ad] text-[#3a5e3c]" : "bg-[rgba(193,217,191,0.8)] text-[#3a5e3c]"
                }`}
                href={action.href}
                key={action.label}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ActorGlyph({ index }: { index: number }) {
  const iconClass = "h-11 w-12 overflow-visible";
  const accent = "#82f5ad";

  return (
    <div className="relative grid size-[72px] place-items-center rounded-full border border-[#3a5e3c]/20 bg-[#d9fce8] text-[#3a5e3c]">
      {index === 0 ? (
        <svg aria-hidden="true" className={iconClass} fill="none" focusable="false" viewBox="0 0 52.1 44.7">
          <path d="M9.55,14.55c-3.2,0-5.7,2.7-5.7,5.8s2.5,5.9,5.7,5.9,5.9-2.7,5.9-5.9-2.7-5.8-5.9-5.8Z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M9.65,28.65c-4.3,0-8.9,3.9-8.9,9.7v3.1h18.1v-3.1c0-5.8-4.9-9.7-9.2-9.7Z" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M23.25,11.45V3.65h23.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <rect height="22" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="21" x="23.25" y="11.45" />
          <polyline points="30.55 19.55 27.65 22.35 30.55 25.35" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="37.15 19.35 40.05 22.45 37.15 25.35" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="32.25" x2="35.35" y1="27.05" y2="17.65" />
          <circle cx="48.65" cy="3.45" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <path d="M44.25,33.25v7.8h-23.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="18.85" cy="41.25" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        </svg>
      ) : index === 1 ? (
        <svg aria-hidden="true" className={iconClass} fill="none" focusable="false" viewBox="0 0 61.4 54">
          <polyline points="46.05 18.05 32.05 18.05 32.05 35.15 48.55 35.15 48.55 18.05 46.05 18.05" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="13.65 7.2 23.65 7.2 32.05 18.05" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="14.1 46.55 24.1 46.55 32.05 35.15" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="13.65" x2="32.43" y1="26.15" y2="26.15" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="48.85" x2="57.85" y1="26.15" y2="26.15" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="40.45" x2="40.45" y1="4.95" y2="18.05" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="40.45" x2="40.45" y1="35.45" y2="47.95" />
          <rect fill={accent} height="5.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="5.4" x="37.85" y="23.45" />
          <circle cx="40.45" cy="3.65" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="40.45" cy="49.35" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="59.05" cy="26.15" fill={accent} r="1.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <rect height="12.9" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".75" y=".75" />
          <rect height="13.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".85" y="19.45" />
          <rect height="13.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="12.8" x=".85" y="39.85" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="22.95" y2="22.95" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="26.15" y2="26.15" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="29.35" y2="29.35" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="43.35" y2="43.35" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="46.55" y2="46.55" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="49.75" y2="49.75" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="4" y2="4" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="7.2" y2="7.2" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="3.65" x2="10.95" y1="10.4" y2="10.4" />
        </svg>
      ) : (
        <svg aria-hidden="true" className={iconClass} fill="none" focusable="false" viewBox="0 0 45.7 52.21">
          <polygon points="42.25 36.95 42.25 14.55 22.85 3.35 3.45 14.55 3.45 36.95 22.85 48.15 42.25 36.95" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="22.85" cy="48.76" fill="#d9fce8" r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="22.85" cy="3.35" fill={accent} r="2.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="3.45" cy="37.35" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="22.85" x2="22.85" y1="5.95" y2="13.35" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="22.85" x2="22.85" y1="38.66" y2="46.06" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="41.65" x2="33.65" y1="35.95" y2="31.65" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="5.45" x2="12.45" y1="36.05" y2="32.05" />
          <circle cx="42.25" cy="37.35" fill={accent} r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polygon points="33.65 31.99 33.65 19.51 22.85 13.28 12.05 19.51 12.05 31.99 22.85 38.22 33.65 31.99" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polygon fill={accent} points="28.35 30.85 17.95 30.85 17.95 20.35 28.25 20.35 28.35 30.85" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <polyline points="20.65 24.85 22.55 27.15 25.95 23.25" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="12.05" x2="3.45" y1="19.51" y2="14.55" />
          <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="33.65" x2="42.25" y1="19.51" y2="14.55" />
          <circle cx="3.45" cy="14.23" fill="#d9fce8" r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
          <circle cx="42.25" cy="14.23" fill="#d9fce8" r="2.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export function ParticipatePage() {
  const participationCarouselRef = useMobileCarouselOpacity();

  return (
    <div className="interfold-page-transition min-h-screen overflow-x-hidden bg-[#d9fce8] text-[#3a5e3c]">
      <main>
        <div className="interfold-hero-transition relative h-64 w-full overflow-hidden bg-white md:h-[min(44.444vw,640px)]">
          <img
            alt=""
            className="h-full w-full object-cover object-top md:hidden"
            src={imgHero}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full -translate-x-1/2 overflow-hidden bg-white md:block">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
              src={imgHero}
            />
          </div>
        </div>

        <section className="bg-white px-4 py-[64px] text-center md:py-[112px]">
          <div className="mx-auto flex max-w-md flex-col items-center gap-[24px] md:max-w-[760px]">
            <ScrollFadeIn className="w-full">
              <h1 className="font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.87] tracking-[-1.92px] md:text-[64px]">
                Participate
                <br />
                In the Network
              </h1>
            </ScrollFadeIn>
            <ScrollFadeIn className="flex w-full justify-center" delay={0.1}>
              <p className="w-full max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71] md:w-[382px] md:max-w-none md:text-[14px]">
                A system for confidential coordination. The network is forming ahead of public testnet. Different participants play different roles.
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#d9fce8] px-4 py-[64px] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[597.355px]">
              <SectionLabel>Overview</SectionLabel>
              <p className="mx-auto mt-[11.543px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:max-w-none md:text-[32px] md:leading-[0.92]">
                Interfold enables programs to run across encrypted inputs without exposing the data or concentrating execution in a single place.
              </p>
              <p className="mx-auto mt-8 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] md:max-w-none md:text-[14px]">
                This requires coordination between multiple actors:
              </p>
            </ScrollFadeIn>

            <div className="mx-auto mt-4 flex max-w-md flex-col items-center pt-4 min-[1100px]:mt-16 min-[1100px]:grid min-[1100px]:max-w-[1052px] min-[1100px]:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)] min-[1100px]:items-start min-[1100px]:pt-0">
              {actors.map(([title, body], index) => (
                <ScrollFadeIn className="flex w-full max-w-md flex-col items-center text-center min-[1100px]:max-w-none" key={title}>
                  <ActorGlyph index={index} />
                  <div className="flex min-w-0 flex-col items-center">
                    <p className="mt-4 max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] md:text-[32px] md:leading-[0.92] min-[1100px]:mt-6 min-[1100px]:max-w-md">
                      {title === "Ciphernode committees" ? (
                        <>
                          Ciphernode
                          <br className="min-[1100px]:hidden" />{" "}
                          committees
                        </>
                      ) : (
                        title
                      )}
                    </p>
                    <p className="mt-3 max-w-[320px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71] min-[1100px]:max-w-md min-[1100px]:text-[14px]">
                      {body}
                    </p>
                  </div>
                </ScrollFadeIn>
              )).flatMap((actor, index) => (
                index < actors.length - 1
                  ? [actor, <div aria-hidden="true" className="my-4 h-8 w-px bg-[#3a5e3c]/35 min-[1100px]:my-0 min-[1100px]:mt-8 min-[1100px]:h-px min-[1100px]:w-full min-[1100px]:bg-[#3a5e3c]/55" key={`connector-${index}`} />]
                  : [actor]
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#687d71] px-6 py-[64px] text-[#d9fce8] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto w-full max-w-md text-center md:max-w-[597.355px]">
              <SectionLabel className="text-[#d9fce8]">Participation pathways</SectionLabel>
              <p className="mx-auto mt-[11.543px] max-w-[320px] font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.72px] md:max-w-none md:text-[32px] md:leading-[1.02] md:tracking-[-0.96px]">
                Participation is not
                <br className="md:hidden" /> one-size-fits-all.
                <br />
                Each role has different responsibilities, constraints, and timelines.
              </p>
            </ScrollFadeIn>
            <div className="mobile-what-possible-carousel participation-pathways-carousel mx-auto mt-16 w-full max-w-md [&_.slick-slide>div]:h-full [&_.slick-slide]:h-auto [&_.slick-track]:items-stretch min-[1100px]:hidden" ref={participationCarouselRef}>
              <Slider {...carouselSettings}>
                {pathways.map((pathway) => (
                  <div className="h-full px-1.5" key={pathway.title}>
                    <ParticipationCard pathway={pathway} />
                  </div>
                ))}
              </Slider>
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

        <section className="bg-[#121718] px-4 py-[64px] text-[#82f5ad] md:py-[112px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="text-center">
              <ScrollFadeIn>
                <SectionLabel className="text-[#d9fce8]/55">What’s next</SectionLabel>
              </ScrollFadeIn>
              <ScrollFadeIn className="mx-auto mt-[11.543px] max-w-[320px] md:w-[597.355px] md:max-w-md">
                <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#82f5ad] md:text-[32px] md:leading-[0.92]">
                  The network is progressing toward:
                </p>
              </ScrollFadeIn>
              <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-4">
                <div className="absolute left-[calc(16.666%+36px)] right-[calc(50%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                <div className="absolute left-[calc(50%+36px)] right-[calc(16.666%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                {timelineItems.map((item, index) => {
                  const isActive = index === 0;

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
              </div>
              <ScrollFadeIn className="mx-auto mt-14 max-w-[320px] md:max-w-[760px]">
                <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad] md:text-[14px]">
                  Access will expand gradually as the system stabilizes.
                  <br />
                  This page will be updated as participation opens.
                </p>
              </ScrollFadeIn>
            </div>
          </div>
        </section>

        <section className="bg-[#687d71] px-4 py-[64px] text-center md:py-[112px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center">
            <ScrollFadeIn>
              <SectionLabel className="text-[#d9fce8]/70">Participate</SectionLabel>
            </ScrollFadeIn>
            <ScrollFadeIn className="mt-[11.543px] max-w-[320px] md:max-w-none">
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-[1.1] tracking-[-0.96px] text-[#d9fce8] md:text-[32px] md:leading-[0.92]">
                Help form the network
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn className="mt-4 max-w-[320px] md:max-w-[597.355px]" delay={0.1}>
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] leading-[1.075] text-[#d9fce8]">
                Run a ciphernode, build with Interfold, or explore a pilot for confidential coordination.
              </p>
            </ScrollFadeIn>
            <ScrollFadeIn className="mt-8 w-full max-w-[288px]">
              <a
                className="group flex h-[52px] w-full max-w-[288px] items-center justify-center bg-[#82f5ad] font-['ABC_Gramercy:Regular',sans-serif] text-[14.429px] capitalize leading-[1.075] text-[#3a5e3c] transition-colors hover:bg-[#3a5e3c] hover:text-[#82f5ad] md:w-[288px]"
                href="mailto:comms@gnosisguild.org"
              >
                Reach out
              </a>
            </ScrollFadeIn>
          </div>
        </section>
      </main>

      <DesktopFooter staticLayout />
    </div>
  );
}
