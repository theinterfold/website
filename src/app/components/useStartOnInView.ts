import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

/**
 * Drives the logo marquee's run state from viewport visibility.
 *
 * - On first entry it waits `delayMs` so the section can fade in first, then
 *   starts scrolling (matching the desktop fade-in feel).
 * - It returns to false whenever the marquee scrolls out of view, so the
 *   animation is paused off-screen and never competes with page scrolling
 *   elsewhere (which on mobile caused momentum scroll to stutter/stop).
 * - On re-entry it resumes immediately (no delay), continuing from where it paused.
 */
export function useStartOnInView(delayMs = 700) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [started, setStarted] = useState(false);
  const hasStartedOnce = useRef(false);

  useEffect(() => {
    if (!inView) {
      setStarted(false);
      return;
    }
    const delay = hasStartedOnce.current ? 0 : delayMs;
    const timer = setTimeout(() => {
      setStarted(true);
      hasStartedOnce.current = true;
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, delayMs]);

  return { ref, started };
}
