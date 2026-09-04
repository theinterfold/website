import { useEffect, useState } from "react";

// A rail of section numbers pinned to the right, for the two pages long enough
// to lose your place in: the explainer at five sections and 9,300px, and the
// auction terms at twenty-one and 15,600px.
//
// It is fixed to the viewport rather than placed in the layout, so neither page
// had to change shape to make room. That also sets the breakpoint: the content
// container is 1052px wide and centred, so the rail only has somewhere to live
// once the viewport is wide enough to leave a clear margin beside it. Below
// that it is not there at all -- an overlay on the text would be worse than no
// rail.
export type NavSection = { number: string; slug: string; title: string };

export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.slug ?? "");

  useEffect(() => {
    // Not an IntersectionObserver: its callback only carries the sections whose
    // state just changed, and these sections are 1,200 to 2,000px tall, so on
    // most scrolls none of them cross the band and the callback either never
    // fires or fires with nothing intersecting. The mark froze several sections
    // behind.
    //
    // The rule a reader actually expects is simpler and does not depend on what
    // changed: the section being read is the last one whose top has passed
    // under the header.
    let request = 0;

    const measure = () => {
      request = 0;
      const line = 64;
      let current = sections[0]?.slug ?? "";

      for (const section of sections) {
        const node = document.getElementById(section.slug);

        if (node && node.getBoundingClientRect().top <= line) {
          current = section.slug;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (request === 0) {
        request = window.requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (request !== 0) {
        window.cancelAnimationFrame(request);
      }
    };
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block"
    >
      <ol className="pointer-events-auto m-0 flex list-none flex-col gap-3 p-0">
        {sections.map((section) => {
          const isActive = section.slug === active;

          return (
            <li key={section.slug}>
              <a
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-none tracking-[1.4px] transition-colors ${
                  isActive ? "text-[#3a5e3c]" : "text-[#687d71]/50 hover:text-[#687d71]"
                }`}
                href={`#${section.slug}`}
              >
                <span className="w-[18px] shrink-0">{section.number}</span>
                {/* The rule carries the state, so the number stays legible at
                    rest and nothing has to grow or move on hover. */}
                <span
                  className={`mt-[3px] h-px shrink-0 transition-all ${
                    isActive ? "w-[26px] bg-[#82f5ad]" : "w-[12px] bg-[#687d71]/30 group-hover:w-[18px]"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
