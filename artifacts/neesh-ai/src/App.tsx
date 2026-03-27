import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "./lib/gsap";
import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import ProblemLoopSection from "./components/sections/ProblemLoopSection";
import ProductSimSection from "./components/sections/ProductSimSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import MetricsSection from "./components/sections/MetricsSection";
import PersonaSection from "./components/sections/PersonaSection";
import TransformSection from "./components/sections/TransformSection";
import PricingSection from "./components/sections/PricingSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import FinalCTASection from "./components/sections/FinalCTASection";
import FooterSection from "./components/sections/FooterSection";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemLoopSection />
        <ProductSimSection />
        <FeaturesSection />
        <MetricsSection />
        <PersonaSection />
        <TransformSection />
        <PricingSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
