"use client";

import { Mail, MoreHorizontal, Shield, User, Users } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { STUDENTS } from "@/data/students";
import { INSTRUCTORS } from "@/data/instructors";
import { toast } from "sonner";

const users = [
  ...STUDENTS.slice(0, 8).map((s) => ({ id: s.id, name: s.fullName, email: s.email, role: "etudiant" as const, active: true })),
  ...INSTRUCTORS.slice(0, 4).map((i) => ({ id: i.id, name: i.fullName, email: i.slug + "@digitalformart.com", role: "formateur" as const, active: true })),
  { id: "admin-001", name: "Grace Adjei", email: "admin.demo@digitalformart.com", role: "admin" as const, active: true },
];

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader
        title="Utilisateurs"
        description="Gerez les comptes et les roles."
      />

      <DashboardCard>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input placeholder="Rechercher un utilisateur..." className="max-w-sm" />
          <Button onClick={() => toast.success("Invitation envoyee.")}>
            <Users className="size-4" />
            Inviter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Utilisateur</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-brand-primary text-white text-xs">
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-foreground">{u.name}</p>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{u.email}</td>
                  <td className="py-3 capitalize text-foreground">{u.role}</td>
                  <td className="py-3">
                    <Badge variant={u.active ? "default" : "secondary"}>
                      {u.active ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success("Utilisateur modifie.")}>
                      <MoreHorizontal className="size-4" />
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
