import styles from "./PackageFrame.module.css";

export function PackageFrame({ selected }: { selected: boolean }) {
  return <div className={`${styles.frame} ${selected ? styles.selected : ""}`} aria-hidden="true">
    {[0, 1, 2, 3].map((corner) => <svg key={corner} className={styles.corner} viewBox="0 0 36 36" fill="none" focusable="false">
      <path d="M0 31V0H31" stroke="currentColor" strokeWidth="2" />
      <path d="M6 27V6H27" stroke="currentColor" strokeWidth=".8" />
      <path d="M6 6C19 6 22 18 15 19C10 20 9 14 13 13C16 12 17 16 14 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M0 33L3 30L0 27M33 0L30 3L27 0" stroke="currentColor" strokeWidth="1" />
    </svg>)}
  </div>;
}
