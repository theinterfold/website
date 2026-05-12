import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollFadeIn({ children, delay = 0, className }: ScrollFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

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
            delay,
            ease: [0.22, 1, 0.36, 1]
          }
        },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
