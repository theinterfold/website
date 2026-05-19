import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Desktop from '../../imports/Desktop/Desktop';
import { ContentPage, Header } from './ContentPage';
import { MobileVersion } from './MobileVersion';
import { ParticipatePage } from './ParticipatePage';

const MOBILE_BREAKPOINT = 768;
const CONTENT_PAGES = ['community', 'protocol', 'docs'] as const;
type ContentPagePath = typeof CONTENT_PAGES[number];
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

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

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [routePath, setRoutePath] = useState(getPagePath);

  useEffect(() => {
    setIsClient(true);
    const currentPath = getPagePath();
    applyPageTheme(currentPath);
    setRoutePath(currentPath);

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

    const startRouteTransition = (commit: () => void) => {
      const viewTransitionDocument = document as ViewTransitionDocument;
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!viewTransitionDocument.startViewTransition || shouldReduceMotion) {
        commit();
        return;
      }

      viewTransitionDocument.startViewTransition(commit);
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
        window.scrollTo(0, 0);
        commitRoutePath();
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
      desktopPositionClassName={isHome ? 'md:absolute md:left-0 md:top-0' : 'md:sticky md:top-0'}
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
          desktopPositionClassName="md:absolute md:left-0 md:top-0"
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
