"use client";

import { PageHeader } from "@/components/dashboard/dashboard-ui";
import { TrainerPricingGrid } from "@/features/trainer/trainer-pricing-grid";

export default function TrainerRatesPage() {
  return (
    <div>
      <PageHeader
        title="Mon offre"
        description="Comparez les offres formateur et changez de forfait à tout moment."
      />
      <TrainerPricingGrid ctaHref="/formateur/parametres" />
    </div>
  );
}
