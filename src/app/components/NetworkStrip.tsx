// The live-network strip. It used to be a homepage section sitting under the
// hero, duplicated between Desktop.tsx and MobileVersion.tsx; Marvin asked for it
// to move into the header area, so it now lives with the header and appears on
// every page that has one.
//
// Governance and the dashboard used to sit here as two links. They are now in
// the Network Alpha control in the nav, and in the mobile menu — the strip only
// states that the network is up.

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
      </div>
    </div>
  );
}
