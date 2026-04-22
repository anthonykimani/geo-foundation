import HeroSection from "@/components/home/hero";
import AboutHero from "@/components/home/about";
import JiweKwaJiwe from "@/components/home/jiwe-kwa-jiwe";
import ImpactAreas from "@/components/home/impact-areas";
import Team from "@/components/home/team";
import Countdown from "@/components/home/countdown";
import FAQ from "@/components/home/faq";
import Testimonials from "@/components/home/testimonials";
import News from "@/components/home/news";


export default function Home() {
  return (
    <main>
      <section id="hero">
        <HeroSection />
      </section>
      <section id="countdown">
        <Countdown targetDate="2026-09-06T07:00:00" />
      </section>
      <section id="about">
        <AboutHero />
      </section>
      <section id="jiwe">
        <JiweKwaJiwe />
      </section>
      <section id="news">
        <News />
      </section>
      <section id="impact">
        <ImpactAreas />
      </section>
      <section id="team">
        <Team />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </main>
  );
}