import { useEffect, type ReactNode } from "react";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { UnderlinedArrowLink } from "./HoverArrowLink";
import { ScrollFadeIn } from "./ScrollFadeIn";
import { SectionLabel } from "./SectionLabel";

type LegalBlock =
  | { type: "paragraph"; content: ReactNode }
  | { type: "list"; items: ReactNode[] }
  | { type: "subheading"; content: ReactNode };

type LegalSection = {
  number: string;
  title: string;
  blocks: LegalBlock[];
};

// Where a paragraph replaced earlier wording, the previous text is recorded in a
// `// Was:` comment directly above it. Comments only — a string literal would be
// shipped in the production bundle.
const paragraph = (content: ReactNode): LegalBlock => ({ type: "paragraph", content });
const list = (items: ReactNode[]): LegalBlock => ({ type: "list", items });
const subheading = (content: ReactNode): LegalBlock => ({ type: "subheading", content });

const termsSections: LegalSection[] = [
  {
    number: "01",
    title: "Purpose of FOLD",
    blocks: [
      paragraph("FOLD supports participation, coordination, and governance within the Interfold network."),
      paragraph(
        "The Interfold is a distributed network for confidential coordination. It lets companies, institutions, and communities compute together, even in competitive or adversarial settings: each party keeps its inputs private, while everyone can verify the result is correct.",
      ),
      paragraph("Within the network, FOLD supports:"),
      list(["ciphernode bonding;", "E3 request economics;", "operator rewards; and", "governance."]),
      paragraph(
        "FOLD is intended to support use of and participation in the Interfold network. FOLD does not represent or confer any ownership right, equity interest, revenue share, profit share, claim on assets, intellectual property right, or other financial interest in Interfold Ltd., The Interfold Foundation, Gnosis Guild, the Interfold network, or any related entity.",
      ),
    ],
  },
  {
    number: "02",
    title: "Scope of These Terms",
    blocks: [
      paragraph(
        "Use of the Interfold network, ciphernode operation, governance participation, third-party interfaces, wallets, and other services may be subject to additional terms, rules, requirements, or technical limitations.",
      ),
    ],
  },
  {
    number: "03",
    title: "Order of Precedence",
    blocks: [
      paragraph(
        "If there is any conflict between these Terms and any blog post, social media post, community message, FAQ, documentation page, or other explanatory material, these Terms control in respect of the conflicted issue, unless expressly stated otherwise.",
      ),
      paragraph(
        "Auction smart contracts and the official Uniswap auction interface may impose additional technical limitations or requirements.",
      ),
      paragraph(
        "If there is any difference between explanatory materials and the behavior of the official Uniswap auction interface or auction smart contracts, the official interface and smart contracts will control, subject to applicable law.",
      ),
    ],
  },
  {
    number: "04",
    title: "Auction Overview",
    blocks: [
      // Was: "The initial auction distribution of FOLD will take place through a
      // Uniswap Continuous Clearing Auction."
      paragraph("FOLD Auction 2 will take place through a Uniswap Continuous Clearing Auction."),
      paragraph("The expected auction sequence is:"),
      list([
        <><strong>Aug 17 at ~14:06 UTC (~10:06 AM ET):</strong> FOLD Auction 2 opens;</>,
        <><strong>Aug 19 at ~13:06 UTC (~9:06 AM ET):</strong> FOLD Auction 2 closes;</>,
        <><strong>Aug 19 at 14:00 UTC (10 AM ET):</strong> general FOLD transferability can be enabled; and</>,
        <><strong>Aug 19 at ~14:11 UTC (~10:11 AM ET):</strong> claiming is expected to become available.</>,
      ]),
      // Was: "The auction, TGE, and Network Alpha are separate milestones. The
      // auction is a token distribution event. TGE is expected to correspond with
      // the beginning of general token transferability. Network Alpha is the
      // staged rollout of the Interfold network itself."
      paragraph(
        "FOLD Auction 2, general FOLD transferability, and Network Alpha are separate milestones within the broader Interfold launch sequence.",
      ),
      // Both paragraphs below are new in Auction 2 — there was no equivalent.
      paragraph(
        "FOLD Auction 2 is limited to 2% of total FOLD supply, is denominated in USDC, and has a floor of 0.02154816 USDC / FOLD.",
      ),
      paragraph("50% of Auction 2 proceeds will be dedicated to long-term onchain liquidity support."),
      paragraph(
        "Any dates or timelines are expected dates only and may change due to technical, operational, legal, security, or other conditions.",
      ),
      paragraph(
        "Official registration links, contract addresses, claiming instructions, and auction details will be published only through verified Interfold channels. Any link claiming access to FOLD tokens, registration, verification, or the auction before official publication should be treated as fraudulent.",
      ),
    ],
  },
  {
    number: "05",
    title: "Eligibility and Verification",
    blocks: [
      paragraph("Participation in the FOLD auction is limited to eligible participants."),
      paragraph(
        "Eligibility may depend on jurisdiction, residence, citizenship, entity status, verification, AML/sanctions screening, wallet screening, and other applicable restrictions.",
      ),
      paragraph(
        "All participants must complete KYC through Predicate, Interfold’s third-party verification provider, to verify their jurisdiction and screen for AML/sanctions.",
      ),
      paragraph("You may not participate if you are:"),
      list([
        "subject to applicable sanctions or restricted-party lists;",
        "located in, resident in, organized in, or acting on behalf of a person or entity located in a restricted jurisdiction;",
        "participating on behalf of a person or entity that is not eligible to participate;",
        "under the age of majority in your jurisdiction; or",
        "otherwise prohibited from participating under applicable law, these Terms, or any determination made by an applicable party or provider in its respective discretion.",
      ]),
      paragraph("Participation may be restricted in certain jurisdictions, including the United Kingdom."),
      paragraph(
        "The offer of FOLD to persons resident in the European Union is made in reliance on the exemption set forth in Article 4(2)(a) of Regulation (EU) 2023/1114 of the European Parliament and of the Council of 31 May 2023 on markets in crypto-assets (the “MiCAR”). Pursuant to Article 4(2)(a) of MiCAR, the offer is directed at fewer than 150 natural or legal persons per Member State, where such persons are acting on their own account.",
      ),
      paragraph(
        "Under this exemption, as provided in Article 4(2) of MiCAR, the Issuer is not required to: (i) draw up a crypto-asset white paper in accordance with Article 6 of MiCAR; (ii) notify such white paper to the competent authority of the relevant Member State in accordance with Article 8 of MiCAR; (iii) publish such white paper in accordance with Article 9 of MiCAR; or (iv) publish marketing communications in accordance with Article 9 of MiCAR. Accordingly, the Issuer will limit the number of participants resident in any single EU Member State to fewer than 150 persons. If you are an EU resident, your eligibility to participate in the FOLD auction may be restricted to ensure compliance with this limitation. No crypto-asset white paper has been drawn up or notified to any competent authority in any EU Member State in connection with this offer. EU residents should carefully consider whether participation in the FOLD auction is appropriate in light of their individual circumstances.",
      ),
      paragraph(
        "Completing registration or KYC does not guarantee eligibility to participate. The Issuer, Predicate, Uniswap, wallet-screening providers, or other service providers may reject, block, or restrict participation where required or appropriate under applicable requirements.",
      ),
      paragraph("You are solely responsible for determining whether your participation is lawful in your jurisdiction."),
    ],
  },
  {
    number: "06",
    title: "Wallets and Third-Party Services",
    blocks: [
      paragraph(
        "To participate in the auction, you will need to use a compatible Ethereum wallet and the official Uniswap auction interface.",
      ),
      paragraph(
        "Your use of any wallet, Uniswap interface, Predicate verification flow, blockchain network, RPC provider, block explorer, or other third-party service is governed by the terms and policies of that third party.",
      ),
      paragraph(
        "Participation through Uniswap, Predicate, wallets, and other third-party services may require acceptance of separate third-party terms. We are not responsible for those third-party terms or services.",
      ),
      paragraph(
        "We do not control third-party services and are not responsible for their availability, functionality, security, accuracy, or performance.",
      ),
      paragraph(
        "We do not custody your funds, wallets, private keys, or FOLD. You are solely responsible for your wallet and all transactions signed from it.",
      ),
      paragraph("You are solely responsible for:"),
      list([
        "maintaining control of your wallet;",
        "safeguarding private keys and seed phrases;",
        "verifying official links and contract addresses;",
        "paying any applicable gas fees or network costs;",
        "ensuring transaction details are accurate before signing; and",
        "understanding the risks of blockchain transactions.",
      ]),
      paragraph(
        "Blockchain transactions may be irreversible. We cannot recover lost private keys, reverse signed transactions, or guarantee successful interaction with third-party interfaces.",
      ),
      paragraph(
        "We will never ask you to send funds to an address provided by direct message, private chat, unofficial account, or individual representative. Participants should use only official links published through verified Interfold channels.",
      ),
    ],
  },
  {
    number: "07",
    title: "Auction Mechanics",
    blocks: [
      paragraph("The auction will use a Continuous Clearing Auction format built on Uniswap infrastructure."),
      paragraph(
        "In a CCA, tokens are distributed progressively across multiple discrete periods. Participants submit bids, and successful bids within each period clear at the same uniform price.",
      ),
      paragraph(
        "In the auction, the minimum price for each subsequent period is the greater of the original floor price or the previous period’s clearing price. As a result, the minimum price may rise in later auction periods, but it does not fall from one period to the next.",
      ),
      paragraph("Any FOLD not distributed in earlier periods may remain available in the final period."),
      paragraph("Participants may be able to submit bids by setting:"),
      list(["a maximum FDV or maximum token price; and", "a maximum budget."]),
      paragraph(
        "A bid may become out of range if the clearing price rises above the maximum price selected. If a bid is out of range, it may no longer be eligible to fill unless the participant takes further action through the official interface.",
      ),
      paragraph(
        "Auction mechanics, timelines, order types, claiming flows, and final interface behavior are subject to the official Uniswap auction interface and final auction materials.",
      ),
    ],
  },
  {
    number: "08",
    title: "No Guarantee of Allocation, Price, or Value",
    blocks: [
      paragraph("Participation in the auction does not guarantee that you will receive any FOLD allocation."),
      // Was: "The starting price or starting FDV for the auction is simply the
      // starting price for the auction and does not represent any projection,
      // estimate, or guarantee of FOLD's actual price or value."
      paragraph(
        "The auction clearing price will be determined through the auction process. The auction floor does not represent any projection, estimate, or guarantee of FOLD’s actual price or value.",
      ),
      paragraph(
        "FOLD may have little or no value. The value of digital assets can be volatile and may decrease significantly, including to zero.",
      ),
      paragraph("We do not guarantee:"),
      list([
        "any allocation;",
        "any clearing price;",
        "any future market price;",
        "any resale opportunity;",
        "any market liquidity;",
        "any exchange listing;",
        "any future functionality, milestone, or network availability; or",
        "any particular outcome from participating in the auction.",
      ]),
      paragraph("You should only participate if you understand and accept these risks."),
    ],
  },
  {
    number: "09",
    title: "Claiming and Transferability",
    blocks: [
      paragraph(
        "After the auction concludes, successful participants are expected to be able to claim FOLD and any unused funds through the official Uniswap auction interface, subject to final auction mechanics and official instructions.",
      ),
      // Was: "FOLD purchased through the CCA will be subject to a 40-day cooldown
      // period. During this period, general transfers are restricted. FOLD may be
      // used for ciphernode bonding."
      paragraph(
        "Claiming is expected to become available at around 14:11 UTC (10:11 AM ET) on Aug 19, roughly an hour after FOLD Auction 2 closes.",
      ),
      // Was: "After the cooldown period ends, general transferability is expected
      // to begin. August 19 is the scheduled date for FOLD transferability and the
      // current target for TGE, subject to official terms and final launch
      // conditions."
      paragraph(
        "General FOLD transferability can be enabled at or after Aug 19 at 14:00 UTC (10 AM ET). Claiming and general FOLD transferability are separate actions.",
      ),
      // Our own edit, not one of Marvin's seven: the previous sentence named TGE,
      // which no longer appears anywhere else in these Terms.
      paragraph(
        "The timing of claiming, general FOLD transferability, and related launch steps may depend on technical, operational, legal, security, or other conditions.",
      ),
    ],
  },
  {
    number: "10",
    title: "Network Alpha",
    blocks: [
      // Our own edit, not one of Marvin's seven. Was: "Network Alpha is separate
      // from the FOLD auction and TGE." Changed so a lone TGE reference would not
      // survive after the others were removed.
      paragraph("Network Alpha is separate from FOLD Auction 2 and general FOLD transferability."),
      paragraph(
        "Network Alpha is the first coordinated mainnet phase of the Interfold network. It is expected to involve early ciphernodes, initial integrations, E3 execution flows, and production validation under controlled conditions.",
      ),
      // Was: "Network Alpha is not live as of the publication of these Terms.
      // Production ciphernode participation is not yet open unless otherwise
      // stated in official Interfold materials."
      paragraph(
        "Production ciphernode participation is not open unless otherwise stated in official Interfold materials.",
      ),
      paragraph(
        "The network is designed for permissionless operator participation, but early operation may require coordination with selected operators, technical requirements, bonding requirements, and operational procedures.",
      ),
    ],
  },
  {
    number: "11",
    title: "Risks",
    blocks: [
      paragraph(
        "By participating in the auction, you acknowledge and accept the risks associated with digital assets, blockchain networks, smart contracts, cryptographic systems, and early-stage network infrastructure.",
      ),
      paragraph("These risks include, but are not limited to:"),
      list([
        "loss of funds due to user error;",
        "loss of access due to private key or seed phrase loss;",
        "wallet, interface, or transaction errors;",
        "smart contract bugs or vulnerabilities;",
        "network congestion, failed transactions, or high gas fees;",
        "phishing, impersonation, scams, or malicious links;",
        "regulatory changes or restrictions;",
        "tax consequences;",
        "volatility or loss of value;",
        "lack of liquidity;",
        "delays in claiming, transferability, or network rollout;",
        "third-party service outages or failures; and",
        "unknown or unanticipated risks.",
      ]),
      paragraph("You are responsible for conducting your own review and deciding whether participation is appropriate for you."),
    ],
  },
  {
    number: "12",
    title: "No Advice",
    blocks: [
      paragraph(
        "Nothing in these Terms, the auction materials, the Interfold website, Interfold documentation, blog posts, social media posts, community messages, or related materials constitutes legal, tax, financial, investment, accounting, or other professional advice.",
      ),
      paragraph("You should consult your own advisors before participating."),
    ],
  },
  {
    number: "13",
    title: "Taxes",
    blocks: [
      paragraph(
        "You are solely responsible for determining what taxes apply to your participation in the auction, your receipt or use of FOLD, any transfer of FOLD, and any related transactions.",
      ),
      paragraph(
        "We are not responsible for determining, withholding, collecting, reporting, or remitting taxes on your behalf, except where expressly required by applicable law.",
      ),
    ],
  },
  {
    number: "14",
    title: "Personal Data",
    blocks: [
      paragraph(
        "Participation may require you to provide information to Predicate or other third-party service providers for KYC, AML/sanctions screening, jurisdiction verification, wallet screening, or related purposes.",
      ),
      paragraph("Your use of those services may be subject to their own terms and privacy policies."),
      paragraph(
        "We and our service providers may collect, process, and retain information as necessary to administer the auction, comply with applicable requirements, prevent fraud or abuse, and operate related services.",
      ),
    ],
  },
  {
    number: "15",
    title: "Participant Representations",
    blocks: [
      paragraph("By participating in the auction, you represent and warrant that:"),
      list([
        "you have read and understood these Terms;",
        "you are eligible to participate;",
        "you are not subject to sanctions or restricted-party lists;",
        "you are not acting on behalf of an ineligible person or entity;",
        "you are of legal age and have legal capacity to participate;",
        "if participating on behalf of an entity, you are authorized to bind that entity;",
        "your participation complies with applicable law;",
        "you are not participating for investment, speculative, or other financial purposes;",
        "you understand the risks of digital assets and blockchain transactions;",
        "you are solely responsible for your wallet, private keys, taxes, and compliance obligations;",
        "all information you provide in connection with verification is accurate and complete; and",
        "you will not use the auction, FOLD, or related services for unlawful activity.",
      ]),
    ],
  },
  {
    number: "16",
    title: "Disclaimers",
    blocks: [
      paragraph(
        "To the fullest extent permitted by applicable law, the auction, FOLD, related smart contracts, websites, interfaces, documentation, and third-party services are provided “as is” and “as available.”",
      ),
      paragraph("We do not guarantee that:"),
      list([
        "the auction will be uninterrupted or error-free;",
        "any interface or smart contract will be free of bugs or vulnerabilities;",
        "any third-party service will function as expected;",
        "FOLD will meet your expectations or needs;",
        "FOLD will have any particular value, utility, or liquidity;",
        "any future network milestone will occur; or",
        "participation will be available in any particular jurisdiction.",
      ]),
      paragraph(
        "No regulatory authority has reviewed, approved, or endorsed these Terms, the auction, FOLD, or any related materials.",
      ),
      paragraph(
        "These Terms and related materials do not constitute a prospectus, offering memorandum, investment solicitation, or offer to sell any security, financial instrument, or investment product.",
      ),
    ],
  },
  {
    number: "17",
    title: "Limitation of Liability",
    blocks: [
      paragraph(
        "To the fullest extent permitted by applicable law, neither the Issuer nor its affiliates, directors, officers, employees, contractors, service providers, contributors, agents, or representatives will be liable for any indirect, incidental, special, consequential, punitive, exemplary, or similar damages arising out of or relating to the auction, FOLD, the Interfold network, third-party services, or these Terms.",
      ),
      paragraph(
        "To the fullest extent permitted by applicable law, our total liability for any claim arising out of or relating to these Terms or the auction will not exceed the amount you paid to acquire FOLD in the auction, or USD $10,000, whichever is lower.",
      ),
      paragraph("Nothing in these Terms limits liability where such limitation would be unlawful."),
    ],
  },
  {
    number: "18",
    title: "Indemnification",
    blocks: [
      paragraph(
        "To the fullest extent permitted by applicable law, you agree to indemnify and hold harmless the Issuer and its affiliates, directors, officers, employees, contractors, service providers, contributors, agents, and representatives from and against any claims, damages, liabilities, losses, costs, and expenses arising out of or relating to:",
      ),
      list([
        "your participation in the auction;",
        "your use of FOLD;",
        "your breach of these Terms;",
        "your violation of applicable law;",
        "inaccurate or incomplete information you provide;",
        "your wallet or transaction activity; or",
        "your negligence, fraud, misconduct, or unlawful activity.",
      ]),
    ],
  },
  {
    number: "19",
    title: "Changes, Suspension, or Cancellation",
    blocks: [
      paragraph(
        "We may modify these Terms before the auction begins by publishing updated Terms through official Interfold channels.",
      ),
      paragraph(
        "We may suspend, delay, restrict, or cancel the auction, registration, verification, claiming, or related processes where required or appropriate due to legal, technical, security, operational, or other reasons.",
      ),
      paragraph("After the auction begins, certain smart contract processes may not be reversible or cancellable."),
    ],
  },
  {
    number: "20",
    title: "Governing Law; Dispute Resolution",
    blocks: [
      subheading("20.1 Governing Law"),
      paragraph(
        "These Terms shall be governed by and construed in accordance with the laws of the British Virgin Islands, without regard to conflict-of-law principles.",
      ),
      paragraph(
        "Although the auction page, website, or related materials may be available in other jurisdictions, such availability shall not be deemed to give rise to general or specific personal jurisdiction over the Issuer in any forum outside the British Virgin Islands.",
      ),
      subheading("20.2 Informal Resolution"),
      paragraph(
        "Before initiating any formal proceeding, you agree to contact the Issuer at ops@gnosisguild.org with a description of the dispute, claim, or cause of action and any relevant documentation.",
      ),
      paragraph(
        "If requested by the Issuer, you agree to use commercially reasonable efforts to resolve the dispute through good-faith settlement discussions for 60 days after delivery of that notice.",
      ),
      subheading("20.3 Binding Confidential Arbitration"),
      paragraph(
        "Any dispute, claim, or controversy arising out of or relating to these Terms, the FOLD auction, FOLD, or your participation in the FOLD auction shall be resolved by confidential, binding arbitration to be seated in the British Virgin Islands and conducted in the English language by a panel of three arbitrators pursuant to the rules of the International Chamber of Commerce (the “Rules”). The arbitrators shall be appointed in accordance with the procedures set out in the Rules. The award or decision of a majority of the arbitrators shall be final and binding upon the parties and the parties expressly waive any right under the laws of any jurisdiction to appeal or otherwise challenge the award, ruling or decision of such majority. The judgment of any award or decision may be entered in any court having competent jurisdiction to the extent necessary. No party hereto shall (or shall permit its representatives to) commence, continue or pursue any dispute in any court; provided, however, that the Issuer shall be entitled to seek a preliminary injunction, temporary restraining order or similar provisional relief to prevent threatened or ongoing breaches of these Terms or to provisionally enforce specifically these Terms, this being in addition to any other remedy to which each party is entitled at law or in equity.",
      ),
      subheading("20.4 Jury Trial Waiver"),
      paragraph(
        "Each party irrevocably waives any right to trial by jury in any action, arbitration, suit, or proceeding arising out of or relating to these Terms, the FOLD auction, FOLD, or any related transaction.",
      ),
      subheading("20.5 Class Action Waiver"),
      paragraph(
        "Any dispute shall be conducted only in an individual capacity and not as a class action, collective action, consolidated action, private attorney general action, or other representative proceeding.",
      ),
      paragraph(
        "You may bring claims against the Issuer only in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.",
      ),
      paragraph(
        "If this class action waiver is finally determined to be unenforceable, then the arbitration provisions shall not apply to any dispute that would be required to proceed on a class basis, and such dispute shall be resolved exclusively in the courts of the British Virgin Islands.",
      ),
    ],
  },
  {
    number: "21",
    title: "Contact",
    blocks: [
      paragraph("Questions about these Terms or the auction should be directed to:"),
      paragraph(
        <span className="flex flex-col items-start gap-3">
          <UnderlinedArrowLink
            className="inline-flex text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
            href="mailto:ops@gnosisguild.org"
            textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-current"
            underlineClassName="border-b border-current pb-[3px]"
          >
            ops@gnosisguild.org
          </UnderlinedArrowLink>
          <UnderlinedArrowLink
            className="inline-flex text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
            href="https://www.theinterfold.com/fold-auction"
            textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-current"
            underlineClassName="border-b border-current pb-[3px]"
          >
            Official Interfold auction page
          </UnderlinedArrowLink>
        </span>,
      ),
    ],
  },
];

function LegalSectionRow({ section }: { section: LegalSection }) {
  return (
    <article className="mx-auto max-w-[760px] border-t border-[#3a5e3c]/25 py-10 md:py-14">
      <header className="mb-7">
        <span className="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-none tracking-[1.4px] text-[#82f5ad] md:text-[14px]">
          {section.number}
        </span>
        <h3 className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[26px] leading-[1] tracking-[-0.78px] md:text-[30px]">
          {section.title}
        </h3>
      </header>
      <div className="space-y-5 font-['ABC_Gramercy:Regular',sans-serif] text-[17px] leading-[1.45] text-[#3a5e3c] md:text-[18px]">
        {section.blocks.map((block, index) => {
          if (block.type === "paragraph") {
            return (
            <p key={index}>{block.content}</p>
            );
          }

          if (block.type === "subheading") {
            return (
              <h4
                className="pt-3 font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-[#687d71] md:text-[13px]"
                key={index}
              >
                {block.content}
              </h4>
            );
          }

          return (
            <ul className="space-y-2 pl-5" key={index}>
              {block.items.map((item, itemIndex) => (
                <li className="list-disc pl-1 marker:text-[#82f5ad]" key={itemIndex}>
                  {item}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </article>
  );
}

export function AuctionLegalPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "FOLD Auction Legal · The Interfold";

    if (description) {
      description.content = "Important information and terms governing participation in the FOLD auction.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <div className="interfold-page-transition min-h-screen overflow-x-clip bg-white text-[#3a5e3c] md:pt-[63px]">
      <main>
        <section className="scroll-mt-[63px] bg-white px-4 pb-[24px] pt-[20px] text-center md:px-8 md:pb-[32px] md:pt-[28px]" id="fold-auction-terms">
          <ScrollFadeIn className="mx-auto max-w-[760px]">
            <SectionLabel>Terms</SectionLabel>
            <h2 className="mx-auto mt-[12px] max-w-[620px] font-['ABC_Gramercy:Regular',sans-serif] text-[40px] leading-[0.95] tracking-[-1.6px] md:text-[64px] md:tracking-[-2.56px]">
              FOLD Auction Terms
            </h2>
            <p className="mt-6 font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.2] tracking-[1.4px] text-[#687d71] md:text-[14px]">
              Last updated: <span className="text-[#3a5e3c]">Aug 16 2026</span>
            </p>
          </ScrollFadeIn>
        </section>

        <section className="bg-white px-4 pb-[64px] pt-[32px] md:px-8 md:pb-[96px] md:pt-[48px]">
          <div className="mx-auto max-w-[1052px]">
            <div className="mx-auto max-w-[760px] space-y-6 pb-16 font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.35] md:pb-24 md:text-[24px]">
              <p>Your participation in the FOLD auction is subject to these FOLD Auction Terms (the “Terms”). Please read these Terms carefully before participating.</p>
              <p>By registering for, bidding in, claiming FOLD from, or otherwise participating in the FOLD auction, you acknowledge that you have read, understood, and agree to these Terms, the official auction materials, and any additional instructions published through verified Interfold channels.</p>
              <p>If you do not understand or agree to these Terms, do not participate in the FOLD auction.</p>
              <p>The FOLD auction will be conducted by <strong>Interfold Ltd.</strong> (the “Issuer,” “we,” “us,” or “our”). References to “you” mean the person or entity participating in the auction. If you participate on behalf of an entity, you represent and warrant that you are authorized to bind that entity to these Terms.</p>
            </div>

            {termsSections.map((section) => (
              <LegalSectionRow key={section.number} section={section} />
            ))}
          </div>
        </section>

        <section className="bg-white px-4 pb-[64px] md:px-8 md:pb-[96px]">
          <ScrollFadeIn className="mx-auto max-w-[760px]">
            <div className="rounded-[24px] bg-[#d9fce8] p-6 md:p-10">
              <SectionLabel>Important Information</SectionLabel>
              <div className="mt-6 space-y-4 font-['Office_Code_Pro:Medium',sans-serif] text-[12px] leading-[1.6] tracking-[0.3px] text-[#687d71]">
                <p>FOLD Auction 2, general FOLD transferability, and Network Alpha are distinct parts of the launch sequence.</p>
                <p>Official information will be published only through The Interfold’s verified channels.</p>
                <p>
                  <span className="text-[#3a5e3c]">Eligibility notice.</span> Participation in the FOLD auction is subject to eligibility requirements,
                  jurisdictional restrictions, verification procedures, AML/sanctions screening, and other applicable restrictions.
                  Participation may be restricted in certain jurisdictions.
                </p>
                <p>
                  <span className="text-[#3a5e3c]">Issuer notice.</span> The FOLD auction will be conducted by Interfold Ltd. (the “Issuer”). Participation in
                  the FOLD auction will be subject to the official Auction Terms, eligibility requirements, and verification procedures.
                </p>
                <p>
                  <span className="text-[#3a5e3c]">No advice / risk notice.</span> Nothing in this communication constitutes legal, tax, financial, investment,
                  or other professional advice. The auction floor does not represent any projection, estimate, or guarantee of
                  FOLD’s actual price or value.
                </p>
              </div>
            </div>
          </ScrollFadeIn>
        </section>
      </main>

      <DesktopFooter />

    </div>
  );
}
