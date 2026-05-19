import { ContactCallout } from "@/components/home/ContactCallout";
import { CurrentlySection } from "@/components/home/CurrentlySection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HomeHero } from "@/components/home/HomeHero";
import { PublicationsPreview } from "@/components/home/PublicationsPreview";
import { RecognitionSection } from "@/components/home/RecognitionSection";
import { SpeakingStrip } from "@/components/home/SpeakingStrip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CurrentlySection />
      <FeaturedWork />
      <PublicationsPreview />
      <RecognitionSection />
      <SpeakingStrip />
      <ContactCallout />
    </>
  );
}
