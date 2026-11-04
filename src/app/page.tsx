"use client";

import AboutSection from "@/components/customs/landing-page/sections/about-section";
import CtaSection from "@/components/customs/landing-page/sections/cta-section";
import FeatureSection from "@/components/customs/landing-page/sections/feature-section";
import FlowSection from "@/components/customs/landing-page/sections/flow-section";
import HeroSection from "@/components/customs/landing-page/sections/hero-section";
import Footer from "@/components/layout/user/main-footer";
import Navbar from "@/components/layout/user/main-navbar";


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <FlowSection/>
      <CtaSection/>
      <AboutSection/>
    </main>
  );
}