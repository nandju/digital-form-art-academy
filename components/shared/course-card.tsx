import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";

import type { Course } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { RatingStars } from "@/components/shared/rating-stars";
import { PriceTag } from "@/components/shared/price-tag";
import { getInstructorById } from "@/data/instructors";

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const instructor = getInstructorById(course.instructorId);
  const hours = Math.max(1, Math.round(course.duration / 60));

  return (
    <Link
      href={`/formations/${course.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.bestseller && (
            <Badge className="bg-warning text-warning-foreground">Best-seller</Badge>
          )}
          {course.isNew && <Badge className="bg-success text-success-foreground">Nouveau</Badge>}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
          <PlayCircle className="size-12 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Badge variant="outline" className="w-fit border-brand-light/40 text-brand-secondary">
          {course.categoryName}
        </Badge>

        <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-foreground">
          {course.title}
        </h3>

        {instructor && (
          <p className="text-sm text-muted-foreground">Par {instructor.fullName}</p>
        )}

        <div className="flex items-center gap-2 text-sm">
          <RatingStars rating={course.rating} />
          <span className="font-medium text-foreground">{course.rating}</span>
          <span className="text-muted-foreground">({course.reviewsCount})</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {hours} h
          </span>
          <span>{course.lessonsCount} leçons</span>
          <span className="capitalize">{course.level}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceTag price={course.price} originalPrice={course.originalPrice} />
        </div>
      </div>
    </Link>
  );
}
