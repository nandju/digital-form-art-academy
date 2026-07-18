"use client";

import { GraduationCap, Mail } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { STUDENTS } from "@/data/students";
import { toast } from "sonner";

export default function AdminStudentsPage() {
  return (
    <div>
      <PageHeader
        title="Etudiants"
        description="Liste et gestion des apprenants."
      />

      <DashboardCard>
        <div className="mb-4">
          <Input placeholder="Rechercher un etudiant..." className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Etudiant</th>
                <th className="pb-3 font-medium">Inscrit le</th>
                <th className="pb-3 font-medium">Formations</th>
                <th className="pb-3 font-medium">Terminees</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {STUDENTS.slice(0, 15).map((s) => (
                <tr key={s.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-brand-secondary text-white text-xs">
                          {s.firstName[0]}{s.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{s.fullName}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{new Date(s.joinedAt).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3 text-foreground">{s.coursesEnrolled}</td>
                  <td className="py-3 text-foreground">{s.coursesCompleted}</td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Message envoye a ${s.firstName}.`)}>
                      <Mail className="size-4" />
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
