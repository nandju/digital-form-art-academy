import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { CourseCard } from "@/components/shared/course-card";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getCoursesByCategory } from "@/data/courses";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const courses = getCoursesByCategory(slug);

  return (
    <div>
      <div className="border-b border-border bg-card py-10">
        <Container>
          <span
            className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            Catégorie
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
        </Container>
      </div>
      <Container className="py-10">
        <p className="mb-6 text-sm text-muted-foreground">
          {courses.length} formation{courses.length > 1 ? "s" : ""} disponible
          {courses.length > 1 ? "s" : ""}
        </p>
        {courses.length === 0 ? (
          <p className="text-muted-foreground">
            Aucune formation n&apos;est disponible dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
