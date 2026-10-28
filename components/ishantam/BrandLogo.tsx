import Image from "next/image";
import styles from "./BrandLogo.module.css";

export function BrandLogo({ size = "header", preload = false }: { size?: "header" | "menu" | "footer" | "compact"; preload?: boolean }) {
  return <Image src="/images/ishantam-logo-transparent.webp" alt="Ishantam — Connecting Devotion" width={1254} height={1254} sizes={size === "footer" ? "(max-width: 540px) 132px, 160px" : "(max-width: 540px) 84px, 104px"} preload={preload} className={`${styles.logo} ${styles[size]}`} />;
}
