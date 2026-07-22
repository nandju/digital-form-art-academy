"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function PricingCarousel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Formule précédente"
        className="absolute top-[38%] -left-3 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 text-foreground shadow-md transition-colors hover:border-brand-primary hover:text-brand-primary sm:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Formule suivante"
        className="absolute top-[38%] -right-3 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 text-foreground shadow-md transition-colors hover:border-brand-primary hover:text-brand-primary sm:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function PricingCarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-carousel-item
      className={cn("w-[280px] shrink-0 snap-start sm:w-[320px]", className)}
    >
      {children}
    </div>
  );
}
