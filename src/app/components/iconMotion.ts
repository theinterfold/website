import type { Variants } from "motion/react";

// The drawing vocabulary shared by every hand-made icon on the site: outlined
// line work that draws itself on, and solid accent shapes that pop in. Kept in
// one place so a new icon joins the family by importing rather than by copying.

// Container staggers each element so the icon appears to draw itself in.
export const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Open line work draws its stroke on.
export const draw: Variants = {
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
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Stroked line work uses square corners and closed line endings.
export const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

// Pop shapes scale around their own center rather than the SVG origin.
export const popStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

export const ACCENT = "#82f5ad";
