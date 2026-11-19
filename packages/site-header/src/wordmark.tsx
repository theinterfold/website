import type { HeaderWordmarkProps } from "./types";
import type { CSSProperties } from "react";
import { LOCKUP, LOCKUP_WORDMARK_PATHS } from "./brandLockup";

// Preserve the approved type size while using the brand kit's original outlines.
const WORDMARK_SCALE = 120.421 / LOCKUP.wordmarkWidth;
const GOVERNANCE_ROW = LOCKUP.wordmarkHeight + 24;
const GOVERNANCE_WIDTH = (237 - 124.7) / WORDMARK_SCALE;
export function HeaderWordmark({ governance = false }: HeaderWordmarkProps) {
  return (
    <svg
      className="site-header-wordmark"
      data-governance={governance || undefined}
      viewBox={`${LOCKUP.wordmarkX} 0 ${governance ? 237 / WORDMARK_SCALE : LOCKUP.wordmarkWidth} ${LOCKUP.wordmarkHeight}`}
      preserveAspectRatio={governance ? "xMaxYMin slice" : "xMinYMin meet"}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {LOCKUP_WORDMARK_PATHS.map((d, index) => <path key={index} d={d} />)}
      {governance && (
        <svg
          x={LOCKUP.wordmarkX + 124.7 / WORDMARK_SCALE - 6}
          y={-12}
          width={GOVERNANCE_WIDTH + 12}
          height={GOVERNANCE_ROW}
          viewBox={`-6 -12 ${GOVERNANCE_WIDTH + 12} ${GOVERNANCE_ROW}`}
          overflow="hidden"
          className="site-header-governance-window"
        >
          <g
            className="interfold-arrow-slide__track site-header-governance-track"
            style={{ "--interfold-roll-offset": `-${GOVERNANCE_ROW}px` } as CSSProperties}
          >
            {[0, GOVERNANCE_ROW].map((offset) => (
              <text
                key={offset}
                x={0}
                y={LOCKUP.baseline + offset}
                className="site-header-governance"
                fontSize={22 / WORDMARK_SCALE}
                letterSpacing={-.66 / WORDMARK_SCALE}
              >
                Governance
              </text>
            ))}
          </g>
        </svg>
      )}
    </svg>
  );
}
