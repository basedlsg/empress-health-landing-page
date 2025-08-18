import { AnimatedIndicatorNavbar } from "@/components/navbars/animated-indicator-navbar";
import { MinimalCenteredHero } from "@/components/heros/minimal-centered-hero";
import { ThreeColumnImageCards } from "@/components/feature/three-column-image-cards";
import { ScrollingCarouselTestimonials } from "@/components/testimonials/scrolling-carousel-testimonials";
import { SimpleGridStats } from "@/components/stats/simple-grid-stats";
import { MutedContainerCta } from "@/components/cta/muted-container-cta";
import { MinimalCenteredFooter } from "@/components/footers/minimal-centered-footer";
import { AskEmpressChat } from "@/components/chat/ask-empress-chat";

export default function HomePage() {
  return (
    <main>
      <AnimatedIndicatorNavbar />
      <MinimalCenteredHero />
      
      {/* AskEmpress Chat Section */}
      <section className="py-16 px-4 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#4A235A] mb-4">
              Meet Your Personal Menopause Guide
            </h2>
            <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
              Get personalized wellness advice, compassionate support, and evidence-based guidance for your menopause journey.
            </p>
          </div>
          <AskEmpressChat />
        </div>
      </section>

      <ThreeColumnImageCards />
      <ScrollingCarouselTestimonials />
      <SimpleGridStats />
      <MutedContainerCta />
      <MinimalCenteredFooter />
    </main>
  );
}