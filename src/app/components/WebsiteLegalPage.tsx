import { useEffect } from "react";
import { DesktopFooter } from "../../imports/Desktop/Desktop";
import { SectionLabel } from "./SectionLabel";

// Website copy supplied by the team on May 28, 2026. Auction terms remain
// separate at /auction/legal.
const legalPages = {
  privacy: {
    title: "Privacy Policy",
    description: "How The Interfold website uses information you choose to provide.",
    paragraphs: [
      "The Interfold website collects only the information you choose to provide, such as information submitted through contact, update, or participation forms.",
      "We may use this information to respond to inquiries, share updates, manage participation interest, and improve public resources.",
      "We do not sell personal information.",
      "This website may link to third-party services, including documentation, demos, dashboards, forms, and external communication channels. Those services may have their own privacy practices.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description: "Terms and conditions for using The Interfold website and its public resources.",
    paragraphs: [
      "This website provides information about The Interfold, related documentation, public resources, demos, dashboards, and participation pathways.",
      "The content on this website is provided for informational purposes only. Nothing here should be interpreted as legal, financial, investment, tax, or technical security advice.",
      "Participation in any network, token, operator, or related program may be subject to additional terms, eligibility requirements, and legal review.",
      "The Interfold website may link to third-party resources. We are not responsible for third-party content, services, or policies.",
    ],
  },
};

export function WebsiteLegalPage({ page }: { page: keyof typeof legalPages }) {
  const { title, description, paragraphs } = legalPages[page];

  useEffect(() => {
    const previousTitle = document.title;
    const pageTitle = `${title} · The Interfold`;
    const updates: [string, string][] = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', pageTitle],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', `https://www.theinterfold.com/${page}`],
      ['meta[name="twitter:title"]', pageTitle],
      ['meta[name="twitter:description"]', description],
    ];
    const previousMetadata = updates.map(([selector, content]) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      const previousContent = element?.content;
      if (element) element.content = content;
      return { element, previousContent };
    });

    document.title = pageTitle;

    return () => {
      document.title = previousTitle;
      previousMetadata.forEach(({ element, previousContent }) => {
        if (element && previousContent !== undefined) element.content = previousContent;
      });
    };
  }, [page, title, description]);

  return (
    <div className="interfold-page-transition min-h-screen overflow-x-clip bg-white text-[#3a5e3c] xl:pt-[63px]">
      <main className="px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <article className="mx-auto max-w-[760px]" aria-labelledby="website-legal-title">
          <header className="border-b border-[#3a5e3c]/25 pb-8 md:pb-10">
            <SectionLabel>Legal</SectionLabel>
            <h1
              id="website-legal-title"
              className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[40px] leading-[0.95] tracking-[-1.6px] md:text-[64px] md:tracking-[-2.56px]"
            >
              {title}
            </h1>
          </header>

          <div className="space-y-6 pt-8 font-['ABC_Gramercy:Regular',sans-serif] text-[18px] leading-[1.45] md:pt-10 md:text-[20px]">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p>
              For questions, contact:{" "}
              <a
                href="mailto:ops@gnosisguild.org"
                className="break-words text-[inherit] leading-[inherit] underline underline-offset-4 transition-colors hover:text-[#687d71] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                ops@gnosisguild.org
              </a>
            </p>
          </div>
        </article>
      </main>

      <DesktopFooter />
    </div>
  );
}
