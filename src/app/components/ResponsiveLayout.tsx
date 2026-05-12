import { useState, useEffect } from 'react';
import Desktop from '../../imports/Desktop/Desktop';
import { MobileVersion } from './MobileVersion';

export function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Renderiza versão mobile em telas pequenas, desktop em telas grandes
  if (!isClient) {
    // Durante SSR/primeira renderização, renderiza desktop
    return <Desktop />;
  }

  return isMobile ? <MobileVersion /> : <Desktop />;
}
