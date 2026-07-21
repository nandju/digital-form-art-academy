import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { COURSES, getCourseBySlug } from "@/data/courses";
import { CoursePlayer } from "@/features/course/course-player";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Cours introuvable" };
  return { title: `Cours : ${course.title}` };
}

export default async function LearnCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return <CoursePlayer course={course} />;
}
