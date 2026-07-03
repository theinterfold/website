import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Desktop from '../../imports/Desktop/Desktop';
import { Header } from './Header';
import { FoldAuctionPage } from './FoldAuctionPage';
import { MobileVersion } from './MobileVersion';
import { ParticipatePage } from './ParticipatePage';
import { HeroImage, auctionHeroSources, homeHeroSources, participateHeroSources } from './HeroImage';

const MOBILE_BREAKPOINT = 768;
type HeroPagePath = '' | 'participate' | 'fold-auction';
type HeroOverlay = {
  page: HeroPagePath;
  top: number;
};

const CONTENT_ONLY_EXIT_CLASS = 'interfold-transition-content-exit';
const HERO_OVERLAY_ACTIVE_CLASS = 'interfold-route-hero-active';
const HERO_OVERLAY_DURATION_MS = 720;
const HERO_ROUTE_COMMIT_DELAY_MS = 160;

function getPagePath() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

function applyPageTheme(page = getPagePath()) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('interfold-theme-participate', page === 'participate');
}

function getHeroOverlayTop(nextPage: HeroPagePath) {
  const hero = document.querySelector('.interfold-hero-transition');

  if (window.innerWidth >= MOBILE_BREAKPOINT) {
    return nextPage === 'fold-auction' ? 63 : 0;
  }

  if (!(hero instanceof HTMLElement)) {
    return 0;
  }

  return Math.max(0, hero.getBoundingClientRect().top);
}

function getHeroPagePath(page: string): HeroPagePath | null {
  return page === '' || page === 'participate' || page === 'fold-auction' ? page : null;
}

function HeroTransitionOverlay({ overlay }: { overlay: HeroOverlay }) {
  const isParticipate = overlay.page === 'participate';
  const sources = overlay.page === 'fold-auction' ? auctionHeroSources : homeHeroSources;

  return (
    <div className={`interfold-route-hero-overlay ${isParticipate ? 'bg-white' : 'bg-[#d9fce8]'}`} style={{ top: `${overlay.top}px` }}>
      {isParticipate ? (
        <>
          <HeroImage
            className="h-full w-full object-cover object-top md:hidden"
            pictureClassName="block h-full w-full md:hidden"
            sources={participateHeroSources}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full -translate-x-1/2 overflow-hidden bg-white md:block">
            <HeroImage
              className="absolute inset-0 h-full w-full object-cover object-top"
              sources={participateHeroSources}
            />
          </div>
        </>
      ) : (
        <>
          <HeroImage
            className="interfold-home-hero-image h-full w-full object-cover object-top mix-blend-darken md:hidden"
            pictureClassName="block h-full w-full md:hidden"
            sources={sources}
          />
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 overflow-hidden bg-[#121718] md:block">
            <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden bg-[#d9fce8]">
              <HeroImage
                className="interfold-home-hero-image absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
                sources={sources}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [routePath, setRoutePath] = useState(getPagePath);
  const [heroOverlay, setHeroOverlay] = useState<HeroOverlay | null>(null);

  useEffect(() => {
    setIsClient(true);
    const currentPath = getPagePath();
    applyPageTheme(currentPath);
    setRoutePath(currentPath);
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const commitRoutePath = () => {
      const nextPath = getPagePath();
      applyPageTheme(nextPath);
      flushSync(() => {
        setRoutePath(nextPath);
      });
    };
    let heroOverlayRouteTimer: number | undefined;
    let heroOverlayCleanupTimer: number | undefined;

    const clearTransitionModeClasses = () => {
      document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
      document.documentElement.classList.remove(HERO_OVERLAY_ACTIVE_CLASS);
    };

    const startRouteTransition = (commit: () => void, nextPage = getPagePath()) => {
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextHeroPage = getHeroPagePath(nextPage);

      if (heroOverlayRouteTimer) {
        window.clearTimeout(heroOverlayRouteTimer);
      }

      if (heroOverlayCleanupTimer) {
        window.clearTimeout(heroOverlayCleanupTimer);
      }

      clearTransitionModeClasses();

      if (shouldReduceMotion) {
        commit();
        return;
      }

      if (nextHeroPage === null) {
        commit();
        return;
      }

      applyPageTheme(nextPage);
      document.documentElement.classList.add(HERO_OVERLAY_ACTIVE_CLASS);
      flushSync(() => {
        setHeroOverlay({
          page: nextHeroPage,
          top: getHeroOverlayTop(nextHeroPage),
        });
      });
      document.documentElement.classList.add(CONTENT_ONLY_EXIT_CLASS);
      heroOverlayRouteTimer = window.setTimeout(() => {
        document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
        commit();
      }, HERO_ROUTE_COMMIT_DELAY_MS);
      heroOverlayCleanupTimer = window.setTimeout(() => {
        clearTransitionModeClasses();
        flushSync(() => {
          setHeroOverlay(null);
        });
      }, HERO_OVERLAY_DURATION_MS);
    };

    const checkRoute = () => {
      startRouteTransition(commitRoutePath, getPagePath());
    };

    const handleInternalLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');

      if (!(link instanceof HTMLAnchorElement) || link.target || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextRoute = url.pathname.replace(/^\/+|\/+$/g, '');

      if (getHeroPagePath(nextRoute) === null) {
        return;
      }

      event.preventDefault();

      if (`${url.pathname}${url.search}${url.hash}` === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        return;
      }

      startRouteTransition(() => {
        window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
        commitRoutePath();
        window.scrollTo(0, 0);
      }, nextRoute);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('popstate', checkRoute);
    document.addEventListener('click', handleInternalLinkClick);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('popstate', checkRoute);
      document.removeEventListener('click', handleInternalLinkClick);
      if (heroOverlayRouteTimer) {
        window.clearTimeout(heroOverlayRouteTimer);
      }
      if (heroOverlayCleanupTimer) {
        window.clearTimeout(heroOverlayCleanupTimer);
      }
      clearTransitionModeClasses();
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const isHome = routePath === '';
  const isParticipate = routePath === 'participate';
  const isFoldAuction = routePath === 'fold-auction';
  const sharedHeader = (isParticipate || isFoldAuction || (!isMobile && isHome)) ? (
    <Header
      activePath={routePath}
      animateOpening
      backgroundClassName={isParticipate ? 'bg-white' : 'bg-[#d9fce8]'}
      desktopPositionClassName="md:fixed md:left-0 md:top-0"
      showDesktop={!isMobile}
      showMobile={isParticipate || isFoldAuction}
    />
  ) : null;

  // Renderiza versão mobile em telas pequenas, desktop em telas grandes
  if (!isClient) {
    // Durante SSR/primeira renderização, renderiza desktop
    return (
      <>
        <Header
          activePath=""
          animateOpening
          backgroundClassName="bg-[#d9fce8]"
          desktopPositionClassName="md:fixed md:left-0 md:top-0"
          showDesktop
          showMobile={false}
        />
        <Desktop />
      </>
    );
  }

  if (routePath === 'fold-auction') {
    return (
      <>
        {sharedHeader}
        <FoldAuctionPage />
        {heroOverlay && <HeroTransitionOverlay overlay={heroOverlay} />}
      </>
    );
  }

  if (isParticipate) {
    return (
      <>
        {sharedHeader}
        <ParticipatePage />
        {heroOverlay && <HeroTransitionOverlay overlay={heroOverlay} />}
      </>
    );
  }

  return (
    <>
      {sharedHeader}
      {isMobile ? <MobileVersion /> : <Desktop />}
      {heroOverlay && <HeroTransitionOverlay overlay={heroOverlay} />}
    </>
  );
}
