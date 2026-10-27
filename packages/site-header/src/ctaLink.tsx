import { useState } from "react";
import { HoverArrowContent } from "./hoverArrow";
import type { SiteCtaLinkProps } from "./motion.types";

/** The website's editorial CTA, also used by the Governance hero. */
export function SiteCtaLink({
  children,
  href,
  variant = "primary",
  className = "",
  as: Link = "a",
}: SiteCtaLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const external = /^(?:https?:|mailto:|tel:)/.test(href);
  const newTab = /^https?:/.test(href);

  return (
    <Link
      className={`site-cta-link ${className}`}
      data-variant={variant}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rel={newTab ? "noopener noreferrer" : undefined}
      target={newTab ? "_blank" : undefined}
    >
      <HoverArrowContent
        isExternal={external}
        isHovered={hovered || focused}
        textClassName="site-cta-label"
        arrowClassName="site-cta-arrow"
      >
        {children}
      </HoverArrowContent>
    </Link>
  );
}
