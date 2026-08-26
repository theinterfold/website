import { motion, useReducedMotion } from "motion/react";
import { ACCENT, container, draw, pop, popStyle, stroke } from "./iconMotion";

// Small marks that sit above a page title, in the same drawing language as the
// Explore icons: 1.5 outline, square caps, mitred corners, and exactly one
// solid accent shape carrying the mint.
//
// Each one states its title rather than decorating it:
//   inputs — several private things go in, one shared result comes out.
//   roles  — three different shapes standing on one common base line.
export type TitleGlyphVariant = "inputs" | "roles";

export function TitleGlyph({
  className = "",
  variant,
}: {
  className?: string;
  variant: TitleGlyphVariant;
}) {
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

  if (variant === "inputs") {
    return (
      <motion.svg
        aria-hidden="true"
        className={`block ${className}`}
        fill="none"
        focusable="false"
        variants={container}
        viewBox="0 0 44 40"
        {...motionProps}
      >
        {/* Three sealed inputs. */}
        <motion.rect variants={draw} x=".75" y="3.75" width="8" height="8" {...stroke} />
        <motion.rect variants={draw} x=".75" y="16" width="8" height="8" {...stroke} />
        <motion.rect variants={draw} x=".75" y="28.25" width="8" height="8" {...stroke} />
        {/* Converging on one computation. */}
        <motion.line variants={draw} x1="9.5" y1="7.75" x2="24" y2="20" {...stroke} />
        <motion.line variants={draw} x1="9.5" y1="20" x2="24" y2="20" {...stroke} />
        <motion.line variants={draw} x1="9.5" y1="32.25" x2="24" y2="20" {...stroke} />
        <motion.line variants={draw} x1="24" y1="20" x2="35" y2="20" {...stroke} />
        {/* The one outcome everyone shares. */}
        <motion.rect
          variants={pop}
          style={popStyle}
          x="35"
          y="17.4"
          width="5.2"
          height="5.2"
          fill={ACCENT}
          {...stroke}
        />
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
      viewBox="0 0 44 40"
      {...motionProps}
    >
      {/* Three deliberately different shapes: the roles are not interchangeable. */}
      <motion.rect variants={draw} x="2.75" y="2.75" width="9" height="9" {...stroke} />
      <motion.circle variants={draw} cx="22" cy="7.25" r="4.5" {...stroke} />
      {/* A triangle, not a hexagon: at 48px a hexagon reads as a second circle. */}
      <motion.polygon variants={draw} points="36.5 2.75 41.5 11.75 31.5 11.75" {...stroke} />
      {/* Each standing on the same base. */}
      <motion.line variants={draw} x1="7.25" y1="12.5" x2="7.25" y2="25" {...stroke} />
      <motion.line variants={draw} x1="22" y1="12.5" x2="22" y2="25" {...stroke} />
      <motion.line variants={draw} x1="36.5" y1="13" x2="36.5" y2="25" {...stroke} />
      <motion.line variants={draw} x1=".75" y1="26" x2="43.25" y2="26" {...stroke} />
      <motion.rect
        variants={pop}
        style={popStyle}
        x="19.4"
        y="31"
        width="5.2"
        height="5.2"
        fill={ACCENT}
        {...stroke}
      />
    </motion.svg>
  );
}
