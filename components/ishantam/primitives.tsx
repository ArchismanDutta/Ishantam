// Small UI primitives shared across sections.
// Deliberately tiny — no icon library decoration, no emoji.

export function Arrow({ className = "btn-arrow", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
    </svg>
  );
}

export function Diamond({ size = 7, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" style={{ display: "inline-block" }}>
      <rect x="1.5" y="1.5" width="7" height="7" transform="rotate(45 5 5)" fill={color} />
    </svg>
  );
}

export function HairlineOrnament() {
  return (
    <span className="mark" aria-hidden="true" style={{ color: "var(--brass)" }}>
      <Diamond size={8} />
    </span>
  );
}
