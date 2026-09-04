import { type ReactNode } from "react";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SectionLabel } from "./SectionLabel";
import { SectionNav } from "./SectionNav";

import ccDiagramAvif from "../../imports/Desktop/how-it-works-cc-diagram2.avif";
import ccDiagramWebp from "../../imports/Desktop/how-it-works-cc-diagram2.webp";
import distributedExecutionAvif from "../../imports/Desktop/how-it-works-diagram-distributed-execution.avif";
import distributedExecutionWebp from "../../imports/Desktop/how-it-works-diagram-distributed-execution.webp";
import dataTransformationAvif from "../../imports/Desktop/how-it-works-diagram-data-transformation.avif";
import dataTransformationWebp from "../../imports/Desktop/how-it-works-diagram-data-transformation.webp";
import phasesAvif from "../../imports/Desktop/how-it-works-phases.avif";
import phasesWebp from "../../imports/Desktop/how-it-works-phases.webp";

// TEMPORARY. Every word and every diagram here is lifted from the "How Interfold
// Works" page published at blog.theinterfold.com/how-interfold-works/ -- nothing
// was written or drawn for the site. It is here so the explainer the site
// already points at four times can live on the site itself.
//
// The blog page's own closing CTA is dropped: the homepage and /participate
// already carry the three participation paths. Its hero image is dropped too --
// this page has a title.
//
// Nothing links here yet. The four "How Interfold Works" buttons still point at
// the blog, so no two copies are competing. Flipping them is one edit, and it
// pairs with a 301 from the Ghost URL to this one, which is Ghost config rather
// than this repo.

const DIAGRAMS = {
  ccDiagram: { avif: ccDiagramAvif, webp: ccDiagramWebp, width: 1520, height: 854 },
  distributedExecution: { avif: distributedExecutionAvif, webp: distributedExecutionWebp, width: 1520, height: 854 },
  dataTransformation: { avif: dataTransformationAvif, webp: dataTransformationWebp, width: 1520, height: 746 },
  phases: { avif: phasesAvif, webp: phasesWebp, width: 1520, height: 1062 },
} as const;

type DiagramKey = keyof typeof DIAGRAMS;

type Block =
  | { type: "paragraph"; content: ReactNode }
  | { type: "list"; items: ReactNode[] }
  | { type: "figure"; diagram: DiagramKey; caption: string };

type Section = { number: string; slug: string; title: string; blocks: Block[] };

const paragraph = (content: ReactNode): Block => ({ type: "paragraph", content });
const list = (items: ReactNode[]): Block => ({ type: "list", items });
const figure = (diagram: DiagramKey, caption: string): Block => ({ type: "figure", diagram, caption });

const LEDE: Block[] = [
  paragraph("E3s, ciphernodes, and the five-phase flow that moves private inputs into shared, verifiable outcomes without concentrating execution authority in one place."),
  paragraph("Some systems become fragile when too much is visible."),
  paragraph("A sealed-bid auction can run publicly, but visible bids change how participants behave. A public vote can produce a tally, but traceable votes are easier to pressure, buy, or punish. Institutions can collaborate through shared data pools, but doing so often increases legal, strategic, and operational risk."),
  paragraph("These systems all depend on the same structure: private inputs, a process for combining them, and a shared outcome others can rely on. The bids, votes, records, preferences, or signals may be useful precisely because they remain private, but the result still has to be produced, verified, and released. The question is whether the process can produce a trusted result without concentrating control where the result is formed."),
  paragraph("The Interfold is a distributed network for confidential coordination. It allows independent parties to produce shared, verifiable outcomes from private inputs without pooling data, relying on trusted hardware, or giving one operator unilateral control over execution."),
  paragraph("In short: private inputs enter an E3 (Encrypted Execution Environment), ciphernodes enforce threshold conditions, verification makes the computation checkable, and only the permitted result is released."),
  paragraph("The system is easiest to understand through three elements: E3s, ciphernodes, and the five-phase flow that moves a computation from request to release."),
];

const SECTIONS: Section[] = [
  {
    number: "01",
    slug: "what-interfold-changes",
    title: "What Interfold changes",
    blocks: [
      paragraph("The Interfold distributes execution authority across a network."),
      paragraph("Most systems resolve sensitive coordination by placing one operator or environment in a privileged position: An exchange clears the auction. An administrator counts the votes. A platform runs the matching process. A data provider receives the records. A compute provider, enclave, or hosted runtime runs the analysis."),
      paragraph("That model can work. Public auctions, transparent votes, shared data pools, and hosted execution environments are all useful in the right context. But they introduce predictable risks: strategic adaptation, coercion, information leakage, operator advantage, or concentrated control over release."),
      paragraph("Encryption can protect inputs, but it does not automatically distribute control over how outcomes are produced. The issue is who controls the process that turns private inputs into a shared result."),
      paragraph("Even when inputs are encrypted and execution is secured, control can still concentrate in the environment where the outcome is formed:"),
      figure("ccDiagram", "Even when inputs are encrypted and execution is secured, control remains concentrated in a centralized execution environment."),
      paragraph("The Interfold separates that control across protocol-defined roles. Encrypted inputs enter a bounded execution surface. Independent operators enforce threshold conditions. Computation produces a result and a verifiable claim of correctness. Release requires distributed participation rather than unilateral control."),
      paragraph("The cryptography matters, but it is not what defines the system. FHE, MPC, and ZKPs help make the system possible, but they do not, by themselves, define who controls execution, verification, or release."),
      paragraph("Interfold’s core design question is the full path from private input to shared result:"),
      list([
        "who accepts inputs",
        "how computation is run",
        "how execution is verified",
        "who controls decryption",
        "who releases the result",
      ]),
      paragraph("The Interfold restructures that path with distributed authority."),
      figure("distributedExecution", "Trusted systems concentrate execution and release, while the Interfold distributes execution, verification, and release across the network."),
    ],
  },
  {
    number: "02",
    slug: "e3s",
    title: "E3s: ephemeral execution surfaces",
    blocks: [
      paragraph("An E3, or Encrypted Execution Environment, is an ephemeral, bounded execution surface created for one specific computation. It is not a permanent vault, a standing data pool, or a single trusted machine. It appears for a defined process – an auction, ballot, matching round, model evaluation, or analysis task – and closes when that process is complete."),
      paragraph("Within that window, the E3 receives encrypted inputs, runs defined program logic, supports verification, and enables threshold-governed release. The program might describe auction clearing rules, vote tallying logic, matching criteria, statistical aggregation, or another confidential coordination function."),
      paragraph("The important point is boundedness."),
      figure("dataTransformation", "Inputs remain encrypted through execution, and only the permitted output is decrypted at the end."),
      paragraph("A permanent execution environment (e.g. a Trusted Execution Environment) accumulates authority over time. It can become the place where state persists, access patterns repeat, and control over future outcomes quietly centralizes."),
      paragraph("An E3 is ephemeral by design. It exists for one computation, carries that computation through its lifecycle, releases the permitted result, and closes. The released result, proof, or anchored lifecycle event may remain available for verification, but the authority-bearing execution surface does not persist beyond the process it was created for."),
      paragraph("An E3 is the bounded surface where confidential coordination occurs: private inputs become a shared result without becoming a permanent pool of data."),
    ],
  },
  {
    number: "03",
    slug: "ciphernodes",
    title: "Ciphernodes: distributed enforcement",
    blocks: [
      paragraph("An E3 does not enforce itself."),
      paragraph("If bounded execution surfaces existed without distributed enforcement, control would simply move elsewhere in the system. The operator that controlled setup, decryption, or release would become the new point of trust."),
      paragraph("In the Interfold, that enforcement layer is carried by ciphernodes."),
      paragraph("Ciphernodes are independent operators in the Interfold network. For each computation, protocol rules form a committee from the broader operator set. Committee formation is network-governed rather than handpicked by a central operator."),
      paragraph("That committee participates in threshold-governed processes for the relevant E3, including:"),
      list([
        "distributed key generation",
        "threshold decryption",
        "coordination around the E3 lifecycle",
        "enforcement of network rules",
      ]),
      paragraph("Ciphernodes do not become trusted intermediaries. Their role is to make unilateral control impossible under the protocol’s threshold conditions. No single ciphernode can expose private inputs, decrypt outputs, determine results, control release, or alter defined computation logic on its own."),
      paragraph("This is the distinction between distributing work and distributing execution. A system can spread computation across many servers while control remains with one operator. That is not enough for confidential coordination."),
      paragraph("What matters is whether any single party can control the full path from input submission to release."),
      paragraph("The Interfold separates that path."),
    ],
  },
  {
    number: "04",
    slug: "five-phases",
    title: "From request to release: Interfold in 5 phases",
    blocks: [
      paragraph("The easiest way to understand the Interfold is to follow a computation from request to result."),
      paragraph("Consider a sealed-bid auction. The coordinator needs a winner or clearing price, but the bids themselves should remain private. The same lifecycle applies to ballots, matching, AI evaluation, and institutional analysis, but an auction makes the sequence easy to see."),
      paragraph("The execution pattern is consistent:"),
      figure("phases", "A confidential coordination lifecycle moves from request to threshold decryption, with the E3 serving as the ephemeral execution surface for encrypted inputs."),
      paragraph("The Interfold contracts coordinate the lifecycle between requesters, ciphernodes, data providers, compute providers, and outcome release. The E3 is the bounded execution surface for the computation, while the contracts coordinate how each phase is requested, formed, verified, and completed."),
      list([
        "Request: An auction coordinator requests an E3 for a specific auction. The request defines the auction rules, the computation to be run, and the conditions under which the result should be produced.",
        "Ciphernode selection: The network selects ciphernodes to form a committee for that E3. The committee participates in threshold-governed setup, including shared public key publication, so encrypted inputs can be submitted without giving any single operator control over decryption or release.",
        "Input window: Bidders submit encrypted bids to the E3. The bids can participate in the auction computation without becoming visible to other bidders, the coordinator, or any single operator.",
        "Execution: The E3 program runs over the encrypted bids. The program specifies how bids are evaluated and what result is permitted, such as a winner, clearing price, or allocation. The compute process produces a ciphertext output and can be checked against the auction rules without exposing the private bids underneath.",
        "Threshold decryption: Once the required verification and threshold conditions are satisfied, the permitted result can be released. Only what the auction is meant to reveal becomes shared: the winning bid, winning bidder, clearing price, or other defined result.",
      ]),
      paragraph("After release, the E3 closes. What remains is the released result and, where applicable, proof or anchored lifecycle events that allow the process to be verfied."),
      paragraph("The application changes. The execution pattern does not."),
    ],
  },
  {
    number: "05",
    slug: "the-network",
    title: "Why the ciphernode network is the system",
    blocks: [
      paragraph("The network is not an accessory to the Interfold. It is what prevents the system from collapsing back into custodial execution. If one operator controls input admission, runtime, verification, decryption, and release, then encryption may reduce what that operator can see, but it does not remove that operator’s control over the outcome path."),
      paragraph("The Interfold uses a different structure. Each part of the system has a role:"),
      list([
        "E3s bound the computation.",
        "Ciphernodes distribute enforcement.",
        "Ciphernode committees make authority computation-specific.",
        "Threshold conditions govern release.",
        "Verification makes results legible beyond the party that produced them.",
      ]),
      paragraph("Together, these mechanisms allow private inputs to become shared outcomes without passing through one trusted execution authority, opening a broad design space for confidential coordination: sealed-bid auctions, secret ballots, collaborative analysis, multi-agent coordination, and other systems where private information needs to produce a public or shared result."),
      paragraph("The Interfold does not eliminate institutions, governance, or real-world complexity. It changes the execution condition beneath them: shared outcomes can be produced without concentrating authority where the outcome is formed."),
      paragraph("That matters because visibility is not neutral. Public or receipt-generating versions of auctions, votes, matching, and data coordination can be useful, but they expose systems to different classes of attack. Private or receipt-free versions can be more resilient because participants have less information to exploit, prove, sell, or coerce."),
      paragraph("Confidential coordination is not only about hiding information. It is about changing who has authority when private inputs become shared outcomes."),
      paragraph("The Interfold implements that model as a distributed network: private inputs enter bounded encrypted execution, ciphernodes enforce threshold conditions, verification makes the result checkable, and only the permitted result is released."),
      paragraph("The result is a new execution pattern: private inputs, verifiable outcomes, and no single operator in control of the process."),
      paragraph("Participate in the Interfold networkA distributed network for confidential coordination."),
      paragraph("Run a ciphernode: Learn how operators participate in threshold enforcement and outcome release."),
      paragraph("Build on Interfold: Create applications that coordinate across private inputs and produce verifiable outcomes."),
      paragraph("Follow the Interfold: Track the network as it evolves, with updates, early use cases, and the emergence of a distributed system in practice."),
    ],
  },
];

// The diagrams are drawn on the site's own pale green, so the rounded corner is
// what turns each one into a card rather than a picture bleeding into the page.
// Same 24px the homepage cards use. width and height are set so the space is
// reserved before the image arrives and the text below does not jump.
function Diagram({ block }: { block: Extract<Block, { type: "figure" }> }) {
  const image = DIAGRAMS[block.diagram];

  return (
    <figure className="my-9">
      <picture>
        <source srcSet={image.avif} type="image/avif" />
        <img
          alt={block.caption}
          className="w-full rounded-[24px]"
          decoding="async"
          height={image.height}
          loading="lazy"
          src={image.webp}
          width={image.width}
        />
      </picture>
      {block.caption && (
        <figcaption className="mt-3 font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.38] tracking-[1.4px] text-[#687d71]">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "figure") {
          return <Diagram block={block} key={index} />;
        }

        if (block.type === "list") {
          return (
            <ul className="space-y-2 pl-5" key={index}>
              {block.items.map((item, itemIndex) => (
                <li className="list-disc pl-1 marker:text-[#82f5ad]" key={itemIndex}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{block.content}</p>;
      })}
    </>
  );
}

// Same row as the legal page's: numbered header, rule above, one measure. The
// two pages are the only long reads on the site, so they should not each invent
// their own shape.
function SectionRow({ section }: { section: Section }) {
  return (
    <article
      className="mx-auto max-w-[760px] scroll-mt-[63px] border-t border-[#3a5e3c]/25 py-10 md:py-14"
      id={section.slug}
    >
      <header className="mb-7">
        <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-none tracking-[1.4px] text-[#82f5ad] md:text-[14px]">
          {section.number}
        </span>
        <h2 className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[26px] leading-[1] tracking-[-0.78px] md:text-[30px]">
          {section.title}
        </h2>
      </header>
      <div className="space-y-5 font-['ABC_Gramercy:Regular',sans-serif] text-[17px] leading-[1.45] text-[#3a5e3c] md:text-[18px]">
        <Blocks blocks={section.blocks} />
      </div>
    </article>
  );
}

export function HowItWorksPage() {
  return (
    <div className="interfold-page-transition min-h-screen overflow-x-clip bg-white text-[#3a5e3c] md:pt-[63px]">
      <SectionNav sections={SECTIONS} />
      <main>
        <section className="scroll-mt-[63px] bg-white px-4 pb-[24px] pt-[20px] text-center md:px-8 md:pb-[32px] md:pt-[28px]" id="how-interfold-works">
          <ScrollFadeIn className="mx-auto max-w-[760px]">
            <SectionLabel>How it works</SectionLabel>
            <h1 className="mx-auto mt-[12px] max-w-[620px] font-['ABC_Gramercy:Regular',sans-serif] text-[40px] leading-[0.95] tracking-[-1.6px] md:text-[64px] md:tracking-[-2.56px]">
              How Interfold Works
            </h1>
          </ScrollFadeIn>
        </section>

        <section className="bg-white px-4 pb-[64px] pt-[32px] md:px-8 md:pb-[96px] md:pt-[48px]">
          <div className="mx-auto max-w-[1052px]">
            <ScrollFadeIn className="mx-auto max-w-[760px]">
              <div className="space-y-6 pb-16 font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.35] md:pb-24 md:text-[24px]">
                <Blocks blocks={LEDE} />
              </div>
            </ScrollFadeIn>

            {SECTIONS.map((section) => (
              <ScrollFadeIn key={section.number}>
                <SectionRow section={section} />
              </ScrollFadeIn>
            ))}
          </div>
        </section>
      </main>
      <DesktopFooter />
    </div>
  );
}
