import { DesktopFooter } from '../../imports/Desktop/Desktop';
import { NOT_FOUND } from '../../../seo/routes.mjs';
import { UnderlinedArrowLink } from './HoverArrowLink';
import { ScrollFadeIn } from './ScrollFadeIn';
import { SectionLabel } from './SectionLabel';

export function NotFoundPage() {
  return (
    <div className="interfold-page-transition min-h-screen overflow-x-clip bg-white text-[#3a5e3c] xl:pt-[63px]">
      <main className="px-4 py-16 md:px-8 md:py-24">
        <ScrollFadeIn className="mx-auto max-w-[760px]">
          <SectionLabel>404</SectionLabel>
          <h1 className="mt-3 font-['ABC_Gramercy:Regular',sans-serif] text-[40px] leading-[0.95] tracking-[-1.6px] md:text-[64px] md:tracking-[-2.56px]">Page not found</h1>
          <p className="mt-6 font-['ABC_Gramercy:Regular',sans-serif] text-[20px] leading-[1.35]">{NOT_FOUND.description}</p>
          <UnderlinedArrowLink
            href="/"
            className="mt-8 inline-flex text-[#3a5e3c] transition-colors hover:text-[#82f5ad]"
            textClassName="font-['Office_Code_Pro:Medium',sans-serif] text-[12px] uppercase leading-[1.075] tracking-[1.4px] text-current"
            underlineClassName="border-b border-current pb-[4px]"
          >Back to home</UnderlinedArrowLink>
        </ScrollFadeIn>
      </main>
      <DesktopFooter />
    </div>
  );
}
