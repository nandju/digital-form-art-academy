"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/shared/course-card";
import { InstructorCard } from "@/components/shared/instructor-card";
import { CategoryCard } from "@/components/shared/category-card";
import { COURSES } from "@/data/courses";
import { INSTRUCTORS } from "@/data/instructors";
import { CATEGORIES } from "@/data/categories";

export function SearchView() {
  const [query, setQuery] = React.useState("");
  const normalized = query.trim().toLowerCase();

  const courses = React.useMemo(() => {
    if (!normalized) return [];
    return COURSES.filter(
      (course) =>
        course.title.toLowerCase().includes(normalized) ||
        course.tags.some((tag) => tag.toLowerCase().includes(normalized)) ||
        course.categoryName.toLowerCase().includes(normalized)
    ).slice(0, 9);
  }, [normalized]);

  const instructors = React.useMemo(() => {
    if (!normalized) return [];
    return INSTRUCTORS.filter(
      (instructor) =>
        instructor.fullName.toLowerCase().includes(normalized) ||
        instructor.expertise.some((skill) => skill.toLowerCase().includes(normalized))
    ).slice(0, 4);
  }, [normalized]);

  const categories = React.useMemo(() => {
    if (!normalized) return [];
    return CATEGORIES.filter((category) => category.name.toLowerCase().includes(normalized)).slice(
      0,
      4
    );
  }, [normalized]);

  const hasResults = courses.length > 0 || instructors.length > 0 || categories.length > 0;

  return (
    <div>
      <div className="border-b border-border bg-brand-bg py-12">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Que souhaitez-vous apprendre aujourd&apos;hui ?
          </h1>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une formation, une catégorie, un formateur..."
              className="h-12 rounded-full pl-12 pr-10 text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Effacer la recherche"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-10 py-12">
        {!normalized && (
          <p className="text-center text-muted-foreground">
            Commencez à taper pour rechercher parmi {COURSES.length} formations,{" "}
            {INSTRUCTORS.length} formateurs et {CATEGORIES.length} catégories.
          </p>
        )}

        {normalized && !hasResults && (
          <p className="text-center text-muted-foreground">
            Aucun résultat trouvé pour <span className="font-semibold text-foreground">« {query} »</span>.
            Essayez un autre mot-clé.
          </p>
        )}

        {categories.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Catégories</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {instructors.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Formateurs</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Formations</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {normalized && (
          <div className="text-center">
            <Link href="/catalogue" className="text-sm font-medium text-brand-secondary hover:underline">
              Voir tout le catalogue de formations →
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
