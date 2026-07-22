"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const VISIBLE_FEATURES = 6;

export interface PricingCardData {
  id: string;
  name: string;
  description: string;
  priceDisplay: string;
  periodSuffix?: string;
  popular?: boolean;
  badgeLabel?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export function PricingCard({ plan }: { plan: PricingCardData }) {
  const visibleFeatures = plan.features.slice(0, VISIBLE_FEATURES);
  const hasMore = plan.features.length > VISIBLE_FEATURES;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-7",
        plan.popular
          ? "border-brand-primary bg-brand-primary text-white shadow-xl"
          : "border-border bg-card"
      )}
    >
      {plan.popular ? (
        <span className="mb-4 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          {plan.badgeLabel ?? "Recommandé"}
        </span>
      ) : (
        <div className="mb-4 h-6" />
      )}

      <div className="mb-5">
        <h3 className="font-heading text-lg font-bold">{plan.name}</h3>
        <p className={cn("mt-2 text-sm leading-relaxed", plan.popular ? "text-white/75" : "text-muted-foreground")}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6 flex items-baseline gap-1.5 border-t border-b border-dashed border-current/15 py-5">
        <span className="font-heading text-3xl font-bold">{plan.priceDisplay}</span>
        {plan.periodSuffix && (
          <span className={cn("text-sm", plan.popular ? "text-white/70" : "text-muted-foreground")}>
            {plan.periodSuffix}
          </span>
        )}
      </div>

      <ul className="mb-5 flex flex-col gap-3.5">
        {visibleFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className={cn("mt-0.5 size-4 shrink-0", plan.popular ? "text-white" : "text-success")} />
            <span className={plan.popular ? "text-white/90" : "text-secondary-foreground/80"}>{feature}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <Dialog>
          <DialogTrigger
            render={
              <button
                type="button"
                className={cn(
                  "mb-6 w-fit text-left text-sm font-semibold underline-offset-4 hover:underline",
                  plan.popular ? "text-white" : "text-brand-secondary"
                )}
              />
            }
          >
            Voir tous les avantages ({plan.features.length})
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{plan.name} — tous les avantages</DialogTitle>
              <DialogDescription>{plan.description}</DialogDescription>
            </DialogHeader>
            <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-secondary-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}

      <Button
        className={cn("mt-auto h-11", plan.popular && "bg-white text-brand-primary hover:bg-white/90")}
        variant={plan.popular ? "default" : "outline"}
        render={<Link href={plan.ctaHref} />}
        nativeButton={false}
      >
        {plan.ctaLabel}
      </Button>
    </div>
  );
}
