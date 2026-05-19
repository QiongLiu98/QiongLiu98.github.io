import type { Metadata } from "next";
import { ContactCallout } from "@/components/home/ContactCallout";
import { CurrentlySection } from "@/components/home/CurrentlySection";
import { TargetRolesSection } from "@/components/home/TargetRolesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HomeHero } from "@/components/home/HomeHero";
import { PatentsPreview } from "@/components/home/PatentsPreview";
import { PublicationsPreview } from "@/components/home/PublicationsPreview";
import { RecognitionSection } from "@/components/home/RecognitionSection";
import { SpeakingStrip } from "@/components/home/SpeakingStrip";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CurrentlySection />
      <TargetRolesSection />
      <FeaturedWork />
      <PublicationsPreview />
      <PatentsPreview />
      <RecognitionSection />
      <SpeakingStrip />
      <ContactCallout />
    </>
  );
}
