import type { ArrowSlideProps, UnderlinedArrowLinkProps } from "./motion.types";

/** The homepage's persistent arrow, rolling once on link hover or focus. */
export function ArrowSlide({
  className = "relative inline-block h-[14px] w-[14px] overflow-hidden text-[14px] leading-none",
  rowClassName = "h-[14px] w-[14px] leading-none",
  isExternal = false,
}: ArrowSlideProps) {
  const arrow = isExternal ? "↗" : "→";
  return (
    <span aria-hidden="true" className={`interfold-arrow-slide ${className}`}>
      <span className="interfold-arrow-slide__track">
        <span className={rowClassName}>{arrow}</span>
        <span className={rowClassName}>{arrow}</span>
      </span>
    </span>
  );
}

export function ExternalArrowSlide(props: Omit<ArrowSlideProps, "isExternal">) {
  return <ArrowSlide {...props} isExternal />;
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
  const isExternal = /^(?:https?:|mailto:|tel:)/.test(href);
  const openInNewTab = /^https?:/.test(href);
  return (
    <a
      className={`group interfold-underlined-arrow-link items-center gap-1 ${underlineClassName} ${className}`}
      href={href}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      <span className={textClassName}>{children}</span>
      <ArrowSlide className={arrowClassName} isExternal={isExternal} rowClassName={arrowRowClassName} />
    </a>
  );
}
