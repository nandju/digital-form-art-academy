"use client";

import * as React from "react";
import { CheckCircle2, Clock, ListChecks, XCircle } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CERTIFICATES } from "@/data/certificates";
import type { Certificate } from "@/types";
import { toast } from "sonner";

const TRAINER_ID = "instructor-01";

function statusBadge(status: Certificate["status"]) {
  switch (status) {
    case "en_attente":
      return <Badge variant="outline" className="gap-1 text-warning border-warning/40"><Clock className="size-3" /> En attente</Badge>;
    case "validee":
      return <Badge className="gap-1 bg-success/10 text-success"><CheckCircle2 className="size-3" /> Validé</Badge>;
    case "rejetee":
      return <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Rejeté</Badge>;
  }
}

export default function TrainerCertificatesPage() {
  const [certificates, setCertificates] = React.useState<Certificate[]>(() =>
    CERTIFICATES.filter((c) => c.instructorId === TRAINER_ID || !c.instructorId)
  );

  const pending = certificates.filter((c) => c.status === "en_attente");
  const validated = certificates.filter((c) => c.status === "validee");
  const rejected = certificates.filter((c) => c.status === "rejetee");

  const updateStatus = (id: string, status: Certificate["status"]) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    const cert = certificates.find((c) => c.id === id);
    if (status === "validee") {
      toast.success(`Certificat validé et envoyé à ${cert?.studentName}.`);
    } else {
      toast.error(`Demande de certificat rejetée pour ${cert?.studentName}.`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Certificats"
        description="Validez ou rejetez les demandes de certificats de vos étudiants."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="En attente" value={pending.length} icon={Clock} accent="text-warning" />
        <StatCard label="Validés" value={validated.length} icon={CheckCircle2} accent="text-success" />
        <StatCard label="Rejetés" value={rejected.length} icon={XCircle} accent="text-destructive" />
      </div>

      <DashboardCard title="Demandes en attente" className="mt-6">
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune demande en attente pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {pending.map((cert) => (
              <div key={cert.id} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{cert.studentName}</p>
                    <p className="text-sm text-muted-foreground">{cert.courseTitle}</p>
                    <p className="text-xs text-muted-foreground">Demandé le {cert.requestedAt}</p>
                  </div>
                  {statusBadge(cert.status)}
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ListChecks className="size-3.5" /> Progression du cours
                    </p>
                    <Progress value={cert.completionRate ?? 0} />
                    <p className="mt-1 text-xs text-muted-foreground">{cert.completionRate}% complété</p>
                  </div>
                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ListChecks className="size-3.5" /> Moyenne des quiz
                    </p>
                    <Progress value={cert.quizAverage ?? 0} />
                    <p className="mt-1 text-xs text-muted-foreground">{cert.quizAverage}/100</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => updateStatus(cert.id, "validee")}>
                    <CheckCircle2 className="size-4" />
                    Valider et envoyer
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(cert.id, "rejetee")}>
                    <XCircle className="size-4" />
                    Rejeter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>

      <DashboardCard title="Historique" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Référence</th>
                <th className="pb-3 font-medium">Étudiant</th>
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...validated, ...rejected].map((cert) => (
                <tr key={cert.id}>
                  <td className="py-3 font-medium text-foreground">{cert.certificateNumber}</td>
                  <td className="py-3 text-muted-foreground">{cert.studentName}</td>
                  <td className="py-3 text-foreground">{cert.courseTitle}</td>
                  <td className="py-3">{statusBadge(cert.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
