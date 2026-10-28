"use client";

import { Check, UsersRound, UserRound, HeartHandshake } from "lucide-react";
import { packages as pricing } from "@/data/ishantam";
import { useBooking } from "./BookingContext";
import { useLocale } from "./LocaleContext";
import { Arrow } from "./primitives";
import styles from "./Home.module.css";
import { PackageFrame } from "./PackageFrame";

const packageIcons = { individual: UserRound, couple: HeartHandshake, family: UsersRound };
export function Packages() {
  const { pickAndScroll, selected } = useBooking();
  const { t, locale } = useLocale();
  const p = t.packages;
  return (
    <section id="packages" className={styles.packages} aria-labelledby="packages-heading"><div className="shell"><header className={styles.centerHead}><span className="eyebrow">{p.eyebrow}</span><h2 id="packages-heading" tabIndex={-1} className="display-l">{p.titlePre} <em>{p.titleItalic}</em></h2><p className="body">{p.intro}</p></header><div className={styles.packagesGrid}>{p.items.map((pkg) => {
      const price = pricing.find((item) => item.id === pkg.id)!.priceLabel;
      const isSelected = selected === pkg.id;
      const Icon = packageIcons[pkg.id];
      return <article key={pkg.id} className={`${styles.package} ${isSelected ? styles.packageSelected : ""}`} aria-label={`${pkg.name} — ${price}`}><PackageFrame selected={isSelected} />{isSelected && <span className={styles.packageBadge}>{locale === "hi" ? "आपका चयन" : "Your selection"}</span>}<header><Icon size={25} strokeWidth={1.4} /><h3>{pkg.name}</h3><p>{pkg.forWhom}</p></header><div className={styles.packagePrice}>{price}</div><ul>{pkg.features.map((feature) => <li key={feature}><Check size={14} strokeWidth={1.7} /><span>{feature}</span></li>)}</ul><button type="button" onClick={() => pickAndScroll(pkg.id)} aria-pressed={isSelected} className="btn btn-primary">{isSelected ? p.selectedContinue : pkg.cta}<Arrow /></button></article>;
    })}</div><p className={styles.packageFootnote}>{p.footnote}</p></div></section>
  );
}
