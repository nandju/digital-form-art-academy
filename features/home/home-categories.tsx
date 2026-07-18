import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/shared/category-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories";

export function HomeCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Catégories"
            title="Apprenez dans le domaine qui vous passionne"
            description="Des parcours complets couvrant les compétences numériques les plus demandées sur le marché africain."
          />
          <Button
            variant="outline"
            className="w-fit shrink-0"
            render={<Link href="/categories" />}
            nativeButton={false}
          >
            Toutes les catégories
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
