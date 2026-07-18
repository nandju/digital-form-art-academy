import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Globe, MapPin, Users } from "lucide-react";

import { Container } from "@/components/shared/container";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { RatingStars } from "@/components/shared/rating-stars";
import { LinkedinIcon } from "@/components/shared/social-icons";
import { CourseCard } from "@/components/shared/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INSTRUCTORS, getInstructorBySlug } from "@/data/instructors";
import { getCoursesByInstructor } from "@/data/courses";

export function generateStaticParams() {
  return INSTRUCTORS.map((instructor) => ({ slug: instructor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) return { title: "Formateur introuvable" };
  return { title: instructor.fullName, description: instructor.bio };
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);
  if (!instructor) notFound();

  const courses = getCoursesByInstructor(instructor.id);

  return (
    <div>
      <div className="border-b border-border bg-card py-12">
        <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <MediaPlaceholder seed={instructor.id} variant="avatar" className="size-28 shrink-0" />
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {instructor.fullName}
              </h1>
              {instructor.verified && <Badge className="bg-brand-secondary">Vérifié</Badge>}
            </div>
            <p className="text-brand-secondary">{instructor.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              <span className="flex items-center gap-1.5">
                <RatingStars rating={instructor.rating} /> {instructor.rating}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" /> {instructor.studentsCount.toLocaleString("fr-FR")} étudiants
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="size-4" /> {instructor.coursesCount} formations
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {instructor.location}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1 sm:justify-start">
              {instructor.expertise.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              {instructor.socials.linkedin && (
                <Button variant="outline" size="icon-sm" render={<Link href={instructor.socials.linkedin} target="_blank" />} nativeButton={false}>
                  <LinkedinIcon className="size-4" />
                </Button>
              )}
              {instructor.socials.website && (
                <Button variant="outline" size="icon-sm" render={<Link href={instructor.socials.website} target="_blank" />} nativeButton={false}>
                  <Globe className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-8 py-10">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">À propos</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {instructor.bio}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Formations dispensées ({courses.length})
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
