import { Navigation }        from "@/components/ishantam/Navigation";
import { Hero }              from "@/components/ishantam/Hero";
import { Inclusions }        from "@/components/ishantam/Inclusions";
import { Packages }          from "@/components/ishantam/Packages";
import { About }             from "@/components/ishantam/About";
import { Benefits }          from "@/components/ishantam/Benefits";
import { Rituals }           from "@/components/ishantam/Rituals";
import { HowItWorks }        from "@/components/ishantam/HowItWorks";
import { RegistrationForm }  from "@/components/ishantam/RegistrationForm";
import { FAQ }               from "@/components/ishantam/FAQ";
import { FinalCTA }          from "@/components/ishantam/FinalCTA";
import { Footer }            from "@/components/ishantam/Footer";
import { BookingProvider }   from "@/components/ishantam/BookingContext";
import { LocaleProvider }    from "@/components/ishantam/LocaleContext";
import { StickyWhatsApp }    from "@/components/ishantam/StickyWhatsApp";
import { TempleEntry }       from "@/components/ishantam/TempleEntry";

export default function Home() {
  return (
    <LocaleProvider>
      <BookingProvider>
        <TempleEntry />
        <div id="site-content">
        <Navigation />
        <main>
          <Hero />
          <Inclusions />
          <About />
          <Benefits />
          <Rituals />
          <Packages />
          <HowItWorks />
          <RegistrationForm />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <StickyWhatsApp />
        </div>
        <noscript><style>{`[aria-label="Enter the sacred temple"],[aria-label="पवित्र मंदिर में प्रवेश"]{display:none!important}`}</style></noscript>
      </BookingProvider>
    </LocaleProvider>
  );
}
