import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { COURSES, getCourseBySlug } from "@/data/courses";
import { getInstructorById } from "@/data/instructors";
import { getReviewsByCourse } from "@/data/reviews";
import { CourseDetailView } from "@/features/course/course-detail-view";

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
  if (!course) return { title: "Formation introuvable" };
  return {
    title: course.title,
    description: course.subtitle,
    openGraph: { title: course.title, description: course.subtitle },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const instructor = getInstructorById(course.instructorId);
  const reviews = getReviewsByCourse(course.id);

  return <CourseDetailView course={course} instructor={instructor} reviews={reviews} />;
}
