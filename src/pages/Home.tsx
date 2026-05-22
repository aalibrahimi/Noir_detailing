import { Hero } from "@/components/sections/Hero";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { Philosophy } from "@/components/sections/Philosophy";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <ServicesPreview />
      <GalleryTeaser />
      <Philosophy />
      <Testimonials />
      <CTA />
    </>
  );
}
