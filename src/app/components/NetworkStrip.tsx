// The live-network strip. It sits under the hero as a section of the page, and
// sticks to the underside of the header once you scroll to it — so it starts as
// part of the page and ends up part of the navigation.
//
// The sticky offset is the header's height, which differs between the two
// headers, so it comes from the caller rather than being baked in here.
//
// Governance and the dashboard used to sit here as two links. They are now in
// the Network Alpha control in the nav, and in the mobile menu — the strip only
// states that the network is up.

export function NetworkStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full shrink-0 items-center justify-center border-t border-[#3a5e3c]/10 bg-white px-3 py-[6px] sm:h-[32px] sm:py-0 ${className}`}>
      {/* The dot is out of flow so it cannot push the line off centre. Centring
          the pair instead moved the words right by half the dot plus its gap. */}
      <p className="relative whitespace-nowrap font-['Office_Code_Pro:Medium',sans-serif] text-[10px] uppercase leading-[1.2] tracking-[1px] text-[#687d71] sm:text-[12px] sm:tracking-[1.2px]">
        <span
          aria-hidden="true"
          className="absolute right-full top-1/2 mr-4 size-2 -translate-y-1/2 rounded-full bg-[#82f5ad] shadow-[0_0_8px_2px_rgba(130,245,173,0.6)] before:absolute before:inset-[-2px] before:rounded-full before:bg-[#82f5ad]/45 before:animate-ping motion-reduce:before:animate-none sm:mr-6 md:mr-12"
        />
        Network Alpha · Live on mainnet
      </p>
    </div>
  );
}
