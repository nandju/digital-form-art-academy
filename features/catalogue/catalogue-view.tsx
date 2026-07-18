"use client";

import * as React from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";

import { Container } from "@/components/shared/container";
import { CourseCard } from "@/components/shared/course-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/categories";
import { COURSES } from "@/data/courses";
import type { CourseLevel } from "@/types";

const LEVELS: CourseLevel[] = ["débutant", "intermédiaire", "avancé"];
type SortKey = "popularite" | "note" | "prix-asc" | "prix-desc" | "recent";

function FiltersPanel({
  selectedCategories,
  toggleCategory,
  selectedLevels,
  toggleLevel,
  onReset,
}: {
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedLevels: CourseLevel[];
  toggleLevel: (level: CourseLevel) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-foreground">Filtres</h3>
        <button
          onClick={onReset}
          className="text-xs font-medium text-brand-secondary hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Catégories
        </p>
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={`cat-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => toggleCategory(category.id)}
            />
            <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal text-foreground">
              {category.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Niveau
        </p>
        {LEVELS.map((level) => (
          <div key={level} className="flex items-center gap-2">
            <Checkbox
              id={`level-${level}`}
              checked={selectedLevels.includes(level)}
              onCheckedChange={() => toggleLevel(level)}
            />
            <Label htmlFor={`level-${level}`} className="text-sm font-normal capitalize text-foreground">
              {level}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CatalogueView() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = React.useState<CourseLevel[]>([]);
  const [sort, setSort] = React.useState<SortKey>("popularite");

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const toggleLevel = (level: CourseLevel) =>
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const filteredCourses = React.useMemo(() => {
    let result = COURSES.filter((course) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(course.categoryId);
      const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(course.level);
      return categoryMatch && levelMatch;
    });

    switch (sort) {
      case "note":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "prix-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "prix-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "recent":
        result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        result = [...result].sort((a, b) => b.studentsCount - a.studentsCount);
    }

    return result;
  }, [selectedCategories, selectedLevels, sort]);

  const activeFilterCount = selectedCategories.length + selectedLevels.length;

  return (
    <div className="bg-brand-bg/40">
      <div className="border-b border-border bg-card py-10">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Catalogue des formations
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {COURSES.length} formations disponibles pour développer vos compétences numériques.
          </p>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
            <FiltersPanel
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              selectedLevels={selectedLevels}
              toggleLevel={toggleLevel}
              onReset={resetFilters}
            />
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="sm" className="lg:hidden">
                    </Button>
                  }
                >
                  <Filter className="size-4" />
                  Filtres
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-brand-primary px-1.5 text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs overflow-y-auto p-5">
                  <SheetHeader className="p-0 pb-4">
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <FiltersPanel
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    selectedLevels={selectedLevels}
                    toggleLevel={toggleLevel}
                    onReset={resetFilters}
                  />
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground">
                {filteredCourses.length} résultat{filteredCourses.length > 1 ? "s" : ""}
              </p>
            </div>

            <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
              <SelectTrigger className="w-56">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularite">Popularité</SelectItem>
                <SelectItem value="note">Meilleures notes</SelectItem>
                <SelectItem value="prix-asc">Prix croissant</SelectItem>
                <SelectItem value="prix-desc">Prix décroissant</SelectItem>
                <SelectItem value="recent">Plus récentes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategories.map((id) => {
                const category = CATEGORIES.find((c) => c.id === id);
                if (!category) return null;
                return (
                  <button
                    key={id}
                    onClick={() => toggleCategory(id)}
                    className="flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary"
                  >
                    {category.name}
                    <X className="size-3" />
                  </button>
                );
              })}
              {selectedLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleLevel(level)}
                  className="flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium capitalize text-brand-primary"
                >
                  {level}
                  <X className="size-3" />
                </button>
              ))}
            </div>
          )}

          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">
                Aucune formation ne correspond à ces filtres
              </p>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier ou réinitialiser vos filtres.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
