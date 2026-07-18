"use client";

import { BookOpen, Eye, Plus } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { COURSES } from "@/data/courses";
import { INSTRUCTORS } from "@/data/instructors";
import { toast } from "sonner";

function getInstructorName(id: string) {
  return INSTRUCTORS.find((i) => i.id === id)?.fullName ?? "Formateur";
}

export default function AdminCoursesPage() {
  return (
    <div>
      <PageHeader
        title="Formations"
        description="Publiez, moderez et archivez les formations."
        actions={
          <Button onClick={() => toast.success("Creation de formation ouverte.")}>
            <Plus className="size-4" />
            Nouvelle formation
          </Button>
        }
      />

      <DashboardCard>
        <div className="mb-4">
          <Input placeholder="Rechercher une formation..." className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium">Formateur</th>
                <th className="pb-3 font-medium">Prix</th>
                <th className="pb-3 font-medium">Etudiants</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COURSES.slice(0, 12).map((c) => (
                <tr key={c.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 overflow-hidden rounded-lg">
                        <MediaPlaceholder seed={c.id} variant="course" className="h-full w-full" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{getInstructorName(c.instructorId)}</td>
                  <td className="py-3 text-foreground">{c.price.toLocaleString("fr-FR")} FCFA</td>
                  <td className="py-3 text-foreground">{c.studentsCount}</td>
                  <td className="py-3">
                    <Badge className="bg-success/10 text-success">Publie</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Apercu de ${c.title}.`)}>
                      <Eye className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
