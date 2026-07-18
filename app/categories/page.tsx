import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { CategoryCard } from "@/components/shared/category-card";
import { CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "Catégories de formations",
  description: "Explorez toutes les catégories de formations disponibles sur Digital FormArt Academy.",
};

export default function CategoriesPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-10">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Toutes les catégories
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {CATEGORIES.length} catégories couvrant les compétences numériques les plus demandées.
          </p>
        </Container>
      </div>
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </div>
  );
}
