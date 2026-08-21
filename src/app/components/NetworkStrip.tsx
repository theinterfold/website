import { ExternalArrowSlide } from "./HoverArrowLink";

// The live-network strip. It used to be a homepage section sitting under the
// hero, duplicated between Desktop.tsx and MobileVersion.tsx; Marvin asked for it
// to move into the header area, so it now lives with the header and appears on
// every page that has one.
//
// Marvin's wording is too wide for one line on a phone, so it wraps: the status
// on top, both links underneath. The links are grouped so they wrap together
// instead of one of them being left stranded on the second line.
const linkClass =
  "group inline-flex items-center gap-1 transition-colors hover:text-[#82f5ad] focus-visible:text-[#82f5ad]";
const arrowClass =
  "relative inline-block h-[13px] w-[13px] overflow-hidden font-['ABC_Gramercy:Regular',sans-serif] text-[13px] leading-none";

export function NetworkStrip() {
  return (
    <div data-preview-note="strip" className="flex w-full shrink-0 items-center justify-center border-t border-[#3a5e3c]/10 bg-white px-3 py-[6px] sm:h-[32px] sm:py-0">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-[3px] whitespace-nowrap font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-[1.2] tracking-[1px] text-[#687d71] sm:gap-x-6 sm:text-[12px] sm:tracking-[1.2px] md:gap-x-12">
        <span className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-12">
          <span
            aria-hidden="true"
            className="relative size-2 rounded-full bg-[#82f5ad] shadow-[0_0_8px_2px_rgba(130,245,173,0.6)] before:absolute before:inset-[-2px] before:rounded-full before:bg-[#82f5ad]/45 before:animate-ping motion-reduce:before:animate-none"
          />
          <span>Network Alpha · Live on mainnet</span>
        </span>
        <span className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-12">
          <a className={linkClass} href="https://governance.theinterfold.com">
            <span>Governance</span>
            <ExternalArrowSlide className={arrowClass} rowClassName="h-[13px] w-[13px] leading-none" />
          </a>
          <a className={linkClass} href="https://dashboard.theinterfold.com/">
            <span>Network dashboard</span>
            <ExternalArrowSlide className={arrowClass} rowClassName="h-[13px] w-[13px] leading-none" />
          </a>
        </span>
      </div>
    </div>
  );
}
