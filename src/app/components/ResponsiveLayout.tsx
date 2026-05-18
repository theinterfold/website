import { useState, useEffect } from 'react';
import Desktop from '../../imports/Desktop/Desktop';
import { ContentPage } from './ContentPage';
import { MobileVersion } from './MobileVersion';
import { ParticipatePage } from './ParticipatePage';

const MOBILE_BREAKPOINT = 768;
const CONTENT_PAGES = ['community', 'protocol', 'docs'] as const;
type ContentPagePath = typeof CONTENT_PAGES[number];

function getContentPagePath(): ContentPagePath | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const page = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return CONTENT_PAGES.includes(page as ContentPagePath) ? page as ContentPagePath : null;
}

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [contentPage, setContentPage] = useState<ContentPagePath | null>(null);

  useEffect(() => {
    setIsClient(true);
    setContentPage(getContentPagePath());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const checkRoute = () => {
      setContentPage(getContentPagePath());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  // Renderiza versão mobile em telas pequenas, desktop em telas grandes
  if (!isClient) {
    // Durante SSR/primeira renderização, renderiza desktop
    return <Desktop />;
  }

  if (contentPage) {
    return <ContentPage page={contentPage} />;
  }

  if (typeof window !== 'undefined' && window.location.pathname.replace(/^\/+|\/+$/g, '') === 'participate') {
    return <ParticipatePage />;
  }

  return isMobile ? <MobileVersion /> : <Desktop />;
}
