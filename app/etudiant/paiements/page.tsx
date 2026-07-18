"use client";

import { CheckCircle, Clock, CreditCard, Download, XCircle } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const payments = [
  { id: "PAI-2026-001", course: "Formation complète en Design UI/UX", date: "2026-01-15", amount: 25000, method: "Mobile Money", status: "completed" },
  { id: "PAI-2026-002", course: "Développement Web Full-Stack", date: "2026-02-03", amount: 65000, method: "Carte bancaire", status: "completed" },
  { id: "PAI-2026-003", course: "Marketing Digital Avancé", date: "2026-02-20", amount: 35000, method: "Mobile Money", status: "pending" },
  { id: "PAI-2026-004", course: "Data Science avec Python", date: "2026-03-08", amount: 78000, method: "Virement", status: "completed" },
  { id: "PAI-2026-005", course: "Leadership et Gestion d'équipe", date: "2026-03-25", amount: 29000, method: "Mobile Money", status: "failed" },
];

function statusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-success/10 text-success hover:bg-success/10"><CheckCircle className="mr-1 size-3" /> Payé</Badge>;
    case "pending":
      return <Badge variant="outline" className="text-warning"><Clock className="mr-1 size-3" /> En attente</Badge>;
    case "failed":
      return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/10"><XCircle className="mr-1 size-3" /> Échoué</Badge>;
    default:
      return null;
  }
}

export default function StudentPaymentsPage() {
  return (
    <div>
      <PageHeader
        title="Mes paiements"
        description="Historique de vos transactions et factures."
      />

      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Méthode</th>
                <th className="pb-3 font-medium text-right">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-3 font-medium text-foreground">{payment.course}</td>
                  <td className="py-3 text-muted-foreground">{new Date(payment.date).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3 text-muted-foreground">{payment.method}</td>
                  <td className="py-3 text-right font-medium text-foreground">{payment.amount.toLocaleString("fr-FR")} FCFA</td>
                  <td className="py-3">{statusBadge(payment.status)}</td>
                  <td className="py-3 text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => toast.success(`Facture ${payment.id} téléchargée.`)}>
                      <Download className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardCard className="flex items-center gap-3">
          <CreditCard className="size-5 text-brand-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Total payé</p>
            <p className="font-heading text-lg font-bold text-foreground">168 000 FCFA</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
