"use client";

import Link from "next/link";
import { BookOpen, Edit, Plus, Trash2 } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { COURSES } from "@/data/courses";
import { toast } from "sonner";

const trainerCourses = COURSES.filter((c) => c.instructorId === "instructor-01");

export default function TrainerCoursesPage() {
  return (
    <div>
      <PageHeader
        title="Mes formations"
        description="Gérez le contenu et le statut de vos formations."
        actions={
          <Button render={<Link href="/formateur/formations/creer" />} nativeButton={false}>
            <Plus className="size-4" />
            Nouvelle formation
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainerCourses.map((course) => (
          <DashboardCard key={course.id} className="flex flex-col">
            <div className="mb-4 aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{course.categoryName}</Badge>
              <Badge className="bg-success/10 text-success">Publié</Badge>
            </div>
            <p className="line-clamp-1 font-heading text-base font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">{course.studentsCount} étudiants • {course.rating} ★</p>
            <p className="mt-2 text-sm font-medium text-foreground">{course.price.toLocaleString("fr-FR")} FCFA</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success("Ouvert en mode édition.")}>
                <Edit className="size-4" />
                Éditer
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => toast.success("Formation archivée.")}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
