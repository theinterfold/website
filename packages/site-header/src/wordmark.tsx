import type { HeaderWordmarkProps } from "./types";
import { LOCKUP, LOCKUP_WORDMARK_PATHS } from "./brandLockup";

// Preserve the approved type size while using the brand kit's original outlines.
const WORDMARK_SCALE = 120.421 / LOCKUP.wordmarkWidth;
export function HeaderWordmark({ governance = false }: HeaderWordmarkProps) {
  return (
    <svg
      className="site-header-wordmark"
      data-governance={governance || undefined}
      viewBox={`${LOCKUP.wordmarkX} 0 ${governance ? 237 / WORDMARK_SCALE : LOCKUP.wordmarkWidth} ${LOCKUP.wordmarkHeight}`}
      preserveAspectRatio="xMinYMin meet"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {LOCKUP_WORDMARK_PATHS.map((d, index) => <path key={index} d={d} />)}
      {governance && (
        <text
          x={LOCKUP.wordmarkX + 124.7 / WORDMARK_SCALE}
          y={LOCKUP.baseline}
          className="site-header-governance"
          fontSize={22 / WORDMARK_SCALE}
          letterSpacing={-.66 / WORDMARK_SCALE}
        >
          Governance
        </text>
      )}
    </svg>
  );
}
