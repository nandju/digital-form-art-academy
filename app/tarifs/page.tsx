import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { formatFcfa } from "@/components/shared/price-tag";
import { PRICING_PLANS } from "@/data/pricing";
import { cn } from "@/lib/utils";

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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col gap-6 rounded-2xl border p-6",
                plan.popular
                  ? "border-brand-primary bg-brand-primary text-white shadow-xl lg:-translate-y-3"
                  : "border-border bg-card"
              )}
            >
              {plan.popular && (
                <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Le plus populaire
                </span>
              )}
              <div>
                <h3 className="font-heading text-lg font-bold">{plan.name}</h3>
                <p className={cn("mt-1 text-sm", plan.popular ? "text-white/75" : "text-muted-foreground")}>
                  {plan.description}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-bold">
                  {plan.price === 0 && plan.period === "an" ? "Sur devis" : formatFcfa(plan.price)}
                </span>
                {!(plan.price === 0 && plan.period === "an") && (
                  <span className={cn("text-sm", plan.popular ? "text-white/70" : "text-muted-foreground")}>
                    /{plan.period}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className={cn("mt-0.5 size-4 shrink-0", plan.popular ? "text-white" : "text-success")} />
                    <span className={plan.popular ? "text-white/90" : "text-secondary-foreground/80"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "mt-auto h-11",
                  plan.popular && "bg-white text-brand-primary hover:bg-white/90"
                )}
                variant={plan.popular ? "default" : "outline"}
                render={<Link href={plan.id === "plan-entreprise" ? "/contact" : "/inscription"} />}
                nativeButton={false}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
