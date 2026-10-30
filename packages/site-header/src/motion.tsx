import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { requestReveal } from "./revealSequencer";
import type { ScrollFadeInProps } from "./motion.types";

export { requestReveal } from "./revealSequencer";

const elements = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  h1: motion.h1,
  p: motion.p,
};
const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };

/** The main website's entrance motion, shared with Governance. */
export function ScrollFadeIn({
  children,
  delay = 0,
  as = "div",
  amount = 0.3,
  ...props
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const shouldReduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const Element = elements[as];

  useEffect(() => {
    if (shouldReduceMotion) setRevealed(true);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || revealed || focused) return;
    const node = ref.current;
    if (!node) return;

    return requestReveal({
      node,
      y: node.getBoundingClientRect().top + window.scrollY,
      delayMs: delay * 1000,
      spanMs: 0,
      start: () => setRevealed(true),
    });
  }, [delay, isInView, revealed, focused, shouldReduceMotion]);

  return (
    <Element
      {...props}
      ref={ref}
      initial={shouldReduceMotion ? visible : hidden}
      animate={shouldReduceMotion || revealed || focused ? visible : hidden}
      transition={{ duration: shouldReduceMotion || focused ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </Element>
  );
}

export { HoverArrowContent } from "./hoverArrow";
export { SiteCtaLink } from "./ctaLink";
export { ArrowSlide, ExternalArrowSlide, UnderlinedArrowLink } from "./arrowLink";

export { SiteDropdownPanel } from "./dropdownPanel";
