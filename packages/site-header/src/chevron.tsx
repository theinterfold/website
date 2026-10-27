import type { CSSProperties } from "react";
import type { BendingChevronProps } from "./types";

/** The homepage chevron: two arms bend through a line, without spinning the icon. */
export function BendingChevron({
  open,
  width = 10,
  thickness = 1.6,
  className = "",
  style,
}: BendingChevronProps) {
  return (
    <span
      aria-hidden="true"
      className={`interfold-chevron ${className}`}
      data-open={open}
      style={{
        "--chevron-width": typeof width === "number" ? `${width}px` : width,
        "--chevron-thickness": typeof thickness === "number" ? `${thickness}px` : thickness,
        ...style,
      } as CSSProperties}
    >
      <span className="interfold-chevron-arm interfold-chevron-left" />
      <span className="interfold-chevron-arm interfold-chevron-right" />
    </span>
  );
}
