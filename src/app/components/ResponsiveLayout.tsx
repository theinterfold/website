import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Desktop from '../../imports/Desktop/Desktop';
import { AuctionLegalPage } from './AuctionLegalPage';
import { Header } from './Header';
import { FoldAuctionPage } from './FoldAuctionPage';
import { MobileVersion } from './MobileVersion';
import { ParticipatePage } from './ParticipatePage';
import { HeroImage, auctionHeroSources, homeHeroSources, participateHeroSources } from './HeroImage';
import { useRouteDocumentHead } from './useRouteDocumentHead';

const MOBILE_BREAKPOINT = 768;
type HeroPagePath = '' | 'participate' | 'fold-auction';
type HeroOverlay = {
  fromPage: HeroPagePath | null;
  fromTop: number;
  id: number;
  page: HeroPagePath;
  top: number;
};

const CONTENT_ONLY_EXIT_CLASS = 'interfold-transition-content-exit';
const CONTENT_ONLY_ENTER_CLASS = 'interfold-transition-content-enter';
const FULL_PAGE_EXIT_CLASS = 'interfold-transition-page-exit';
const FULL_PAGE_ENTER_CLASS = 'interfold-transition-page-enter';
const HERO_OVERLAY_ACTIVE_CLASS = 'interfold-route-hero-active';
const HERO_OVERLAY_DURATION_MS = 720;
const HERO_ROUTE_COMMIT_DELAY_MS = 40;
const HERO_OVERLAY_CLEANUP_DELAY_MS = 760;
const PAGE_FADE_COMMIT_DELAY_MS = 220;
const PAGE_FADE_CLEANUP_DELAY_MS = 520;

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

// Where to draw the transition's hero band, so it lands exactly on top of the
// real one. This used to shortcut to 0 above the mobile breakpoint, which only
// happened to be right on wide screens, where the hero does start at the top of
// the viewport. At tablet widths the header sits above the hero and pushes it
// down ~60px, so the overlay was drawn that much too high and the image visibly
// jumped as the transition handed over. Measure it instead of assuming.
function getHeroOverlayTop(nextPage: HeroPagePath) {
  const hero = document.querySelector('.interfold-hero-transition');

  if (!(hero instanceof HTMLElement)) {
    return 0;
  }

  return Math.max(0, hero.getBoundingClientRect().top);
}

function getHeroPagePath(page: string): HeroPagePath | null {
  return page === '' || page === 'participate' || page === 'fold-auction' ? page : null;
}

function HeroTransitionVisual({ page }: { page: HeroPagePath }) {
  const isParticipate = page === 'participate';
  const sources = page === 'fold-auction' ? auctionHeroSources : homeHeroSources;

  return (
    <div className={`size-full ${isParticipate ? 'bg-white' : 'bg-[#d9fce8]'}`}>
      {isParticipate ? (
        <>
          <HeroImage
            className="h-full w-full object-cover object-top md:hidden"
            fadeIn={false}
            pictureClassName="block h-full w-full md:hidden"
            sources={participateHeroSources}
          />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full -translate-x-1/2 overflow-hidden bg-white md:block">
            <HeroImage
              className="absolute inset-0 h-full w-full object-cover object-top"
              fadeIn={false}
              sources={participateHeroSources}
            />
          </div>
        </>
      ) : (
        <>
          <HeroImage
            className="interfold-home-hero-image h-full w-full object-cover object-top mix-blend-darken md:hidden"
            fadeIn={false}
            pictureClassName="block h-full w-full md:hidden"
            sources={sources}
          />
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 overflow-hidden bg-[#121718] md:block">
            <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden bg-[#d9fce8]">
              <HeroImage
                className="interfold-home-hero-image absolute inset-0 h-full w-full object-cover object-top mix-blend-darken"
                fadeIn={false}
                sources={sources}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function HeroTransitionOverlay({ overlay }: { overlay: HeroOverlay }) {
  return (
    <div className="interfold-route-hero-overlay">
      {overlay.fromPage !== null && (
        <div className="interfold-route-hero-layer" style={{ top: `${overlay.fromTop}px` }}>
          <HeroTransitionVisual page={overlay.fromPage} />
        </div>
      )}
      <div className="interfold-route-hero-layer interfold-route-hero-overlay__incoming" style={{ top: `${overlay.top}px` }}>
        <HeroTransitionVisual page={overlay.page} />
      </div>
    </div>
  );
}

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [routePath, setRoutePath] = useState(getPagePath);
  const [heroOverlay, setHeroOverlay] = useState<HeroOverlay | null>(null);
  const heroTransitionId = useRef(0);
  const routePathRef = useRef(getPagePath());

  // The document head follows the route, not the document the tab was opened
  // at. Same manifest the build reads.
  useRouteDocumentHead(routePath);

  useEffect(() => {
    const configureExternalLink = (anchor: HTMLAnchorElement) => {
      const url = new URL(anchor.href, window.location.href);
      const isExternalHttpLink =
        (url.protocol === 'http:' || url.protocol === 'https:') &&
        url.origin !== window.location.origin;

      if (!isExternalHttpLink) {
        return;
      }

      anchor.target = '_blank';
      anchor.rel = Array.from(new Set(`${anchor.rel} noopener noreferrer`.trim().split(/\s+/))).join(' ');
    };

    const configureTree = (root: ParentNode) => {
      if (root instanceof HTMLAnchorElement) {
        configureExternalLink(root);
      }

      root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(configureExternalLink);
    };

    configureTree(document);

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            configureTree(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsClient(true);
    const currentPath = getPagePath();
    applyPageTheme(currentPath);
    routePathRef.current = currentPath;
    setRoutePath(currentPath);
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const commitRoutePath = () => {
      const nextPath = getPagePath();
      applyPageTheme(nextPath);
      routePathRef.current = nextPath;
      flushSync(() => {
        setRoutePath(nextPath);
      });
    };
    let heroOverlayRouteTimer: number | undefined;
    let heroOverlayCleanupTimer: number | undefined;

    const clearTransitionModeClasses = () => {
      document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
      document.documentElement.classList.remove(CONTENT_ONLY_ENTER_CLASS);
      document.documentElement.classList.remove(FULL_PAGE_EXIT_CLASS);
      document.documentElement.classList.remove(FULL_PAGE_ENTER_CLASS);
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

      const currentHero = document.querySelector('.interfold-hero-transition');
      const shouldUseHeroTransition = currentHero instanceof HTMLElement && window.scrollY <= 8;

      if (!shouldUseHeroTransition) {
        applyPageTheme(nextPage);
        document.documentElement.classList.add(FULL_PAGE_EXIT_CLASS);
        heroOverlayRouteTimer = window.setTimeout(() => {
          document.documentElement.classList.remove(FULL_PAGE_EXIT_CLASS);
          document.documentElement.classList.add(FULL_PAGE_ENTER_CLASS);
          commit();
        }, PAGE_FADE_COMMIT_DELAY_MS);
        heroOverlayCleanupTimer = window.setTimeout(() => {
          clearTransitionModeClasses();
        }, PAGE_FADE_CLEANUP_DELAY_MS);
        return;
      }

      applyPageTheme(nextPage);
      document.documentElement.classList.add(HERO_OVERLAY_ACTIVE_CLASS);
      heroTransitionId.current += 1;
      const fromPage = getHeroPagePath(routePathRef.current);
      flushSync(() => {
        setHeroOverlay({
          fromPage,
          fromTop: fromPage === null ? getHeroOverlayTop(nextHeroPage) : getHeroOverlayTop(fromPage),
          id: heroTransitionId.current,
          page: nextHeroPage,
          top: getHeroOverlayTop(nextHeroPage),
        });
      });
      document.documentElement.classList.add(CONTENT_ONLY_EXIT_CLASS);
      heroOverlayRouteTimer = window.setTimeout(() => {
        document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
        document.documentElement.classList.add(CONTENT_ONLY_ENTER_CLASS);
        commit();
      }, HERO_ROUTE_COMMIT_DELAY_MS);
      heroOverlayCleanupTimer = window.setTimeout(() => {
        clearTransitionModeClasses();
        flushSync(() => {
          setHeroOverlay(null);
        });
      }, HERO_OVERLAY_CLEANUP_DELAY_MS);
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
  const isAuctionLegal = routePath === 'auction/legal';
  const headerBackgroundPath = heroOverlay?.page ?? routePath;
  const sharedHeader = (isParticipate || isFoldAuction || isAuctionLegal || (!isMobile && isHome)) ? (
    <Header
      activePath={isAuctionLegal ? 'fold-auction' : routePath}
      animateOpening
      backgroundClassName={headerBackgroundPath === 'participate' || headerBackgroundPath === 'auction/legal' ? 'bg-white' : 'bg-[#d9fce8]'}
      desktopPositionClassName="md:fixed md:left-0 md:top-0"
      showDesktop={!isMobile}
      showMobile={isParticipate || isFoldAuction || isAuctionLegal || (!isMobile && isHome)}
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
        {heroOverlay && <HeroTransitionOverlay key={heroOverlay.id} overlay={heroOverlay} />}
      </>
    );
  }

  if (isAuctionLegal) {
    return (
      <>
        {sharedHeader}
        <AuctionLegalPage />
      </>
    );
  }

  if (isParticipate) {
    return (
      <>
        {sharedHeader}
        <ParticipatePage />
        {heroOverlay && <HeroTransitionOverlay key={heroOverlay.id} overlay={heroOverlay} />}
      </>
    );
  }

  return (
    <>
      {sharedHeader}
      {isMobile ? <MobileVersion /> : <Desktop />}
      {heroOverlay && <HeroTransitionOverlay key={heroOverlay.id} overlay={heroOverlay} />}
    </>
  );
}
