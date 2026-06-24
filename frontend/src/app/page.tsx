import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Demo from "@/components/sections/Demo";
import DualAudience from "@/components/sections/DualAudience";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Features />
      <Demo />
      <DualAudience />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}
