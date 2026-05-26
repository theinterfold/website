import { useState } from "react";
import { motion } from "motion/react";

type HoverArrowContentProps = {
  children: string;
  isExternal?: boolean;
  isHovered: boolean;
  textClassName: string;
  arrowClassName?: string;
  animateInView?: boolean;
};

type HoverArrowLinkProps = Omit<HoverArrowContentProps, "isExternal" | "isHovered"> & {
  className: string;
  href: string;
};

function isExternalDestination(href: string) {
  return /^(?:https?:|mailto:|tel:)/.test(href);
}

export function HoverArrowContent({
  children,
  isExternal = false,
  isHovered,
  textClassName,
  arrowClassName = "absolute left-full ml-1 font-['ABC_Gramercy:Regular',sans-serif] text-[14px] leading-none text-[#3a5e3c] transition-colors group-hover:text-[#82f5ad]",
  animateInView = false,
}: HoverArrowContentProps) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <motion.span
        className={textClassName}
        initial={animateInView ? { opacity: 0 } : undefined}
        whileInView={animateInView ? { opacity: 1 } : undefined}
        viewport={animateInView ? { once: true, amount: 0.8 } : undefined}
        animate={{ x: isHovered ? -8 : 0 }}
        transition={{
          opacity: { duration: 0.22, delay: 0.14, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className={arrowClassName}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {isExternal ? "↗" : "→"}
      </motion.span>
    </span>
  );
}

export function HoverArrowLink({
  children,
  className,
  href,
  textClassName,
  arrowClassName,
  animateInView,
}: HoverArrowLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`group ${className}`}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverArrowContent
        animateInView={animateInView}
        arrowClassName={arrowClassName}
        isExternal={isExternalDestination(href)}
        isHovered={isHovered}
        textClassName={textClassName}
      >
        {children}
      </HoverArrowContent>
    </a>
  );
}
