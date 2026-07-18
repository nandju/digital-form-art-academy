"use client";

import { Mail, MoreHorizontal, Users } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { STUDENTS } from "@/data/students";
import { toast } from "sonner";

const students = STUDENTS.slice(0, 12);

export default function TrainerStudentsPage() {
  return (
    <div>
      <PageHeader
        title="Mes étudiants"
        description="Liste des apprenants inscrits à vos formations."
      />

      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Étudiant</th>
                <th className="pb-3 font-medium">Localisation</th>
                <th className="pb-3 font-medium">Inscriptions</th>
                <th className="pb-3 font-medium">Progression</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-brand-primary text-white text-xs">
                          {student.firstName[0]}{student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.fullName}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{student.location}</td>
                  <td className="py-3 text-muted-foreground">{student.coursesEnrolled}</td>
                  <td className="py-3">
                    <Badge variant="secondary">{student.coursesCompleted}/{student.coursesEnrolled} terminés</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Message envoyé à ${student.fullName}.`)}>
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
