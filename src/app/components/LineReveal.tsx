import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Reveals text one line at a time with the site's fade-up motion
// (opacity 0 -> 1, y 16 -> 0), staggering each line so they rise in sequence.
// Uses the same useInView + animate mechanism as ScrollFadeIn.
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`block ${className}`} ref={ref}>
      {lines.map((line, index) => (
        <motion.span
          animate={shouldReduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          className={`block ${lineClassName}`}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          key={index}
          transition={{ duration: 0.6, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}
