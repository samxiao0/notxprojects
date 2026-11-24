import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ExploreProjects from "@/components/landing/ExploreProjects";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingPlans from "@/components/landing/PricingPlans";
import VivaDefenseHub from "@/components/landing/VivaDefenseHub";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import MobileBottomBar from "@/components/landing/MobileBottomBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBF8F1] selection:bg-[#CCFF00] selection:text-black relative pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <ExploreProjects />
      <Services />
      <HowItWorks />
      <PricingPlans />
      <VivaDefenseHub />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </main>
  );
}
