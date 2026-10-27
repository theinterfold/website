import { motion, useReducedMotion } from "framer-motion";
import type { HoverArrowContentProps } from "./motion.types";

export function HoverArrowContent({
  children,
  isExternal = false,
  isHovered,
  textClassName,
  arrowClassName = "absolute left-full ml-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-none text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad] group-focus-visible:text-[#82f5ad]",
  arrowGap,
  align = "center",
  animateInView = false,
}: HoverArrowContentProps) {
  const reducedMotion = useReducedMotion();
  const contentOffset = align === "start" || reducedMotion ? 0 : 8;
  return (
    <span className="relative inline-flex items-center" style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: align === "start" ? "flex-start" : "center", maxWidth: "100%" }}>
      <motion.span
        className={textClassName}
        initial={animateInView ? { opacity: 0 } : undefined}
        whileInView={animateInView ? { opacity: 1 } : undefined}
        viewport={animateInView ? { once: true, amount: 0.8 } : undefined}
        animate={{ x: isHovered ? -contentOffset : 0 }}
        transition={{
          opacity: { duration: 0.22, delay: 0.14, ease: [0.4, 0, 0.2, 1] },
          x: { duration: reducedMotion ? 0 : 0.18, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className={arrowClassName}
        aria-hidden="true"
        style={{ position: "absolute", left: "100%", marginLeft: arrowGap === undefined ? 4 : arrowGap - contentOffset, whiteSpace: "nowrap" }}
        initial={{ opacity: 0, x: reducedMotion ? 0 : -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered || reducedMotion ? 0 : -10 }}
        transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {isExternal ? "↗" : "→"}
      </motion.span>
    </span>
  );
}
