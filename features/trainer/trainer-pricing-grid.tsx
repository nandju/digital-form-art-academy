import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatFcfa } from "@/components/shared/price-tag";
import { TRAINER_PRICING_PLANS } from "@/data/trainer-pricing";
import { cn } from "@/lib/utils";

export function TrainerPricingGrid({ ctaHref = "/inscription/formateur" }: { ctaHref?: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {TRAINER_PRICING_PLANS.map((plan) => (
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
              Recommandé
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
              {plan.price === 0 ? "Gratuit" : formatFcfa(plan.price)}
            </span>
            {plan.price !== 0 && (
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
            render={<Link href={plan.id === "formateur-business" ? "/contact" : ctaHref} />}
            nativeButton={false}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  );
}
