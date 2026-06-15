"use client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TestDriveSection from "@/components/TestDriveSection";
import SafetySection from "@/components/SafetySection";
import AutonomousSection from "@/components/AutonomousSection";
import PerformanceSection from "@/components/PerformanceSection";
import ReviewsSection from "@/components/ReviewsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <TestDriveSection />
      <SafetySection />
      <AutonomousSection />
      <PerformanceSection />
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}
