"use client";

import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { CustomCursor } from "@/components/Cursor/CustomCursor";
import { LoaderGate } from "@/components/Loader/LoaderGate";
import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Sections/Hero";
import { DesignSection } from "@/components/Sections/DesignSection";
import { ModelsSection } from "@/components/Sections/ModelsSection";
import { DetailsSection } from "@/components/Sections/DetailsSection";
import { PerformanceSection } from "@/components/Sections/PerformanceSection";
import { VideoSection } from "@/components/Sections/VideoSection";
import { BlackSection } from "@/components/Sections/BlackSection";
import { GallerySection } from "@/components/Sections/GallerySection";
import { CraftsmanshipSection } from "@/components/Sections/CraftsmanshipSection";
import { FinalHero } from "@/components/Sections/FinalHero";
import { Footer } from "@/components/Footer/Footer";

export function SiteExperience() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <LoaderGate />
      <Navigation />
      <main>
        <Hero />
        <DesignSection />
        <ModelsSection />
        <DetailsSection />
        <PerformanceSection />
        <VideoSection />
        <BlackSection />
        <GallerySection />
        <CraftsmanshipSection />
        <FinalHero />
      </main>
      <Footer />
      <div className="film-grain" />
    </SmoothScroll>
  );
}
