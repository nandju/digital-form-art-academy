"use client";

import Link from "next/link";
import { Archive, BookOpen, Copy, Edit, Globe, Plus, Trash2 } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { useTrainerCourses } from "@/lib/course-store";
import { toast } from "sonner";

const TRAINER_ID = "instructor-01";

function statusBadge(status: ReturnType<typeof useTrainerCourses>["courses"][number]["status"]) {
  if (status === "publie") {
    return <Badge className="bg-success/10 text-success">Publié</Badge>;
  }
  if (status === "archive") {
    return <Badge variant="secondary" className="text-muted-foreground">Archivé</Badge>;
  }
  return <Badge variant="outline" className="text-warning border-warning/40">Brouillon</Badge>;
}

export default function TrainerCoursesPage() {
  const { courses, deleteCourse, duplicateCourse, setStatus, ready } = useTrainerCourses(TRAINER_ID);

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

      {!ready && <p className="text-sm text-muted-foreground">Chargement...</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <DashboardCard key={course.id} className="flex flex-col">
            <div className="mb-4 aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{course.categoryName}</Badge>
              {statusBadge(course.status)}
            </div>
            <p className="line-clamp-1 font-heading text-base font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">{course.studentsCount} étudiants • {course.rating} ★</p>
            <p className="mt-2 text-sm font-medium text-foreground">{course.price.toLocaleString("fr-FR")} FCFA</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                render={<Link href={`/formateur/formations/${course.id}/modifier`} />}
                nativeButton={false}
              >
                <Edit className="size-4" />
                Éditer
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  duplicateCourse(course.id);
                  toast.success("Formation dupliquée.");
                }}
              >
                <Copy className="size-4" />
                Dupliquer
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setStatus(course.id, course.status === "publie" ? "archive" : "publie");
                  toast.success(
                    course.status === "publie" ? "Formation archivée." : "Formation publiée."
                  );
                }}
              >
                {course.status === "publie" ? <Archive className="size-4" /> : <Globe className="size-4" />}
                {course.status === "publie" ? "Archiver" : "Publier"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                onClick={() => {
                  deleteCourse(course.id);
                  toast.success("Formation supprimée.");
                }}
              >
                <Trash2 className="size-4" />
                Supprimer
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
