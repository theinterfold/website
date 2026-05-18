import imgHero from "../../imports/Desktop/b2a665648dcdbaa537f982baed705f51f9563175.png";
import Slider from "react-slick";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { Header } from "./ContentPage";
import { ScrollFadeIn } from "./ScrollFadeIn";

const pathways = [
  {
    title: "01. Run a ciphernode",
    copy: [
      "Ciphernodes are operators in the network.",
      "They are selected into committees that execute encrypted programs as part of the protocol.",
      "Unlike traditional nodes:",
    ],
    bullets: [
      "operators do not see plaintext inputs",
      "operators do not control outcomes",
      "execution is distributed across multiple parties",
      "Waiting for Marv point.",
    ],
    outro: [
      "Responsibility is shared.",
      "No single node can reconstruct the data or unilaterally affect results.",
      "We are currently preparing the initial operator cohort ahead of invite-only testnet.",
    ],
    link: "Signal interest in operating a ciphernode",
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
    link: "Get in touch to build on Interfold",
  },
  {
    title: "03. Explore and collaborate",
    copy: [
      "We are working with early counterparties to define how these systems behave in practice.",
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
    link: "Reach out to collaborate",
  },
];

const timelineItems = [
  "Invite-only testnet",
  "Initial operator cohort",
  "Early application deployments",
];

const actors = [
  ["Requesters", "Submitting programs"],
  ["Data providers", "Contributing encrypted inputs"],
  ["Ciphernode operator committees", "Executing the computation"],
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
    <p className={`font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] ${className}`}>
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
        Explore and
        <br />
        collaborate
      </>
    ) : (
      pathwayTitle
    );

  return (
    <article className="flex h-full">
      <div className="flex min-h-[520px] w-full flex-col overflow-hidden rounded-[14px] bg-[#121718] text-[#d9fce8] shadow-[0_26px_70px_rgba(18,23,24,0.34),inset_0_0_90px_rgba(130,245,173,0.08)]">
        <div className="grid min-h-[128px] grid-cols-[30px_1fr] content-center items-baseline gap-1 bg-[#82f5ad] px-4 py-4 text-[#121718] md:min-h-[138px] md:grid-cols-[34px_1fr] md:px-5 md:py-5 min-[1100px]:min-h-[132px] min-[1100px]:grid-cols-[32px_1fr]">
          <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[20px] leading-none tracking-[1px]">
            {pathwayNumber}.
          </span>
          <h2 className="font-['ABC_Gramercy:Regular',sans-serif] text-[44px] leading-[0.82] tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] min-[1100px]:text-[44px] min-[1100px]:tracking-[-1.32px] xl:text-[48px] xl:tracking-[-1.44px]">
            {formattedTitle}
          </h2>
        </div>
        <div className="flex flex-1 flex-col px-6 py-8 md:px-8 md:py-9">
          <div className="min-h-[210px] space-y-2 font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.075] tracking-[-0.66px]">
            {pathway.copy.slice(0, -1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div>
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.075] tracking-[-0.66px]">
              {pathway.copy[pathway.copy.length - 1]}
            </p>
            <div className="my-7 h-px bg-[#d9fce8]/25" />
            <ul className="space-y-6">
              {pathway.bullets.map((bullet) => (
                <li className="grid grid-cols-[12px_1fr] gap-5" key={bullet}>
                  <span className="mt-[5px] size-[10px] bg-[#82f5ad]" />
                  <span className="whitespace-pre-line font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.38] tracking-[2.4px] text-[#d9fce8]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function ActorGlyph({ index }: { index: number }) {
  return (
    <div className="relative grid size-[72px] place-items-center rounded-full border border-[#bde7ce] bg-[#eafff2] text-[#3a5e3c]">
      {index === 0 ? (
        <div className="h-8 w-6 border-2 border-current">
          <div className="mx-auto mt-2 h-[2px] w-3 bg-current" />
          <div className="mx-auto mt-2 h-[2px] w-3 bg-current" />
        </div>
      ) : index === 1 ? (
        <div className="relative size-9">
          <span className="absolute left-0 top-0 size-[14px] border-2 border-current" />
          <span className="absolute right-0 top-0 size-[14px] border-2 border-current" />
          <span className="absolute bottom-0 left-1/2 size-[14px] -translate-x-1/2 border-2 border-current" />
          <span className="absolute left-[17px] top-[14px] h-3 w-[2px] bg-current" />
        </div>
      ) : (
        <div className="relative size-10">
          <span className="absolute left-1/2 top-0 size-[10px] -translate-x-1/2 rounded-full border-2 border-current bg-[#eafff2]" />
          <span className="absolute bottom-0 left-0 size-[10px] rounded-full border-2 border-current bg-[#eafff2]" />
          <span className="absolute bottom-0 right-0 size-[10px] rounded-full border-2 border-current bg-[#eafff2]" />
          <span className="absolute left-[19px] top-[10px] h-[22px] w-[2px] bg-current" />
          <span className="absolute bottom-[8px] left-[8px] h-[2px] w-6 bg-current" />
        </div>
      )}
    </div>
  );
}

export function ParticipatePage() {
  return (
    <div className="min-h-screen bg-[#d9fce8] text-[#3a5e3c]">
      <Header />

      <main>
        <div className="relative aspect-[1440/430] w-full overflow-hidden bg-[#d9fce8]">
          <img
            alt=""
            className="h-full w-full object-cover object-center mix-blend-darken"
            src={imgHero}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,252,232,0.72),rgba(217,252,232,0.1)_42%,rgba(217,252,232,0)_68%)]" />
        </div>

        <section className="bg-white px-6 py-[64px] text-center md:py-[112px]">
          <ScrollFadeIn className="mx-auto flex max-w-[760px] flex-col items-center gap-6">
            <h1 className="font-['ABC_Gramercy:Regular',sans-serif] text-[48px] capitalize leading-[0.87] tracking-[-1.44px] md:text-[76px] md:tracking-[-2.28px]">
              Participate in the network
            </h1>
            <p className="max-w-[560px] font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
              Interfold is a system for confidential coordination.
              <br />
              The network is forming ahead of public testnet.
              <br />
              Different participants play different roles.
            </p>
          </ScrollFadeIn>
        </section>

        <section className="bg-[#d9fce8] px-6 py-[64px] md:py-[112px]">
          <ScrollFadeIn className="mx-auto max-w-[1052px]">
            <div className="mx-auto max-w-[760px] text-center">
              <SectionLabel>Overview</SectionLabel>
              <p className="mt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[1.02] tracking-[-0.96px]">
                Interfold enables programs to run across encrypted inputs without exposing the data or concentrating execution in a single place.
              </p>
              <p className="mt-8 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.45] tracking-[1.1px]">
                This requires coordination between multiple actors:
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start">
              {actors.map(([title, body], index) => (
                <div className="flex flex-col items-center text-center" key={title}>
                  <ActorGlyph index={index} />
                  <p className="mt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[1.02] tracking-[-0.96px]">
                    {title}
                  </p>
                  <p className="mt-3 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.25] tracking-[1.4px] text-[#687d71]">
                    {body}
                  </p>
                </div>
              )).flatMap((actor, index) => (
                index < actors.length - 1
                  ? [actor, <div aria-hidden="true" className="mt-[36px] hidden h-[2px] w-[150px] border-t-2 border-dotted border-[#3a5e3c] md:block" key={`connector-${index}`} />]
                  : [actor]
              ))}
            </div>
          </ScrollFadeIn>
        </section>

        <section className="bg-[#687d71] px-6 py-[64px] text-[#d9fce8] md:py-[112px]">
          <ScrollFadeIn className="mx-auto max-w-[1052px]">
            <div className="mx-auto max-w-[856px] text-center">
              <SectionLabel className="text-[#d9fce8]">Participation pathways</SectionLabel>
              <p className="mt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[1.02] tracking-[-0.96px]">
                Participation is not one-size-fits-all.
                <br />
                Each role has different responsibilities, constraints, and timelines.
              </p>
            </div>
            <div className="mobile-what-possible-carousel participation-pathways-carousel mx-auto mt-16 w-full max-w-md min-[1100px]:hidden">
              <Slider {...carouselSettings}>
                {pathways.map((pathway) => (
                  <div className="px-1.5" key={pathway.title}>
                    <ParticipationCard pathway={pathway} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mt-16 hidden grid-cols-3 gap-4 min-[1100px]:grid">
              {pathways.map((pathway) => (
                <ParticipationCard key={pathway.title} pathway={pathway} />
              ))}
            </div>
            <div className="mt-16 grid gap-10 min-[1100px]:grid-cols-3 min-[1100px]:gap-4">
              {pathways.map((pathway) => (
                <div className="space-y-4 border-t border-[#d9fce8]/35 pt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.075] tracking-[-0.6px]" key={`${pathway.title}-support`}>
                  {pathway.outro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </ScrollFadeIn>
        </section>

        <section className="bg-[#121718] px-6 py-[64px] text-[#82f5ad] md:py-[112px]">
          <ScrollFadeIn className="mx-auto max-w-[1052px]">
            <div className="text-center">
              <SectionLabel className="text-[#d9fce8]/55">What’s next</SectionLabel>
              <p className="mx-auto mt-5 max-w-[560px] font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[1.02] tracking-[-0.96px] text-[#82f5ad]">
                The network is progressing toward:
              </p>
              <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-4">
                <div className="absolute left-[calc(16.666%+36px)] right-[calc(50%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                <div className="absolute left-[calc(50%+36px)] right-[calc(16.666%+36px)] top-5 hidden border-t border-dotted border-[#687d71] md:block" />
                {timelineItems.map((item, index) => {
                  const isActive = index === 0;

                  return (
                    <div className="relative flex flex-col items-center" key={item}>
                      <span className={`relative z-10 grid size-10 place-items-center font-['Office_Code_Pro:Medium',sans-serif] text-[13px] leading-none tracking-[0.8px] ${isActive ? "bg-[#82f5ad] text-[#121718] shadow-[0_0_24px_rgba(130,245,173,0.22)]" : "bg-[#687d71] text-[#121718]"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`mt-4 block size-3 rounded-full ${isActive ? "bg-[#82f5ad]" : "bg-[#687d71]"}`} />
                      <span className={`mt-3 h-8 w-px ${isActive ? "bg-[#82f5ad]/60" : "bg-[#687d71]"}`} />
                      <p className={`mt-4 max-w-[230px] font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.25] tracking-[1.4px] ${isActive ? "text-[#d9fce8]" : "text-[#d9fce8]/55"}`}>
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="mx-auto mt-14 max-w-[680px] font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.45] tracking-[1.1px] text-[#82f5ad]">
                Access will expand gradually as the system stabilizes.
                <br />
                This page will be updated as participation opens.
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        <section className="bg-[#687d71] px-6 py-[64px] text-center md:py-[112px]">
          <ScrollFadeIn className="mx-auto flex max-w-[760px] flex-col items-center gap-8">
            <SectionLabel className="text-[#d9fce8]/70">Participate</SectionLabel>
            <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[32px] leading-[1.02] tracking-[-0.96px] text-[#d9fce8]">
              If you’re interested in participating, reach out or signal interest.
            </p>
            <a
              className="group flex h-[52px] w-full max-w-[288px] items-center justify-center bg-[#82f5ad] font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.075] text-[#3a5e3c] transition-colors hover:bg-[#d9fce8]"
              href="mailto:[ADD_EMAIL_HERE]?subject=Interfold%20participation%20interest"
            >
              Reach out
            </a>
          </ScrollFadeIn>
        </section>
      </main>

      <DesktopFooter staticLayout />
    </div>
  );
}
