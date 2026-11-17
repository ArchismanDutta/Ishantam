"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Flower2, MapPin, MessageCircle, Video } from "lucide-react";
import { BrandLogo } from "@/components/ishantam/BrandLogo";
import { HeroFrame } from "@/components/ishantam/HeroFrame";
import { useLocale } from "@/components/ishantam/LocaleContext";
import { LocaleToggle } from "@/components/ishantam/LocaleToggle";
import { Arrow, HairlineOrnament } from "@/components/ishantam/primitives";
import { brand, whatsAppLink } from "@/data/ishantam";
import { BOOKING_STORAGE_KEY, type CheckoutBooking } from "@/lib/checkout";
import pujaArt from "@/public/images/mangalnath-puja-art.webp";
import styles from "./thank-you.module.css";

const copy = {
  en: {
    home: "Back to home", location: "Mangalnath Temple · Ujjain", eyebrow: "WITH GRATITUDE & DEVOTION",
    title: "Thank you", subtitle: "for making us a part of your sacred journey.",
    blessing: "May Mahadev bless you and your family with peace, strength and harmony.",
    checking: "Checking your booking…", confirmed: "Your puja booking is confirmed",
    received: "Your payment has been received. Keep your booking reference below for any questions about your puja.",
    welcome: "Thank you for placing your faith in Ishantam. If you have made a booking, you can check its payment status below.",
    pending: "Your payment is not confirmed yet. Please check your booking status before making another payment.",
    error: "We couldn’t retrieve your booking. Please check its status or contact our team for help.",
    reference: "Booking reference", package: "Puja package", amount: "Amount paid", payment: "Payment ID",
    status: "Check booking status", support: "Contact on WhatsApp", next: "Your journey from here",
    steps: [
      { title: "Stay connected", body: "For your puja date or any booking questions, reach our team on WhatsApp." },
      { title: "A sankalp in your name", body: "For confirmed bookings, the priests perform the scheduled puja with your name and Gotra." },
      { title: "Receive the puja video", body: "After the ceremony, the puja video is shared on your registered WhatsApp number, subject to recording availability." },
    ],
    help: "We’re here to help with your puja.", call: "Call us", footer: "Connecting devotion, wherever you are.",
  },
  hi: {
    home: "मुख्य पृष्ठ पर जाएँ", location: "मंगलनाथ मंदिर · उज्जैन", eyebrow: "श्रद्धा और कृतज्ञता के साथ",
    title: "धन्यवाद", subtitle: "अपनी पावन यात्रा में हमें सहभागी बनाने के लिए।",
    blessing: "महादेव की कृपा से आपके परिवार में शांति, शक्ति और सौहार्द बना रहे।",
    checking: "आपकी बुकिंग की जाँच हो रही है…", confirmed: "आपकी पूजा बुकिंग की पुष्टि हो गई है",
    received: "आपका भुगतान प्राप्त हो गया है। पूजा से जुड़े किसी भी प्रश्न के लिए अपना बुकिंग संदर्भ सुरक्षित रखें।",
    welcome: "Ishantam पर विश्वास रखने के लिए धन्यवाद। यदि आपने बुकिंग की है, तो नीचे अपने भुगतान की स्थिति जाँच सकते हैं।",
    pending: "आपके भुगतान की पुष्टि अभी नहीं हुई है। दोबारा भुगतान करने से पहले बुकिंग की स्थिति जाँचें।",
    error: "आपकी बुकिंग का विवरण प्राप्त नहीं हो सका। कृपया स्थिति जाँचें या सहायता के लिए हमारी टीम से संपर्क करें।",
    reference: "बुकिंग संदर्भ", package: "पूजा पैकेज", amount: "प्राप्त राशि", payment: "भुगतान आईडी",
    status: "बुकिंग की स्थिति जाँचें", support: "WhatsApp पर संपर्क करें", next: "आपकी आगे की पावन यात्रा",
    steps: [
      { title: "हमसे जुड़े रहें", body: "पूजा की तिथि या बुकिंग से जुड़े किसी भी प्रश्न के लिए WhatsApp पर हमारी टीम से संपर्क करें।" },
      { title: "आपके नाम से संकल्प", body: "पुष्ट बुकिंग के लिए पुरोहित आपके नाम और गोत्र से निर्धारित पूजा संपन्न करेंगे।" },
      { title: "पूजा का वीडियो पाएँ", body: "पूजा के बाद वीडियो आपके पंजीकृत WhatsApp नंबर पर साझा किया जाएगा, रिकॉर्डिंग की उपलब्धता के अधीन।" },
    ],
    help: "आपकी पूजा से जुड़े प्रश्नों में हम आपके साथ हैं।", call: "कॉल करें", footer: "भक्ति से जुड़ें, जहाँ भी हों।",
  },
};

const stepIcons = [MessageCircle, Flower2, Video];

export default function ThankYou() {
  const { locale } = useLocale();
  const t = copy[locale];
  const [booking, setBooking] = useState<CheckoutBooking | null>(null);
  const [status, setStatus] = useState<"checking" | "welcome" | "confirmed" | "pending" | "error">("checking");

  useEffect(() => {
    const controller = new AbortController();
    async function checkBooking() {
      try {
        const saved = JSON.parse(sessionStorage.getItem(BOOKING_STORAGE_KEY) || "null");
        if (!saved?.token) { setStatus("welcome"); return; }
        // Always confirm with the server; a URL or stored client state is not proof of payment.
        const response = await fetch("/api/payments/status", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: saved.token }), signal: controller.signal,
        });
        if (!response.ok) throw new Error("Booking status unavailable");
        const result: CheckoutBooking = await response.json();
        if (controller.signal.aborted) return;
        if (result.state === "paid") { setBooking(result); setStatus("confirmed"); }
        else setStatus("pending");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    void checkBooking();
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Ishantam"><BrandLogo preload /></Link>
        <div className={styles.headerActions}><Link href="/" className={styles.homeLink}>{t.home}<Arrow /></Link><LocaleToggle compact /></div>
      </header>

      <main className={styles.main}>
        <p className={styles.location}><MapPin size={14} aria-hidden="true" />{t.location}</p>
        <section className={styles.invitation} aria-labelledby="thank-you-heading">
          <HeroFrame />
          <div className={styles.message}>
            <p className={`devanagari ${styles.invocation}`} lang="hi">॥ ॐ नमः शिवाय ॥</p>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h1 id="thank-you-heading" className={styles.title}>{t.title}<span aria-hidden="true">.</span></h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
            <HairlineOrnament />
            <p className={styles.blessing}>{t.blessing}</p>
          </div>
          <div className={styles.art}>
            <Image src={pujaArt} alt={locale === "hi" ? "मंगलनाथ महादेव और शिवलिंग का भक्ति चित्र" : "Devotional illustration of Mangalnath Mahadev and a Shiva lingam"} fill preload placeholder="blur" sizes="(max-width: 700px) 85vw, 480px" />
          </div>
        </section>

        <section className={styles.details} aria-label={locale === "hi" ? "बुकिंग विवरण" : "Booking details"}>
          <div className={styles.status} role="status" aria-live="polite" aria-busy={status === "checking"}>
            {status === "confirmed" && <span className={styles.check}><Check size={20} aria-hidden="true" /></span>}
            <div>{status === "confirmed" && <h2>{t.confirmed}</h2>}<p>{status === "confirmed" ? t.received : t[status]}</p></div>
          </div>
          {booking && <dl className={styles.receipt}>
            <div><dt>{t.reference}</dt><dd>{booking.reference}</dd></div>
            <div><dt>{t.package}</dt><dd>{booking.packageName}</dd></div>
            <div><dt>{t.amount}</dt><dd>{new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN", { style: "currency", currency: booking.currency, maximumFractionDigits: 2 }).format(booking.amount / 100)}</dd></div>
            {booking.paymentId && <div><dt>{t.payment}</dt><dd>{booking.paymentId}</dd></div>}
          </dl>}
          <div className={styles.actions}>
            <Link href="/" className="btn btn-primary">{t.home}<Arrow /></Link>
            {brand.whatsappNumber && <a href={whatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><MessageCircle size={17} aria-hidden="true" />{t.support}</a>}
          </div>
          {status !== "confirmed" && <Link href="/booking" className={styles.statusLink}>{t.status}<Arrow /></Link>}
        </section>

        <section className={styles.next} aria-labelledby="next-heading">
          <h2 id="next-heading">{t.next}</h2>
          <ol className={styles.steps}>{t.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return <li key={step.title}><span className={styles.stepIcon}><Icon size={23} strokeWidth={1.4} aria-hidden="true" /></span><div><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></div></li>;
          })}</ol>
        </section>
        <p className={styles.help}>{t.help} <a href={`tel:+91${brand.phone}`}>{t.call}: +91 {brand.phone}</a></p>
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Ishantam</span><span>{t.footer}</span></footer>
    </div>
  );
}
