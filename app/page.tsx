import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ScrollStory } from "@/components/ScrollStory";
import { TrustSection } from "@/components/TrustSection";
import { siteConfig } from "@/config/siteConfig";

export default function HomePage() {
  return (
    <main className="relative overflow-clip bg-ink">
      <Hero content={siteConfig.hero} lookbook={siteConfig.lookbook} theme={siteConfig.theme} />
      <ScrollStory scenes={siteConfig.storyScenes} />
      <ProductShowcase products={siteConfig.products} />
      <TrustSection proof={siteConfig.socialProof} />
      <CTA content={siteConfig.cta} />
    </main>
  );
}
