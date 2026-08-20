import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { requestReveal } from './revealSequencer';

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollFadeIn({ children, delay = 0, className }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  // Set once the sequencer has handed this element its slot in the running
  // order. Until then it stays hidden, even if it is already in view.
  const [revealDelay, setRevealDelay] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || revealDelay !== null) {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }

    requestReveal({
      node,
      y: node.getBoundingClientRect().top + window.scrollY,
      delayMs: delay * 1000,
      spanMs: 0,
      start: setRevealDelay,
    });
  }, [delay, isInView, revealDelay, shouldReduceMotion]);

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: revealDelay ?? 0,
            ease: [0.22, 1, 0.36, 1]
          }
        },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldReduceMotion || revealDelay !== null ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
