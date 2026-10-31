"use client";

import Image from "next/image";
import mangalnathArt from "@/public/images/mangalnath-puja-art.webp";
import { MapPin, MessageCircle, Video, UserRound, Flower2 } from "lucide-react";
import { whatsAppLink } from "@/data/ishantam";
import { useLocale } from "./LocaleContext";
import { Arrow } from "./primitives";
import { BookingLink } from "./BookingLink";
import { ReplayTempleEntry } from "./TempleEntry";
import styles from "./Home.module.css";
import banner from "./HeroBanner.module.css";
import tickets from "./HeroTickets.module.css";
import { HeroFrame } from "./HeroFrame";

const detailIcons = [MapPin, UserRound, Flower2, Video];

export function Hero() {
  const { t, locale } = useLocale();
  const h = t.hero;
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className="shell-wide">
        <div className={styles.heroLocation}><MapPin size={13} /><span>{h.eyebrow}</span></div>
        <div className={banner.banner}>
          <HeroFrame />
          <div className={banner.halo} aria-hidden="true" />
          <div className={banner.bannerCopy}>
            <p className={`devanagari ${banner.invocation}`}>{h.invocation}</p>
            <h1 id="hero-heading" tabIndex={-1} className={banner.bannerTitle}>
              <span>{h.titleTop}</span>
              <span>{h.titleBottom} <em>{h.titleItalic}</em></span>
            </h1>
            <p className={banner.sankalp}><Flower2 size={15} strokeWidth={1.4} />{h.supporting[1].value}<span>·</span>{h.supporting[2].value}</p>
            <div className={banner.bannerRule} aria-hidden="true"><span />✦<span /></div>
            <div className={banner.bannerOffer}>
              <div><p>{h.priceEyebrow}</p><strong>{h.priceMain}</strong></div>
              <div className={banner.bannerPackageDetails}>
                {h.priceStrike && <s>{h.priceStrike}</s>}
                <span>{h.priceSubline}</span>
              </div>
            </div>
            <div className={banner.heroActions}>
              <BookingLink>{h.ctaPrimary}<Arrow size={17} /></BookingLink>
              <a href={whatsAppLink()} target="_blank" rel="noopener" className={banner.whatsappLink}><MessageCircle size={17} />{h.ctaSecondary}</a>
            </div>
          </div>
          <div className={banner.bannerArt}>
            <Image src={mangalnathArt} alt={locale === "hi" ? "मंगलनाथ महादेव और शिवलिंग का पारंपरिक शैली में भक्ति चित्र" : "Traditional devotional illustration of Mangalnath Mahadev with a Shiva lingam"} fill priority placeholder="blur" sizes="(max-width: 650px) 90vw, 45vw" />
          </div>
        </div>
        <ul className={tickets.list}>
          {h.supporting.map((item, index) => {
            const Icon = detailIcons[index];
            return <li key={item.label} className={tickets.ticket}>
              <svg className={tickets.frame} viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`ticket-gold-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e6c88f" /><stop offset=".35" stopColor="#b18443" /><stop offset=".65" stopColor="#e6c88f" /><stop offset="1" stopColor="#a67b3c" />
                  </linearGradient>
                  <linearGradient id={`ticket-paper-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fffef9" /><stop offset=".5" stopColor="#fcf7ec" /><stop offset="1" stopColor="#f5ead6" />
                  </linearGradient>
                </defs>
                <path d="M20 3H400Q417 3 417 20V45C398 45 398 75 417 75V100Q417 117 400 117H20Q3 117 3 100V75C22 75 22 45 3 45V20Q3 3 20 3Z" fill={`url(#ticket-paper-${index})`} stroke={`url(#ticket-gold-${index})`} strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
                <path d="M365 4H400Q416 4 416 20V45C397 45 397 75 416 75V100Q416 116 400 116H365Z" fill="#4b1022" />
                <path d="M22 9H357V111H22Q10 111 10 100V80C28 71 28 49 10 40V20Q10 9 22 9Z" fill="none" stroke="#c5a165" strokeWidth=".7" vectorEffect="non-scaling-stroke" opacity=".55" />
                <path d="M365 12V108" stroke="#d3ad6a" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" strokeLinecap="round" opacity=".85" />
              </svg>
              <span className={tickets.icon} aria-hidden="true"><Icon size={23} strokeWidth={1.35} /></span>
              <span className={tickets.copy}><small>{item.label}</small><strong>{item.value}</strong></span>
              <span className={tickets.stub} aria-hidden="true"><span>✦</span><b>{String(index + 1).padStart(2, "0")}</b><span>✦</span></span>
            </li>;
          })}
        </ul>
        <div className={styles.heroIntroduction}>
          <div><p>{h.body}</p><ReplayTempleEntry /></div>
          <figure className={styles.templeNote}>
            <div className={styles.templeThumbnail}><Image src="/images/mangalnath-temple-entrance.webp" alt={locale === "hi" ? "मंगलनाथ मंदिर का प्रवेश द्वार" : "Mangalnath Temple entrance"} fill sizes="120px" /><span lang="hi">{h.tagLine2}</span></div>
            <figcaption><strong>{h.tagLine1}</strong><p>{h.imageCaption}</p></figcaption>
          </figure>
        </div>
        <p className={styles.brandNote}>{h.brandNote}</p>
      </div>
    </section>
  );
}
