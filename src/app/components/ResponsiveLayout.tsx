import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { transitionPage } from '../../../packages/site-header/lib/pageNavigation.js';
import Desktop from '../../imports/Desktop/Desktop';
import { AuctionLegalPage } from './AuctionLegalPage';
import { WebsiteLegalPage } from './WebsiteLegalPage';
import { Header } from './Header';
import { FoldAuctionPage } from './FoldAuctionPage';
import { MobileVersion } from './MobileVersion';
import { SiteMobileHeader } from './SiteMobileHeader';
import { ParticipatePage } from './ParticipatePage';
import { HeroImage, auctionHeroSources, homeHeroSources, participateHeroSources } from './HeroImage';

import { findRoute } from '../../../seo/routes.mjs';
import { useRouteDocumentHead } from './useRouteDocumentHead';
import { NotFoundPage } from './NotFoundPage';

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
const HERO_OVERLAY_ACTIVE_CLASS = 'interfold-route-hero-active';
const HERO_OVERLAY_DURATION_MS = 720;
const HERO_ROUTE_COMMIT_DELAY_MS = 240;
const HERO_OVERLAY_CLEANUP_DELAY_MS = 760;

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

export function ResponsiveLayout({ initialPath }: { initialPath?: string }) {
  // Both existing home layouts are present in the static document. CSS selects
  // the right one before hydration; the unused tree is then removed.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [routePath, setRoutePath] = useState(() => initialPath ?? getPagePath());
  const [heroOverlay, setHeroOverlay] = useState<HeroOverlay | null>(null);
  const heroTransitionId = useRef(0);
  const routePathRef = useRef(initialPath ?? getPagePath());

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
    let pageMotion: AbortController | undefined;
    const pageSurface = () => Array.from(document.querySelectorAll<HTMLElement>('.interfold-page-transition'))
      .find(node => node.getClientRects().length > 0) ?? null;
    let heroOverlayRouteTimer: number | undefined;
    let heroOverlayCleanupTimer: number | undefined;

    const clearTransitionModeClasses = () => {
      document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
      document.documentElement.classList.remove(CONTENT_ONLY_ENTER_CLASS);
      document.documentElement.classList.remove(HERO_OVERLAY_ACTIVE_CLASS);
    };

    const stopTransition = () => {
      window.clearTimeout(heroOverlayRouteTimer);
      window.clearTimeout(heroOverlayCleanupTimer);
      heroOverlayRouteTimer = undefined;
      pageMotion?.abort();
      pageMotion = undefined;
      setHeroOverlay(null);
      clearTransitionModeClasses();
    };

    const startRouteTransition = (commit: () => void, nextPage = getPagePath()) => {
      stopTransition();
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextHeroPage = getHeroPagePath(nextPage);

      if (shouldReduceMotion) {
        commit();
        return;
      }

      const currentHero = pageSurface()?.querySelector('.interfold-hero-transition');
      if (nextHeroPage === null || !currentHero || window.scrollY > 8) {
        const controller = new AbortController();
        pageMotion = controller;
        void transitionPage(pageSurface, commit, controller.signal).finally(() => {
          if (pageMotion === controller) pageMotion = undefined;
        });
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
        heroOverlayRouteTimer = undefined;
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

    const placeDestination = (scrollY: number) => {
      const anchor = document.getElementById(window.location.hash.slice(1));
      const target = anchor ?? pageSurface()?.querySelector<HTMLElement>('h1, main');
      if (target) {
        if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      if (anchor) anchor.scrollIntoView();
      else window.scrollTo({ top: scrollY, behavior: 'instant' });
    };

    const checkRoute = (event: PopStateEvent) => {
      if (getPagePath() === routePathRef.current) {
        if (pageMotion || heroOverlayRouteTimer) stopTransition();
        return;
      }
      startRouteTransition(() => {
        commitRoutePath();
        placeDestination(event.state?.interfoldScrollY ?? 0);
      });
    };

    const handleInternalLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');

      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== '_self') || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextRoute = url.pathname.replace(/^\/+|\/+$/g, '');

      if (!findRoute(url.pathname)) return;
      if (nextRoute === routePathRef.current && nextRoute === getPagePath()) {
        if (pageMotion || heroOverlayRouteTimer) stopTransition();
        if (url.href === window.location.href) event.preventDefault();
        return;
      }
      event.preventDefault();

      startRouteTransition(() => {
        window.history.replaceState({ ...window.history.state, interfoldScrollY: window.scrollY }, '');
        window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
        commitRoutePath();
        placeDestination(0);
      }, nextRoute);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('popstate', checkRoute);
    document.addEventListener('click', handleInternalLinkClick);

    return () => {
      pageMotion?.abort();
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

  const route = findRoute(`/${routePath}`);
  const isHome = route?.key === 'home';
  const isParticipate = route?.key === 'participate';
  const isFoldAuction = route?.key === 'auction';
  const isAuctionLegal = route?.key === 'auction-legal';
  const isWebsiteLegal = route?.key === 'privacy' || route?.key === 'terms';
  const isNotFound = !route;
  const headerBackgroundPath = heroOverlay?.page ?? routePath;
  const sharedHeader = (isParticipate || isFoldAuction || isAuctionLegal || isWebsiteLegal || isNotFound || (!isMobile && isHome)) ? (
    <div className={isHome ? 'hidden md:contents' : 'contents'}>
    <Header
      activePath={isAuctionLegal ? 'fold-auction' : routePath}
      backgroundClassName={isWebsiteLegal || isNotFound || headerBackgroundPath === 'participate' || headerBackgroundPath === 'auction/legal' ? 'bg-white' : 'bg-[#d9fce8]'}
      desktopPositionClassName="md:fixed md:left-0 md:top-0"
      showDesktop={!isMobile}
      showMobile={isParticipate || isFoldAuction || isAuctionLegal || isWebsiteLegal || isNotFound || (!isMobile && isHome)}
    />
    </div>
  ) : null;

  if (isNotFound) {
    return <>{sharedHeader}<NotFoundPage /></>;
  }

  if (isFoldAuction) {
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

  if (routePath === 'privacy' || routePath === 'terms') {
    return (
      <>
        {sharedHeader}
        <WebsiteLegalPage page={routePath} />
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
      <div className="hidden md:contents">
        {isMobile !== true && <Desktop />}
      </div>
      <div className="contents md:hidden">
        {isMobile !== false && <><SiteMobileHeader /><MobileVersion /></>}
      </div>
      {heroOverlay && <HeroTransitionOverlay key={heroOverlay.id} overlay={heroOverlay} />}
    </>
  );
}
