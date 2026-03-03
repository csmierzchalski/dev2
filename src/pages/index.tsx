// pages/index.tsx
import { Containers } from "@/components";
import { Widgets } from "@/components";

export default function MainPage() {
  return (
    <Containers.Layout>
      <Containers.Section
        el={
          <>
            <Widgets.HeroSection />
            <Widgets.FeaturesSection />
            <Widgets.HowItWorksSection />
            <Widgets.TestimonialsSection />
            <Widgets.CTASection />
          </>
        }
      />
    </Containers.Layout>
  );
}
