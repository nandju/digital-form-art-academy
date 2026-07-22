import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatFcfa } from "@/components/shared/price-tag";
import { PricingCard } from "@/components/shared/pricing-card";
import { PricingCarousel, PricingCarouselItem } from "@/components/shared/pricing-carousel";
import { PRICING_PLANS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Découvrez les formules Digital FormArt Academy adaptées à vos besoins : Découverte, Premium, Carrière+ et Entreprise.",
};

export default function PricingPage() {
  return (
    <div>
      <div className="border-b border-border bg-brand-bg py-14">
        <Container>
          <SectionHeading
            eyebrow="Tarifs"
            title="Des formules adaptées à chaque objectif"
            description="Choisissez la formule qui correspond à votre rythme d'apprentissage et à votre budget. Sans engagement, annulable à tout moment."
          />
        </Container>
      </div>

      <Container className="py-14">
        <PricingCarousel>
          {PRICING_PLANS.map((plan) => (
            <PricingCarouselItem key={plan.id}>
              <PricingCard
                plan={{
                  id: plan.id,
                  name: plan.name,
                  description: plan.description,
                  priceDisplay:
                    plan.price === 0 && plan.period === "an" ? "Sur devis" : formatFcfa(plan.price),
                  periodSuffix:
                    !(plan.price === 0 && plan.period === "an") ? `/${plan.period}` : undefined,
                  popular: plan.popular,
                  badgeLabel: "Le plus populaire",
                  features: plan.features,
                  ctaLabel: plan.cta,
                  ctaHref: plan.id === "plan-entreprise" ? "/contact" : "/inscription",
                }}
              />
            </PricingCarouselItem>
          ))}
        </PricingCarousel>
      </Container>
    </div>
  );
}
