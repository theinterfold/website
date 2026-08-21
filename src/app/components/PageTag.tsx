// A small filled box naming the page, sitting where an eyebrow label would.
//
// The type is knocked out in the section's own background colour, so the tag has
// to be told which colour that is — it cannot read it off the parent.
export function PageTag({ label, textClassName }: { label: string; textClassName: string }) {
  return (
    <span
      className={`inline-block bg-[#3a5e3c] px-[10px] py-[7px] font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-none tracking-[1.4px] md:text-[14px] ${textClassName}`}
    >
      {label}
    </span>
  );
}
