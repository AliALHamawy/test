import { Header } from "@/components/myComponents/shared/Header";
import { Footer } from "@/components/myComponents/shared/Footer";
import { HeroSection } from "@/components/myComponents/home/HeroSection";
import { FeaturesSection } from "@/components/myComponents/home/FeaturesSection";
import { SpecsSection } from "@/components/myComponents/home/SpecsSection";
import { GallerySection } from "@/components/myComponents/home/GallerySection";
import { CtaSection } from "@/components/myComponents/home/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SpecsSection />
        <GallerySection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
