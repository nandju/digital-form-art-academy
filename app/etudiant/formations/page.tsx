"use client";

import Link from "next/link";
import { BookOpen, PlayCircle } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { COURSES } from "@/data/courses";
import { INSTRUCTORS } from "@/data/instructors";

function getInstructorName(id: string) {
  return INSTRUCTORS.find((i) => i.id === id)?.fullName ?? "Formateur";
}

const enrolled = COURSES.slice(0, 6).map((course, index) => {
  const progress = [72, 45, 90, 20, 65, 38][index];
  const completedModules = Math.round((progress / 100) * course.modules.length);
  const remainingMinutes = Math.max(0, Math.round(course.duration * (1 - progress / 100)));

  return {
    course,
    progress,
    completedModules,
    remainingMinutes,
    lastAccessed: ["Aujourd'hui", "Hier", "Il y a 2 jours", "Il y a 3 jours", "La semaine dernière", "Il y a 2 semaines"][index],
  };
});

export default function StudentCoursesPage() {
  return (
    <div>
      <PageHeader
        title="Mes formations"
        description="Reprenez votre apprentissage là où vous vous êtes arrêté."
        actions={
          <Button render={<Link href="/catalogue" />} nativeButton={false}>
            <BookOpen className="size-4" />
            Découvrir des formations
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {enrolled.map(({ course, progress, completedModules, remainingMinutes, lastAccessed }) => (
          <DashboardCard key={course.id} className="flex flex-col">
            <div className="mb-4 aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
            </div>
            <p className="line-clamp-1 font-heading text-base font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">{getInstructorName(course.instructorId)} • {course.duration} min</p>
            <div className="my-3 flex items-center gap-2">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-xs font-medium text-foreground">{progress}%</span>
            </div>
            <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-[10px]">
                {completedModules}/{course.modules.length} modules
              </Badge>
              <span>{remainingMinutes} min restantes</span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{lastAccessed}</span>
              <Button size="sm" variant="outline" render={<Link href={`/formations/${course.slug}`} />} nativeButton={false}>
                <PlayCircle className="size-3.5" />
                Reprendre
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
