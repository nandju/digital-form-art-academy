"use client";

import { Mail, Plus, UserCheck } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { INSTRUCTORS } from "@/data/instructors";
import { toast } from "sonner";

export default function AdminTrainersPage() {
  return (
    <div>
      <PageHeader
        title="Formateurs"
        description="Gerez les enseignants et leurs acces."
        actions={
          <Button onClick={() => toast.success("Invitation formateur envoyee.")}>
            <Plus className="size-4" />
            Inviter
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INSTRUCTORS.slice(0, 9).map((i) => (
          <DashboardCard key={i.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="size-14 overflow-hidden rounded-full">
                <MediaPlaceholder seed={i.id} variant="avatar" className="h-full w-full" />
              </div>
              {i.verified ? <Badge className="bg-success/10 text-success">Verifie</Badge> : <Badge variant="outline">En attente</Badge>}
            </div>
            <p className="mt-3 font-heading text-base font-semibold text-foreground">{i.fullName}</p>
            <p className="text-xs text-muted-foreground">{i.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{i.coursesCount} formations • {i.studentsCount} etudiants • {i.rating} ★</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Profil de ${i.fullName} ouvert.`)}>
                Voir
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Email envoye a ${i.fullName}.`)}>
                <Mail className="size-4" />
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
