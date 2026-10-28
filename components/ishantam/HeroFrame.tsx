import styles from "./HeroBanner.module.css";

/** Fixed-proportion ornaments keep their curves as the surrounding frame resizes. */
export function HeroFrame() {
  return (
    <div className={styles.bannerFrame} aria-hidden="true">
      {["top", "bottom"].map((position) => (
        <svg key={position} className={position === "top" ? styles.frameTop : styles.frameBottom} viewBox="0 0 190 130" fill="none" focusable="false">
          <defs>
            <linearGradient id={`hero-gold-${position}`} x1="15" y1="0" x2="160" y2="130" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a97720" /><stop offset=".24" stopColor="#fff0ac" /><stop offset=".47" stopColor="#c59636" /><stop offset=".7" stopColor="#ffe89a" /><stop offset="1" stopColor="#a77725" />
            </linearGradient>
          </defs>
          <g stroke={`url(#hero-gold-${position})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 2C26 2 24 40 65 46C105 52 144 41 170 70C185 88 188 108 188 130" />
            <path d="M65 46C38 32 47 8 63 12C80 16 70 34 60 28C55 25 59 20 63 22" />
            <path d="M118 49C99 58 99 86 116 85C130 84 130 69 120 69C114 69 114 77 120 77" />
            <path d="M147 55C145 41 156 31 167 36C166 47 157 53 147 55Z" strokeWidth="2" />
          </g>
        </svg>
      ))}
    </div>
  );
}
