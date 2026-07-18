"use client";

import { ScrollText } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Badge } from "@/components/ui/badge";

const logs = [
  { id: 1, user: "Grace Adjei", action: "a valide la formation Design UI/UX", date: "2026-07-18 14:32", type: "validation" },
  { id: 2, user: "System", action: "sauvegarde automatique effectuee", date: "2026-07-18 13:00", type: "system" },
  { id: 3, user: "Serge Aka", action: "a publie un nouveau cours", date: "2026-07-18 11:15", type: "creation" },
  { id: 4, user: "Grace Adjei", action: "a supprime le coupon EXPIRE20", date: "2026-07-17 16:45", type: "suppression" },
  { id: 5, user: "Aicha Kone", action: "a obtenu un certificat", date: "2026-07-17 09:20", type: "certificat" },
  { id: 6, user: "System", action: "paiement confirme PAI-2026-003", date: "2026-07-16 18:10", type: "system" },
];

function typeBadge(type: string) {
  switch (type) {
    case "validation":
      return <Badge className="bg-success/10 text-success">Validation</Badge>;
    case "creation":
      return <Badge className="bg-brand-primary/10 text-brand-primary">Creation</Badge>;
    case "suppression":
      return <Badge variant="destructive">Suppression</Badge>;
    case "certificat":
      return <Badge className="bg-premium/10 text-premium">Certificat</Badge>;
    default:
      return <Badge variant="secondary">Systeme</Badge>;
  }
}

export default function AdminJournalPage() {
  return (
    <div>
      <PageHeader
        title="Journal"
        description="Historique des actions sur la plateforme."
      />

      <DashboardCard>
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-primary">
                  <ScrollText className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-foreground"><span className="font-medium">{log.user}</span> {log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.date}</p>
                </div>
              </div>
              {typeBadge(log.type)}
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
