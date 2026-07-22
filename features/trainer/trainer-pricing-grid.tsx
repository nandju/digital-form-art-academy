import { formatFcfa } from "@/components/shared/price-tag";
import { PricingCard } from "@/components/shared/pricing-card";
import { PricingCarousel, PricingCarouselItem } from "@/components/shared/pricing-carousel";
import { TRAINER_PRICING_PLANS } from "@/data/trainer-pricing";

export function TrainerPricingGrid({ ctaHref = "/inscription/formateur" }: { ctaHref?: string }) {
  return (
    <PricingCarousel>
      {TRAINER_PRICING_PLANS.map((plan) => (
        <PricingCarouselItem key={plan.id}>
          <PricingCard
            plan={{
              id: plan.id,
              name: plan.name,
              description: plan.description,
              priceDisplay: plan.priceLabel ?? (plan.price === 0 ? "Gratuit" : formatFcfa(plan.price)),
              periodSuffix: plan.price !== 0 && !plan.priceLabel ? `/${plan.period}` : undefined,
              popular: plan.popular,
              features: plan.features,
              ctaLabel: plan.cta,
              ctaHref: plan.id === "formateur-enterprise" ? "/contact" : ctaHref,
            }}
          />
        </PricingCarouselItem>
      ))}
    </PricingCarousel>
  );
}
