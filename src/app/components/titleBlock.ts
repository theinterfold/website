// Every page title block is the same three things in the same order: a small
// uppercase label, the title, and one supporting line. The spacing between them
// is one value shared by all of them rather than a number picked per page —
// they were 24/8 on the mobile homepage, 24/24 on the desktop one and 24/12 on
// Participate, which is why the label looked further from the title on some
// pages than the supporting line did.
export const TITLE_BLOCK_GAP = "gap-[8px] md:gap-[12px]";

// A title block is: eyebrow label, title, one supporting line.
//
// The label above the title is Office Code Pro, uppercase. The line below it is
// the title's own face at a small size. Setting both in Office Code Pro
// sandwiched the title between two blocks of uppercase mono, which read as spec
// sheet rather than as a sentence.
export const SUPPORTING_LINE =
  "font-['ABC_Gramercy:Regular',sans-serif] text-[16px] leading-[1.2] md:text-[18px]";
