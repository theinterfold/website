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

type ExternalArrowSlideProps = {
  className?: string;
  rowClassName?: string;
};

type ArrowSlideProps = ExternalArrowSlideProps & {
  isExternal?: boolean;
};

type UnderlinedArrowLinkProps = {
  children: string;
  className?: string;
  href: string;
  textClassName: string;
  arrowClassName?: string;
  arrowRowClassName?: string;
  underlineClassName?: string;
};

function isExternalDestination(href: string) {
  return /^(?:https?:|mailto:|tel:)/.test(href);
}

function opensInNewTab(href: string) {
  return /^https?:/.test(href);
}

export function ArrowSlide({
  className = "relative inline-block h-[14px] w-[14px] overflow-hidden text-[14px] leading-none",
  rowClassName = "h-[14px] w-[14px] leading-none",
  isExternal = false,
}: ArrowSlideProps) {
  const arrow = isExternal ? "↗" : "→";

  return (
    <span aria-hidden="true" className={className}>
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
        <span className={rowClassName}>{arrow}</span>
        <span className={rowClassName}>{arrow}</span>
      </span>
    </span>
  );
}

export function ExternalArrowSlide(props: ExternalArrowSlideProps) {
  return <ArrowSlide {...props} isExternal />;
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
  const openInNewTab = opensInNewTab(href);

  return (
    <a
      className={`group ${className}`}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
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

export function UnderlinedArrowLink({
  children,
  className = "inline-flex",
  href,
  textClassName,
  arrowClassName = "relative inline-block h-[13px] w-[13px] overflow-hidden font-['ABC_Gramercy:Regular',sans-serif] text-[13px] leading-none",
  arrowRowClassName = "h-[13px] w-[13px] leading-none",
  underlineClassName = "border-b border-current pb-[3px]",
}: UnderlinedArrowLinkProps) {
  const isExternal = isExternalDestination(href);
  const openInNewTab = opensInNewTab(href);

  return (
    <a
      className={`group items-center gap-1 ${underlineClassName} ${className}`}
      href={href}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      <span className={textClassName}>{children}</span>
      <ArrowSlide className={arrowClassName} isExternal={isExternal} rowClassName={arrowRowClassName} />
    </a>
  );
}
