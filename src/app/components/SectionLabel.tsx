// The small uppercase label that sits above a headline — OVERVIEW, NOW LIVE,
// EXPLORE. Also used above the two page titles, which is the same typographic
// role even though the word names a page rather than a section.
export function SectionLabel({
  children,
  className = "text-[#8a9c90]",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.2] tracking-[1.2px] md:text-[14px] md:leading-[1.075] md:tracking-[1.4px] ${className}`}
    >
      {children}
    </p>
  );
}
