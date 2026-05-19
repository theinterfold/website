import svgPaths from "../../imports/Desktop/svg-coxcrzwjvg";
import imgSignal from "../../imports/Desktop/a80fa66d44b0ff61c570b989d6fb551d46380225.png";
import imgNetwork from "../../imports/Desktop/2ed5559bf52ac38f0d906307f0ed5c48d52a224a.png";
import imgMesh from "../../imports/Desktop/5358f3e3b9a49f0d5d69994ddaa8f725c44612c4.png";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { motion } from "motion/react";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SiteMobileHeader } from "./SiteMobileHeader";

type PageKey = "community" | "protocol" | "docs";

type PageData = {
  eyebrow: string;
  title: string;
  intro: string;
  darkLabel: string;
  darkTitle: string;
  darkCopy: string;
  pillars: Array<{
    number: string;
    title: string;
    body: string;
  }>;
};

const pages: Record<PageKey, PageData> = {
  community: {
    eyebrow: "Community",
    title: "A place for builders, ciphernodes, and researchers to test confidential coordination in public.",
    intro:
      "Interfold is not only a protocol surface. It is a coordination practice: people learning how private inputs, distributed operators, and verifiable outcomes behave when they meet real applications.",
    darkLabel: "Participate",
    darkTitle: "Community work starts where the protocol becomes concrete.",
    darkCopy:
      "Run experiments, pressure-test assumptions, shape operator norms, and help make encrypted execution legible to the next wave of builders.",
    pillars: [
      {
        number: "01",
        title: "Builders",
        body: "Turn sealed auctions, voting, private AI workflows, and multiparty systems into working product paths.",
      },
      {
        number: "02",
        title: "Ciphernodes",
        body: "Prepare to distribute execution authority and govern outcome release as part of a live network.",
      },
      {
        number: "03",
        title: "Researchers",
        body: "Interrogate the trust model, incentives, security assumptions, and language around confidential coordination.",
      },
    ],
  },
  protocol: {
    eyebrow: "Protocol",
    title: "Private inputs enter encrypted execution. Public outcomes leave with verification.",
    intro:
      "The Interfold is a protocol pattern for confidential coordination: users keep inputs private, ciphernodes share execution responsibility, and applications receive outcomes that can be checked.",
    darkLabel: "Execution model",
    darkTitle: "The protocol replaces a single trusted operator with distributed authority over encrypted execution environments.",
    darkCopy:
      "Instead of revealing data to a coordinator, participants route private inputs through a threshold-operated execution layer designed to release only the agreed result.",
    pillars: [
      {
        number: "01",
        title: "Input privacy",
        body: "Participants submit sensitive data without exposing it to the application operator.",
      },
      {
        number: "02",
        title: "Threshold control",
        body: "Ciphernodes coordinate execution and govern when an outcome can be produced.",
      },
      {
        number: "03",
        title: "Outcome release",
        body: "Applications consume shared results while preserving the privacy of the underlying inputs.",
      },
    ],
  },
  docs: {
    eyebrow: "Docs",
    title: "A reading room for the protocol, the blog, and the pieces builders need next.",
    intro:
      "Docs should feel like a clean index, not a maze: start with the concept, move into protocol mechanics, then find the application or operator material you need.",
    darkLabel: "Library",
    darkTitle: "Read the system from three angles: story, protocol, and implementation.",
    darkCopy:
      "Some entries are essays, some are internal pages, and some are guides that can become fuller documentation as the network matures.",
    pillars: [
      {
        number: "01",
        title: "Start",
        body: "Understand why confidential coordination exists and how Interfold frames the problem.",
      },
      {
        number: "02",
        title: "Build",
        body: "Use the protocol and application notes as the path toward a concrete integration.",
      },
      {
        number: "03",
        title: "Operate",
        body: "Collect the assumptions and responsibilities that matter for ciphernodes and testnets.",
      },
    ],
  },
};

const docsRows = [
  {
    label: "Essay",
    title: "From Enclave to The Interfold",
    href: "https://blog.theinterfold.com/from-enclave-to-the-interfold/",
    detail: "The origin story and thesis for moving beyond a single enclave.",
  },
  {
    label: "Page",
    title: "Protocol overview",
    href: "/protocol",
    detail: "Private inputs, ciphernodes, encrypted execution, and outcome release.",
  },
  {
    label: "Page",
    title: "Community",
    href: "/community",
    detail: "How builders, operators, and researchers can participate.",
  },
  {
    label: "Website",
    title: "A new execution model",
    href: "/#execution-model",
    detail: "The homepage explanation of confidential inputs and verifiable outcomes.",
  },
  {
    label: "Guide",
    title: "Application patterns",
    href: "/docs#application-patterns",
    detail: "Sealed auctions, private governance, collaborative intelligence, and shared computation.",
  },
  {
    label: "Guide",
    title: "Ciphernodes and operators",
    href: "/docs#operators",
    detail: "Responsibilities, threshold assumptions, testing, and release discipline.",
  },
];

function Wordmark() {
  return (
    <svg className="block h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.421 17.239">
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
  );
}

function Mark() {
  return (
    <svg className="block h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.5891 37.1196">
      <path d={svgPaths.p2c3ef4f0} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p18d4bac0} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p79ece00} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p3c15f980} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.pd580300} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p3e19a800} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p3fc0d800} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
      <path d={svgPaths.p1f4a0a00} stroke="#3A5E3C" strokeLinejoin="bevel" strokeWidth="2.88577" />
    </svg>
  );
}

export function Header({
  activePath = "",
  animateOpening = false,
  backgroundClassName = "bg-[#d9fce8]",
  desktopPositionClassName = "md:sticky md:top-0",
  showDesktop = true,
  showMobile = true,
}: {
  activePath?: string;
  animateOpening?: boolean;
  backgroundClassName?: string;
  desktopPositionClassName?: string;
  showDesktop?: boolean;
  showMobile?: boolean;
}) {
  const BrandLink = animateOpening ? motion.a : "a";
  const MarkLink = animateOpening ? motion.a : "a";
  const NavLink = animateOpening ? motion.a : "a";
  const openingMotion = (delay: number) => animateOpening
    ? {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: -6 },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {};
  const navLinkClass = "transition-colors hover:text-[#82f5ad]";
  const externalNavLinkClass = "group inline-flex items-baseline gap-1 transition-colors hover:text-[#82f5ad]";
  const participateLinkClass = `${navLinkClass} ${activePath === "participate" ? "underline decoration-[1px] underline-offset-[5px]" : ""}`;

  return (
    <>
      {showMobile && <SiteMobileHeader backgroundClassName={backgroundClassName} className="md:hidden" />}
      {showDesktop && (
        <header className={`interfold-header-transition ${animateOpening ? "interfold-header-drop" : ""} ${desktopPositionClassName} z-50 hidden h-[63px] w-full ${backgroundClassName} transition-colors duration-300 md:block`}>
          <div className="relative mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-6">
            <BrandLink
              aria-label="The Interfold home"
              className={animateOpening ? "justify-self-start capitalize font-['ABC_Gramercy:Regular',sans-serif] leading-[1.05] not-italic text-[#3a5e3c] text-[18px] md:text-[22px] tracking-[-0.66px] whitespace-nowrap transition-colors hover:text-[#82f5ad]" : "h-[17.239px] w-[120.421px] justify-self-start"}
              href="/"
              style={animateOpening ? { fontFeatureSettings: '"liga" 1, "clig" 1', fontVariantLigatures: "common-ligatures" } : undefined}
              {...openingMotion(0.75)}
            >
              {animateOpening ? "The Interfold" : <Wordmark />}
            </BrandLink>
            <MarkLink aria-label="The Interfold home" className="h-[35.071px] w-[45.703px] justify-self-center" href="/" {...openingMotion(0.85)}>
              <Mark />
            </MarkLink>
            <nav className="hidden justify-self-end gap-8 font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.05] tracking-[-0.66px] text-[#3a5e3c] md:flex">
              <NavLink className={externalNavLinkClass} href="https://docs.theinterfold.com/" {...openingMotion(0.95)}>
                <span>Docs</span>
                <span aria-hidden="true" className="text-[14px] leading-none">↗</span>
              </NavLink>
              <NavLink className={externalNavLinkClass} href="https://blog.theinterfold.com/" {...openingMotion(1.05)}>
                <span>Blog</span>
                <span aria-hidden="true" className="text-[14px] leading-none">↗</span>
              </NavLink>
              <NavLink aria-current={activePath === "participate" ? "page" : undefined} className={participateLinkClass} href="/participate" {...openingMotion(1.15)}>Participate</NavLink>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#d9fce8]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-12 md:grid-cols-[1fr_1fr] md:px-6">
        <div className="flex min-h-[240px] flex-col justify-between">
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[40px] capitalize leading-[0.87] tracking-[-1.92px] text-[#3a5e3c] md:text-[64px]">
            The Interfold
          </p>
          <div className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#3a5e3c]">
            <p className="mb-0">privacy</p>
            <p className="mb-0">Terms & Conditions</p>
            <p>All Rights Reserved © 2026</p>
          </div>
        </div>
        <div className="flex min-h-[240px] flex-col justify-between md:pl-2">
          <div>
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#252525]">
              Follow us
            </p>
            <div className="mt-3 font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#3a5e3c]">
              <a className="block transition-colors hover:text-[#82f5ad]" href="https://t.me/enclave_e3" rel="noreferrer" target="_blank">Telegram</a>
              <a className="block transition-colors hover:text-[#82f5ad]" href="https://github.com/gnosisguild/enclave/" rel="noreferrer" target="_blank">Github</a>
              <a className="block transition-colors hover:text-[#82f5ad]" href="https://x.com/theinterfold" rel="noreferrer" target="_blank">X</a>
            </div>
          </div>
          <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#3a5e3c]">
            Open source protocol.
            <br />
            Built by Gnosis Guild.
          </p>
        </div>
      </div>
    </footer>
  );
}

function CommunityGraphic() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[1052px] overflow-hidden rounded-[32px] bg-[#121718]">
      <img alt="" className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-70 mix-blend-plus-lighter md:w-[64%]" src={imgSignal} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(130,245,173,0.22),transparent_34%),linear-gradient(90deg,#121718_0%,rgba(18,23,24,0.92)_42%,rgba(18,23,24,0.2)_100%)]" />
      <div className="relative flex h-full max-w-[460px] flex-col justify-between p-6 md:p-8">
        <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
          live network
        </p>
        <div>
          <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[44px] leading-[0.92] tracking-[-1.2px] text-[#d9fce8]">
            Come in through the work.
          </p>
          <p className="mt-5 font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.075] text-[#d9fce8]">
            Build, operate, write, test, and make the trust model easier for the next person to understand.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProtocolGraphic() {
  const lines = [40, 70, 100, 130, 160, 190, 220];

  return (
    <div className="mx-auto w-full max-w-[1052px] overflow-hidden rounded-[32px] bg-white px-4 py-10 md:px-10">
      <svg className="h-auto w-full" fill="none" viewBox="0 0 980 360">
        <rect fill="#D9FCE8" height="360" rx="28" width="980" />
        <circle cx="160" cy="180" fill="#121718" r="82" />
        <circle cx="820" cy="180" fill="#82F5AD" r="82" />
        <rect fill="#3A5E3C" height="68" rx="8" width="118" x="431" y="146" />
        <text fill="#D9FCE8" fontFamily="Office Code Pro" fontSize="19" letterSpacing="2" x="456" y="187">E3</text>
        {lines.map((y, index) => (
          <path
            d={`M160 ${y + 40} C310 ${y + 40}, 330 ${180 + (index - 3) * 12}, 431 ${180 + (index - 3) * 12} L549 ${180 + (index - 3) * 12} C650 ${180 + (index - 3) * 12}, 670 ${y + 40}, 820 ${y + 40}`}
            key={y}
            stroke={index === 3 ? "#00FF88" : "#252525"}
            strokeWidth="3"
          />
        ))}
        <text fill="#D9FCE8" fontFamily="ABC Gramercy" fontSize="28" x="104" y="184">Inputs</text>
        <text fill="#3A5E3C" fontFamily="ABC Gramercy" fontSize="28" x="758" y="184">Outcome</text>
      </svg>
    </div>
  );
}

function DocsGraphic() {
  return (
    <div className="mx-auto grid w-full max-w-[1052px] gap-4 md:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[32px] bg-[#121718] p-6 text-[#d9fce8] md:p-8">
        <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#82f5ad]">
          index
        </p>
        <p className="mt-20 font-['ABC_Gramercy:Regular',sans-serif] text-[44px] leading-[0.92] tracking-[-1.2px]">
          The docs page should behave like a reading table.
        </p>
        <p className="mt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.075]">
          Essays, protocol pages, homepage sections, and future guides can sit together without pretending they are the same type of thing.
        </p>
      </div>
      <div className="overflow-hidden rounded-[32px] bg-white">
        {docsRows.map((row) => (
          <a
            className="grid gap-3 border-b border-[#3a5e3c] px-4 py-5 text-[#3a5e3c] transition-colors last:border-b-0 hover:bg-[#d9fce8] md:grid-cols-[120px_1fr_24px] md:px-6"
            href={row.href}
            key={row.title}
            rel={row.href.startsWith("http") ? "noreferrer" : undefined}
            target={row.href.startsWith("http") ? "_blank" : undefined}
          >
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
              {row.label}
            </p>
            <div>
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[28px] leading-[0.92] tracking-[-0.7px]">
                {row.title}
              </p>
              <p className="mt-2 font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.075]">
                {row.detail}
              </p>
            </div>
            <span className="font-['ABC_Gramercy:Regular',sans-serif] text-[24px] leading-none">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function PageGraphic({ page }: { page: PageKey }) {
  if (page === "community") {
    return <CommunityGraphic />;
  }

  if (page === "docs") {
    return <DocsGraphic />;
  }

  return <ProtocolGraphic />;
}

function PillarGrid({ data }: { data: PageData }) {
  return (
    <section id="start" className="bg-white px-4 py-[96px] md:px-6 md:py-[112px]">
      <div className="mx-auto grid max-w-[1052px] grid-cols-1 gap-4 md:grid-cols-3">
        {data.pillars.map((pillar, index) => (
          <ScrollFadeIn key={pillar.number} delay={index * 0.1}>
            <article className="flex h-full flex-col gap-4 bg-white">
              <div className="h-[3px] w-full bg-[#3a5e3c]" />
              <div className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px]">
                <p className="mb-0 text-[#3a5e3c]">{pillar.number}</p>
                <p className="mb-0 text-[#252525]">{pillar.title}</p>
              </div>
              <p className="font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.075] text-[#3a5e3c]">
                {pillar.body}
              </p>
            </article>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}

function DocsLists() {
  return (
    <section className="bg-[#d9fce8] px-4 py-[96px] md:px-6 md:py-[112px]">
      <div className="mx-auto grid max-w-[1052px] gap-16 md:grid-cols-2">
        <ScrollFadeIn>
          <div id="application-patterns">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
              Application patterns
            </p>
            <ul className="mt-6 border-t border-[#3a5e3c] font-['ABC_Gramercy:Regular',sans-serif] text-[28px] leading-[1.05] text-[#3a5e3c]">
              {["Sealed auctions", "Private governance", "Collaborative intelligence", "Shared computation"].map((item) => (
                <li className="border-b border-[#3a5e3c] py-4" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.1}>
          <div id="operators">
            <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
              Operator notes
            </p>
            <ul className="mt-6 border-t border-[#3a5e3c] font-['ABC_Gramercy:Regular',sans-serif] text-[28px] leading-[1.05] text-[#3a5e3c]">
              {["Ciphernodes", "Threshold assumptions", "Testnet readiness", "Outcome release"].map((item) => (
                <li className="border-b border-[#3a5e3c] py-4" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

function FollowOnSection({ page }: { page: PageKey }) {
  if (page === "docs") {
    return <DocsLists />;
  }

  const isCommunity = page === "community";

  return (
    <section className="bg-[#d9fce8] px-4 py-[96px] md:px-6 md:py-[112px]">
      <div className="mx-auto grid max-w-[1052px] gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <ScrollFadeIn>
          <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
            {isCommunity ? "Next gathering point" : "Protocol surface"}
          </p>
          <h2 className="mt-4 font-['ABC_Gramercy:Regular',sans-serif] text-[48px] leading-[0.92] tracking-[-1.2px] text-[#3a5e3c] md:text-[64px]">
            {isCommunity ? "A network forms through repeated, useful participation." : "The primitive stays small. The applications can become wide."}
          </h2>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.1}>
          <div className="overflow-hidden rounded-[28px] bg-[#121718]">
            <img
              alt=""
              className="h-[420px] w-full object-cover opacity-90 mix-blend-plus-lighter"
              src={isCommunity ? imgMesh : imgNetwork}
            />
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

export function ContentPage({ page }: { page: PageKey }) {
  const data = pages[page];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d9fce8]">
      <Header animateOpening />

      <main>
        <section className="bg-[#d9fce8] px-4 py-[88px] md:px-6 md:py-[112px]">
          <div className="mx-auto flex max-w-[1052px] flex-col items-center text-center">
            <ScrollFadeIn>
              <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71]">
                {data.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[980px] font-['ABC_Gramercy:Regular',sans-serif] text-[44px] leading-[0.92] tracking-[-1.92px] text-[#3a5e3c] md:text-[72px]">
                {data.title}
              </h1>
              <p className="mx-auto mt-8 max-w-[720px] font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.075] tracking-[-0.45px] text-[#3a5e3c] md:text-[28px]">
                {data.intro}
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="bg-[#d9fce8] px-4 pb-[96px] md:px-6 md:pb-[112px]">
          <ScrollFadeIn delay={0.1}>
            <PageGraphic page={page} />
          </ScrollFadeIn>
        </section>

        <section className="bg-[#121718] px-4 py-[96px] text-center md:px-6 md:py-[128px]">
          <ScrollFadeIn>
            <div className="mx-auto max-w-[860px]">
              <p className="font-['Office_Code_Pro:Medium',sans-serif] text-[14px] uppercase leading-[1.075] tracking-[1.4px] text-[#d9fce8]">
                {data.darkLabel}
              </p>
              <h2 className="mt-4 font-['ABC_Gramercy:Regular',sans-serif] text-[38px] leading-[0.92] tracking-[-1.2px] text-[#d9fce8] md:text-[56px]">
                {data.darkTitle}
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] font-['ABC_Gramercy:Regular',sans-serif] text-[22px] leading-[1.075] tracking-[-0.4px] text-[#d9fce8]">
                {data.darkCopy}
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        <PillarGrid data={data} />
        <FollowOnSection page={page} />
      </main>

      <DesktopFooter staticLayout />
    </div>
  );
}
