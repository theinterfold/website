import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { requestReveal } from "./revealSequencer";

// Reveals a single string one *rendered* line at a time. It measures where the
// text actually wraps (re-measuring on resize and after fonts load), then
// staggers each line with the site's fade-up motion. Use for headings that are
// a single sentence which wraps, where the line breaks are not known up front.
export function LineRevealAuto({
  text,
  className = "",
  delay = 0,
  stagger = 0.09,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  // Base delay handed back by the sequencer; each line staggers on top of it.
  const [revealDelay, setRevealDelay] = useState<number | null>(null);

  // Wait for a slot in the page-wide running order rather than starting the
  // moment this block scrolls into view. Reserves enough time for every line,
  // so whatever follows does not start until this block has finished.
  useEffect(() => {
    if (!isInView || !lines || shouldReduceMotion || revealDelay !== null) {
      return;
    }
    const node = wrapperRef.current;
    if (!node) {
      return;
    }

    requestReveal({
      y: node.getBoundingClientRect().top + window.scrollY,
      delayMs: delay * 1000,
      spanMs: Math.max(lines.length - 1, 0) * stagger * 1000,
      start: setRevealDelay,
    });
  }, [delay, isInView, lines, revealDelay, shouldReduceMotion, stagger]);

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) {
      return;
    }

    const compute = () => {
      const wordSpans = Array.from(node.querySelectorAll<HTMLElement>("[data-word]"));
      if (!wordSpans.length) {
        return;
      }

      const result: string[] = [];
      let currentTop: number | null = null;
      let current = "";

      wordSpans.forEach((span) => {
        const top = span.offsetTop;
        const word = span.textContent ?? "";
        if (currentTop === null || Math.abs(top - currentTop) < 1) {
          current = current ? `${current} ${word}` : word;
          currentTop = currentTop ?? top;
        } else {
          result.push(current);
          current = word;
          currentTop = top;
        }
      });

      if (current) {
        result.push(current);
      }

      setLines((previous) =>
        previous && previous.length === result.length && previous.every((line, i) => line === result[i])
          ? previous
          : result,
      );
    };

    compute();

    const target = node.parentElement ?? node;
    const observer = new ResizeObserver(compute);
    observer.observe(target);

    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          compute();
        }
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [text]);

  return (
    <span className={`relative block ${className}`} ref={wrapperRef}>
      {/* Measurement layer: laid out at the real width to detect line breaks. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 block opacity-0"
        ref={measureRef}
        style={{ visibility: lines ? "hidden" : "visible" }}
      >
        {words.map((word, index) => (
          <span data-word key={index}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>

      {/* Height reservation before the first measurement completes. */}
      {!lines && (
        <span aria-hidden="true" className="block opacity-0">
          {text}
        </span>
      )}

      {lines && (
        <span aria-label={text} className="block">
          {lines.map((line, index) => (
            <motion.span
              animate={shouldReduceMotion || revealDelay !== null ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              aria-hidden="true"
              className="block"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              key={index}
              transition={{ duration: 0.6, delay: (revealDelay ?? 0) + index * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </span>
      )}
    </span>
  );
}
