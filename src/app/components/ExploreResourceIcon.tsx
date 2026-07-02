import { motion, useReducedMotion, type Variants } from "motion/react";

export type ExploreResourceIconKind = "docs" | "essays" | "blog";

// Container staggers each element so the icon appears to draw itself in.
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Open line work draws its stroke on.
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.15 },
    },
  },
};

// Solid accent shapes pop in cleanly (they never look "half-drawn").
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Stroked line work uses square corners and clean, flat line endings.
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
} as const;

// Pop shapes scale around their own center rather than the SVG origin.
const popStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

export function ExploreResourceIcon({
  className = "",
  kind,
}: {
  className?: string;
  kind: ExploreResourceIconKind;
}) {
  const accent = "#82f5ad";
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is requested, render everything in its final state
  // with no scroll-triggered animation.
  const motionProps = prefersReducedMotion
    ? ({ initial: "visible" } as const)
    : ({
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.5 },
      } as const);

  if (kind === "docs") {
    return (
      <motion.svg
        aria-hidden="true"
        className={`block ${className}`}
        fill="none"
        focusable="false"
        variants={container}
        viewBox="0 0 41.3 56.5"
        {...motionProps}
      >
        <motion.polygon variants={draw} points=".75 .75 .75 55.75 40.55 55.75 40.55 10.05 31.25 .75 .75 .75" {...stroke} />
        <motion.polyline variants={draw} points="30.95 .75 30.95 10.45 40.55 10.45" {...stroke} />
        <motion.rect variants={pop} style={popStyle} fill={accent} height="5.4" width="5.2" x="6.25" y="7.35" {...stroke} />
        <motion.line variants={draw} x1="14.65" x2="34.15" y1="22.15" y2="22.15" {...stroke} />
        <motion.line variants={draw} x1="14.65" x2="34.15" y1="29.95" y2="29.95" {...stroke} />
        <motion.line variants={draw} x1="14.65" x2="34.15" y1="37.65" y2="37.65" {...stroke} />
        <motion.line variants={draw} x1="14.65" x2="34.15" y1="46.15" y2="46.15" {...stroke} />
        <motion.circle variants={pop} style={popStyle} cx="8.65" cy="22.05" fill={accent} r="1.7" {...stroke} />
        <motion.circle variants={pop} style={popStyle} cx="8.65" cy="29.85" fill={accent} r="1.7" {...stroke} />
        <motion.circle variants={pop} style={popStyle} cx="8.65" cy="37.55" fill={accent} r="1.7" {...stroke} />
        <motion.circle variants={pop} style={popStyle} cx="8.55" cy="46.15" fill={accent} r="1.7" {...stroke} />
      </motion.svg>
    );
  }

  if (kind === "essays") {
    return (
      <motion.svg
        aria-hidden="true"
        className={`block ${className}`}
        fill="none"
        focusable="false"
        variants={container}
        viewBox="0 0 42.5 56.5"
        {...motionProps}
      >
        <motion.polygon variants={draw} points=".75 .75 .75 55.75 41.75 55.75 41.75 10.15 31.85 .75 .75 .75" {...stroke} />
        <motion.polyline variants={draw} points="31.65 .85 31.65 10.45 41.35 10.45" {...stroke} />
        <motion.rect variants={pop} style={popStyle} fill={accent} height="5.4" width="5.4" x="6.85" y="7.45" {...stroke} />
        <motion.rect variants={draw} height="13.5" width="28.6" x="6.85" y="18.85" {...stroke} />
        <motion.line variants={draw} x1="11.65" x2="29.65" y1="24.05" y2="24.05" {...stroke} />
        <motion.line variants={draw} x1="11.65" x2="21.05" y1="27.75" y2="27.75" {...stroke} />
        <motion.line variants={draw} x1="6.15" x2="36.05" y1="37.35" y2="37.35" {...stroke} />
        <motion.line variants={draw} x1="6.15" x2="36.05" y1="42.75" y2="42.75" {...stroke} />
        <motion.line variants={draw} x1="6.15" x2="21.05" y1="47.95" y2="47.95" {...stroke} />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      aria-hidden="true"
      className={`block ${className}`}
      fill="none"
      focusable="false"
      variants={container}
      viewBox="0 0 41.8 56.5"
      {...motionProps}
    >
      <motion.polygon variants={draw} points=".75 .75 .75 55.75 41.05 55.75 41.05 10.15 32.25 .75 .75 .75" {...stroke} />
      <motion.polyline variants={draw} points="31.95 .85 31.95 10.45 40.75 10.45" {...stroke} />
      <motion.rect variants={pop} style={popStyle} fill={accent} height="5.4" width="5.4" x="6.45" y="7.45" {...stroke} />
      <motion.rect variants={pop} style={popStyle} fill={accent} height="21.6" width="28.9" x="6.45" y="16.9" {...stroke} />
      <motion.rect variants={pop} style={popStyle} fill={accent} height="6.8" width="6.4" x="6.45" y="42.55" {...stroke} />
      <motion.line variants={draw} x1="17.75" x2="35.35" y1="43.65" y2="43.65" {...stroke} />
      <motion.line variants={draw} x1="17.75" x2="27.05" y1="47.75" y2="47.75" {...stroke} />
      <motion.line variants={draw} x1="6.45" x2="35.35" y1="38.5" y2="16.9" {...stroke} />
      <motion.line variants={draw} x1="35.35" x2="6.45" y1="38.5" y2="16.9" {...stroke} />
    </motion.svg>
  );
}
