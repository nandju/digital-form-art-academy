"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  BadgeCheck,
  Clock,
  FileText,
  Globe,
  Heart,
  Lock,
  PlayCircle,
  Signal,
  Users,
} from "lucide-react";

import type { Course, Instructor, Review } from "@/types";
import { Container } from "@/components/shared/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { RatingStars } from "@/components/shared/rating-stars";
import { PriceTag, formatFcfa } from "@/components/shared/price-tag";
import { CourseCard } from "@/components/shared/course-card";
import { getCoursesByCategoryId } from "@/data/courses";

export function CourseDetailView({
  course,
  instructor,
  reviews,
}: {
  course: Course;
  instructor?: Instructor;
  reviews: Review[];
}) {
  const hours = Math.max(1, Math.round(course.duration / 60));
  const similar = getCoursesByCategoryId(course.categoryId)
    .filter((c) => c.id !== course.id)
    .slice(0, 3);

  const handleWishlist = () => {
    toast("Ajouté à vos favoris", {
      description: course.title,
    });
  };

  return (
    <div>
      <div className="bg-brand-primary py-10 text-white">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/catalogue" />}>Catalogue</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/80">{course.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <div className="flex flex-col gap-4">
              <Badge className="w-fit bg-white/10 text-white">{course.categoryName}</Badge>
              <h1 className="font-heading text-3xl font-bold sm:text-4xl">{course.title}</h1>
              <p className="max-w-2xl text-white/80">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={course.rating} />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span>({course.reviewsCount} avis)</span>
                </div>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  {course.studentsCount.toLocaleString("fr-FR")} étudiants
                </span>
                <span className="flex items-center gap-1.5 capitalize">
                  <Signal className="size-4" />
                  {course.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="size-4" />
                  {course.language}
                </span>
              </div>

              {instructor && (
                <Link
                  href={`/formateurs/${instructor.slug}`}
                  className="flex items-center gap-3 pt-2 text-sm text-white/90 hover:text-white"
                >
                  <MediaPlaceholder seed={instructor.id} variant="avatar" className="size-10" />
                  <span>
                    Formation dispensée par <span className="font-semibold">{instructor.fullName}</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-10">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
            <MediaPlaceholder seed={`${course.id}-preview`} variant="banner" className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <PlayCircle className="size-16 text-white drop-shadow-lg" />
            </div>
          </div>

          <Tabs defaultValue="apercu">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="apercu">Aperçu</TabsTrigger>
              <TabsTrigger value="programme">Programme</TabsTrigger>
              <TabsTrigger value="formateur">Formateur</TabsTrigger>
              <TabsTrigger value="avis">Avis ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="apercu" className="flex flex-col gap-8 pt-6">
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Ce que vous allez apprendre
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">Description</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">Prérequis</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {course.requirements.map((requirement) => (
                    <li key={requirement} className="text-sm text-muted-foreground">
                      • {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="programme" className="pt-6">
              <p className="mb-4 text-sm text-muted-foreground">
                {course.modules.length} modules · {course.lessonsCount} leçons · {hours} heures de contenu
              </p>
              <Accordion>
                {course.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="py-4">
                      <div className="flex flex-col gap-1 text-left">
                        <span className="font-semibold text-foreground">
                          Module {index + 1} : {module.title}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {module.lessons.length} leçons · {module.duration} min
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-secondary-foreground/80 hover:bg-brand-bg"
                          >
                            <span className="flex items-center gap-2.5">
                              {lesson.type === "video" && <PlayCircle className="size-4 text-brand-secondary" />}
                              {lesson.type === "document" && <FileText className="size-4 text-brand-secondary" />}
                              {lesson.type === "quiz" && <BadgeCheck className="size-4 text-premium" />}
                              {lessonIndex + 1}. {lesson.title}
                            </span>
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              {lesson.duration} min
                              {lessonIndex > 1 && <Lock className="size-3.5" />}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="formateur" className="pt-6">
              {instructor && (
                <div className="flex flex-col gap-4 rounded-2xl border border-border p-6 sm:flex-row">
                  <MediaPlaceholder seed={instructor.id} variant="avatar" className="size-20 shrink-0" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {instructor.fullName}
                    </h3>
                    <p className="text-sm text-brand-secondary">{instructor.title}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <RatingStars rating={instructor.rating} /> {instructor.rating}
                      </span>
                      <span>{instructor.studentsCount.toLocaleString("fr-FR")} étudiants</span>
                      <span>{instructor.coursesCount} formations</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {instructor.bio}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      render={<Link href={`/formateurs/${instructor.slug}`} />}
                      nativeButton={false}
                    >
                      Voir le profil complet
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="avis" className="flex flex-col gap-4 pt-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-2 rounded-2xl border border-border p-5">
                  <div className="flex items-center gap-3">
                    <MediaPlaceholder seed={review.id} variant="avatar" className="size-9" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.studentName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <RatingStars rating={review.rating} className="ml-auto" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {similar.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Formations similaires
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {similar.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
            </div>

            <PriceTag price={course.price} originalPrice={course.originalPrice} />
            {course.originalPrice && (
              <p className="text-xs font-medium text-success">
                Économisez {formatFcfa(course.originalPrice - course.price)}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="h-12"
                render={<Link href={`/formations/${course.slug}/apprendre`} />}
                nativeButton={false}
              >
                <PlayCircle className="size-4" />
                Commencer la formation
              </Button>
              <Button variant="outline" size="lg" className="h-12" onClick={handleWishlist}>
                <Heart className="size-4" />
                Ajouter aux favoris
              </Button>
            </div>

            <ul className="flex flex-col gap-2.5 border-t border-border pt-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4" /> {hours} heures de contenu
              </li>
              <li className="flex items-center gap-2">
                <FileText className="size-4" /> {course.lessonsCount} leçons
              </li>
              <li className="flex items-center gap-2">
                <Signal className="size-4" /> Niveau {course.level}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4" />
                {course.certificateIncluded ? "Certificat inclus" : "Sans certificat"}
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-4" /> Accès à vie
              </li>
            </ul>
          </div>
        </aside>
      </Container>
    </div>
  );
}
