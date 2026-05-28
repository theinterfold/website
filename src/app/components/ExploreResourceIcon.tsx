export type ExploreResourceIconKind = "docs" | "essays" | "blog";

export function ExploreResourceIcon({
  className = "",
  kind,
}: {
  className?: string;
  kind: ExploreResourceIconKind;
}) {
  const accent = "#82f5ad";

  if (kind === "docs") {
    return (
      <svg aria-hidden="true" className={`block ${className}`} fill="none" focusable="false" viewBox="0 0 41.3 56.5">
        <polygon points=".75 .75 .75 55.75 40.55 55.75 40.55 10.05 31.25 .75 .75 .75" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <polyline points="30.95 .75 30.95 10.45 40.55 10.45" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <rect fill={accent} height="5.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="5.2" x="6.25" y="7.35" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="14.65" x2="34.15" y1="22.15" y2="22.15" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="14.65" x2="34.15" y1="29.95" y2="29.95" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="14.65" x2="34.15" y1="37.65" y2="37.65" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="14.65" x2="34.15" y1="46.15" y2="46.15" />
        <circle cx="8.65" cy="22.05" fill={accent} r="1.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <circle cx="8.65" cy="29.85" fill={accent} r="1.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <circle cx="8.65" cy="37.55" fill={accent} r="1.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <circle cx="8.55" cy="46.15" fill={accent} r="1.7" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === "essays") {
    return (
      <svg aria-hidden="true" className={`block ${className}`} fill="none" focusable="false" viewBox="0 0 42.5 56.5">
        <polygon points=".75 .75 .75 55.75 41.75 55.75 41.75 10.15 31.85 .75 .75 .75" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <polyline points="31.65 .85 31.65 10.45 41.35 10.45" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
        <rect fill={accent} height="5.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="5.4" x="6.85" y="7.45" />
        <rect height="13.5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="28.6" x="6.85" y="18.85" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="11.65" x2="29.65" y1="24.05" y2="24.05" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="11.65" x2="21.05" y1="27.75" y2="27.75" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="6.15" x2="36.05" y1="37.35" y2="37.35" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="6.15" x2="36.05" y1="42.75" y2="42.75" />
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="6.15" x2="21.05" y1="47.95" y2="47.95" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={`block ${className}`} fill="none" focusable="false" viewBox="0 0 41.8 56.5">
      <polygon points=".75 .75 .75 55.75 41.05 55.75 41.05 10.15 32.25 .75 .75 .75" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
      <polyline points="31.95 .85 31.95 10.45 40.75 10.45" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
      <rect fill={accent} height="5.4" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="5.4" x="6.95" y="7.45" />
      <rect fill={accent} height="21.6" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="28.9" x="6.95" y="16.9" />
      <rect fill={accent} height="6.8" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" width="6.4" x="6.95" y="42.55" />
      <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="18.25" x2="35.85" y1="43.65" y2="43.65" />
      <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="18.25" x2="27.55" y1="47.75" y2="47.75" />
      <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="6.95" x2="35.85" y1="38.5" y2="16.9" />
      <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" x1="35.85" x2="6.95" y1="38.5" y2="16.9" />
    </svg>
  );
}
