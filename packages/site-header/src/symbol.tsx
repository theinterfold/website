// The official Interfold brand symbol (filled, pointed tips).
// Recolour via the `text-*` colour (fill uses currentColor).
// The official mark is an outlined shape converted to a filled path. Its
// straight band is 48.1079 units in a 1000-unit viewBox; use that proportion
// when drawing companion outline glyphs without altering the brand artwork.
export const INTERFOLD_OUTLINE_RATIO = 48.1079 / 1000;
export const INTERFOLD_SYMBOL_ASPECT_RATIO = 1000 / 844;

import { LOCKUP, LOCKUP_SYMBOL_PATH } from "./brandLockup";

export function InterfoldSymbol({ className = "", animated = false, lockup = false }: { className?: string; animated?: boolean; lockup?: boolean }) {
  return (
    <svg
      className={`interfold-symbol ${className}`}
      data-symbol-animated={animated || undefined}
      suppressHydrationWarning
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox={lockup ? `0 0 ${LOCKUP.symbolWidth} ${LOCKUP.height}` : "0 0 1000 844"}
    >
      {lockup ? <path className="interfold-symbol-rest" d={LOCKUP_SYMBOL_PATH} fill="currentColor" /> : <path
        className="interfold-symbol-rest"
        d="M764.414 232.163L552.883 23.7045L447.117 127.934L341.351 23.7045L0 360.097V369.911V786.827V844L235.586 611.837L447.117 820.296L552.883 716.066L658.649 820.296L1000 483.903V0L764.414 232.163ZM764.414 299.149L941.934 474.089L870.18 544.8L481.13 161.452L552.883 90.7413L764.414 299.2V299.149ZM730.453 474.14L658.7 544.851L375.364 265.631L447.117 194.92L730.453 474.14ZM624.687 578.369L552.934 649.08L269.649 369.86L341.402 299.149L624.738 578.369H624.687ZM235.586 194.92L307.339 265.631L235.586 336.342L163.832 265.631L235.586 194.92ZM764.414 507.658L836.168 578.369L764.414 649.08L692.661 578.369L764.414 507.658ZM341.351 232.163L269.598 161.452L341.351 90.7413L413.105 161.452L341.351 232.163ZM48.1079 427.083L201.624 578.369L48.1079 729.655V427.133V427.083ZM235.586 544.851L58.0665 369.911L129.82 299.2L518.921 682.649L447.168 753.359L235.637 544.901L235.586 544.851ZM658.649 611.887L730.402 682.598L658.649 753.309L586.896 682.598L658.649 611.887ZM951.943 416.917L798.427 265.631L951.943 114.345V416.917Z"
        fill="currentColor"
      />}
      {animated && <image className="interfold-symbol-motion"
        y={lockup ? LOCKUP.symbolTop : 0}
        width={lockup ? LOCKUP.symbolWidth : 1000}
        height={lockup ? LOCKUP.symbolHeight : 844}
        preserveAspectRatio={lockup ? "none" : "xMidYMid meet"}
        suppressHydrationWarning />}

    </svg>
  );
}
