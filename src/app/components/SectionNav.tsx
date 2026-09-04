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
      // Fixed width, not shrink-to-fit. Anchored to the right edge, a rail that
      // sizes to its widest child moves every time the widest child changes --
      // which was every time the mark moved, so the whole column twitched
      // sideways as you scrolled.
      className="fixed right-6 top-1/2 z-40 hidden w-[52px] -translate-y-1/2 min-[1400px]:block"
    >
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {sections.map((section) => {
          const isActive = section.slug === active;

          return (
            <li className="group relative" key={section.slug}>
              <a
                aria-current={isActive ? "true" : undefined}
                className="flex items-center justify-end gap-2 font-['Office_Code_Pro:Medium',sans-serif] text-[11px] leading-none tracking-[1.4px]"
                href={`#${section.slug}`}
              >
                {/* Colour carries the state, and only colour. Every number and
                    every rule keeps its size in every state, so nothing in the
                    rail moves while you read. */}
                <span
                  className={`transition-colors ${
                    isActive ? "text-[#3a5e3c]" : "text-[#687d71]/45 group-hover:text-[#687d71]"
                  }`}
                >
                  {section.number}
                </span>
                <span
                  className={`h-px w-[14px] shrink-0 transition-colors ${
                    isActive ? "bg-[#82f5ad]" : "bg-[#687d71]/30 group-hover:bg-[#687d71]/60"
                  }`}
                />
              </a>

              {/* On hover only. At the width the rail appears, the gap between
                  the text column and the rail is 232px, which is not enough for
                  a title to live in permanently -- so the reader asks for it and
                  it takes no space the rest of the time. 230px is that gap minus
                  the margin, so a long title wraps rather than covering the
                  text it is meant to help you navigate. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-full top-1/2 mr-3 hidden w-max max-w-[230px] -translate-y-1/2 rounded-[6px] bg-[#3a5e3c] px-3 py-2 text-right font-['ABC_Gramercy:Regular',sans-serif] text-[13px] leading-[1.25] text-[#d9fce8] group-hover:block"
              >
                {section.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
