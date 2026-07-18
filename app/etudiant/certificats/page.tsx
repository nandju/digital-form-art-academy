"use client";

import Link from "next/link";
import { Award, Download, Eye, Share2 } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATES } from "@/data/certificates";
import { toast } from "sonner";

const myCertificates = CERTIFICATES.slice(0, 8);

export default function StudentCertificatesPage() {
  return (
    <div>
      <PageHeader
        title="Mes certificats"
        description="Téléchargez et partagez vos attestations de réussite."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {myCertificates.map((certificate) => (
          <DashboardCard key={certificate.id} className="flex flex-col">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <Award className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-heading text-sm font-semibold text-foreground">{certificate.courseTitle}</p>
                <p className="text-xs text-muted-foreground">N° {certificate.certificateNumber}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Formateur :</span> {certificate.instructorName}</p>
              <p><span className="font-medium text-foreground">Délivré le :</span> {new Date(certificate.issueDate).toLocaleDateString("fr-FR")}</p>
              <p><span className="font-medium text-foreground">Mention :</span> {certificate.grade}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">Vérifié</Badge>
              <div className="ml-auto flex items-center gap-2">
                <Button size="icon-sm" variant="ghost" onClick={() => toast.success("Aperçu du certificat simulé.")}>
                  <Eye className="size-4" />
                </Button>
                <Button size="icon-sm" variant="ghost" onClick={() => toast.success("Certificat téléchargé (simulation).")}>
                  <Download className="size-4" />
                </Button>
                <Button size="icon-sm" variant="ghost" onClick={() => toast.success("Lien de partage copié.")}>
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
