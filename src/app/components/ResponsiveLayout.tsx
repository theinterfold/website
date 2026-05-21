import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Desktop from '../../imports/Desktop/Desktop';
import { ContentPage, Header } from './ContentPage';
import { MobileVersion } from './MobileVersion';
import { ParticipatePage } from './ParticipatePage';

const MOBILE_BREAKPOINT = 768;
const CONTENT_PAGES = ['community', 'protocol', 'docs'] as const;
type ContentPagePath = typeof CONTENT_PAGES[number];
type ViewTransitionHandle = {
  finished: Promise<void>;
};
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

const CONTENT_ONLY_TRANSITION_CLASS = 'interfold-transition-content-only';
const CONTENT_ONLY_EXIT_CLASS = 'interfold-transition-content-exit';
const CONTENT_ONLY_ENTER_CLASS = 'interfold-transition-content-enter';
const CONTENT_ONLY_EXIT_DURATION_MS = 240;
const CONTENT_ONLY_ENTER_DURATION_MS = 280;

function getPagePath() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

function getContentPagePath(page = getPagePath()): ContentPagePath | null {
  return CONTENT_PAGES.includes(page as ContentPagePath) ? page as ContentPagePath : null;
}

function applyPageTheme(page = getPagePath()) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('interfold-theme-participate', page === 'participate');
}

function isCurrentHeroVisible() {
  const hero = document.querySelector('.interfold-hero-transition');

  if (!(hero instanceof HTMLElement)) {
    return false;
  }

  const rect = hero.getBoundingClientRect();
  const headerOffset = 64;

  return rect.bottom > headerOffset && rect.top < window.innerHeight;
}

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [routePath, setRoutePath] = useState(getPagePath);

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
    let transitionClassCleanupTimer: number | undefined;
    let contentOnlyCommitTimer: number | undefined;

    const clearTransitionModeClasses = () => {
      document.documentElement.classList.remove(CONTENT_ONLY_TRANSITION_CLASS);
      document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
      document.documentElement.classList.remove(CONTENT_ONLY_ENTER_CLASS);
    };

    const scheduleTransitionClassCleanup = () => {
      if (transitionClassCleanupTimer) {
        window.clearTimeout(transitionClassCleanupTimer);
      }

      transitionClassCleanupTimer = window.setTimeout(clearTransitionModeClasses, CONTENT_ONLY_ENTER_DURATION_MS);
    };

    const startRouteTransition = (commit: () => void) => {
      const viewTransitionDocument = document as ViewTransitionDocument;
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (contentOnlyCommitTimer) {
        window.clearTimeout(contentOnlyCommitTimer);
      }

      if (shouldReduceMotion) {
        commit();
        return;
      }

      clearTransitionModeClasses();

      if (!isCurrentHeroVisible()) {
        document.documentElement.classList.add(CONTENT_ONLY_TRANSITION_CLASS);
        document.documentElement.classList.add(CONTENT_ONLY_EXIT_CLASS);
        contentOnlyCommitTimer = window.setTimeout(() => {
          document.documentElement.classList.remove(CONTENT_ONLY_EXIT_CLASS);
          document.documentElement.classList.add(CONTENT_ONLY_ENTER_CLASS);
          commit();
          scheduleTransitionClassCleanup();
        }, CONTENT_ONLY_EXIT_DURATION_MS);
        return;
      }

      if (!viewTransitionDocument.startViewTransition) {
        commit();
        return;
      }

      const transition = viewTransitionDocument.startViewTransition(commit);
      void transition.finished.catch(() => undefined);
    };

    const checkRoute = () => {
      startRouteTransition(commitRoutePath);
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

      if (nextRoute !== '' && nextRoute !== 'participate') {
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
      });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('popstate', checkRoute);
    document.addEventListener('click', handleInternalLinkClick);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('popstate', checkRoute);
      document.removeEventListener('click', handleInternalLinkClick);
      if (transitionClassCleanupTimer) {
        window.clearTimeout(transitionClassCleanupTimer);
      }
      if (contentOnlyCommitTimer) {
        window.clearTimeout(contentOnlyCommitTimer);
      }
      clearTransitionModeClasses();
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const contentPage = getContentPagePath(routePath);
  const isHome = routePath === '';
  const isParticipate = routePath === 'participate';
  const sharedHeader = (isParticipate || (!isMobile && isHome)) ? (
    <Header
      activePath={routePath}
      animateOpening
      backgroundClassName={isParticipate ? 'bg-white' : 'bg-[#d9fce8]'}
      desktopPositionClassName="md:fixed md:left-0 md:top-0"
      showDesktop={!isMobile}
      showMobile={isParticipate}
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

  if (contentPage) {
    return <ContentPage page={contentPage} />;
  }

  if (isParticipate) {
    return (
      <>
        {sharedHeader}
        <ParticipatePage />
      </>
    );
  }

  return (
    <>
      {sharedHeader}
      {isMobile ? <MobileVersion /> : <Desktop />}
    </>
  );
}
