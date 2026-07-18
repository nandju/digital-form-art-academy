import Link from "next/link";
import { BookOpen, Star, Users } from "lucide-react";

import type { Instructor } from "@/types";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <Link
      href={`/formateurs/${instructor.slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <MediaPlaceholder
        seed={instructor.id}
        variant="avatar"
        className="size-20 transition-transform group-hover:scale-105"
      />
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground">
          {instructor.fullName}
        </h3>
        <p className="mt-0.5 text-xs text-brand-secondary">{instructor.title}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        {instructor.expertise.slice(0, 2).map((skill) => (
          <Badge key={skill} variant="outline" className="text-[10px]">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="size-3.5 fill-warning text-warning" />
          {instructor.rating}
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3.5" />
          {instructor.studentsCount.toLocaleString("fr-FR")}
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="size-3.5" />
          {instructor.coursesCount}
        </span>
      </div>
    </Link>
  );
}
