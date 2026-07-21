"use client";

import { Award, Download, Search } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATES } from "@/data/certificates";
import { toast } from "sonner";

export default function AdminCertificatesPage() {
  return (
    <div>
      <PageHeader
        title="Certificats"
        description="Suivi et verification des attestations delivrees."
      />

      <DashboardCard>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input placeholder="Rechercher un certificat..." className="max-w-sm" />
          <Button onClick={() => toast.success("Export CSV simule.")}>
            <Download className="size-4" />
            Exporter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Reference</th>
                <th className="pb-3 font-medium">Etudiant</th>
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Mention</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CERTIFICATES.slice(0, 12).map((cert) => (
                <tr key={cert.id}>
                  <td className="py-3 font-medium text-foreground">{cert.certificateNumber}</td>
                  <td className="py-3 text-muted-foreground">{cert.studentName}</td>
                  <td className="py-3 text-foreground">{cert.courseTitle}</td>
                  <td className="py-3 text-muted-foreground">{new Date(cert.issueDate).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3">
                    <Badge variant="secondary">{cert.grade}</Badge>
                  </td>
                  <td className="py-3">
                    {cert.status === "en_attente" ? (
                      <Badge variant="outline" className="text-warning border-warning/40">En attente</Badge>
                    ) : cert.status === "rejetee" ? (
                      <Badge variant="destructive">Rejeté</Badge>
                    ) : (
                      <Badge className="bg-success/10 text-success">Validé</Badge>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Certificat ${cert.certificateNumber} ouvert.`)}>
                      <Award className="size-4" />
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
