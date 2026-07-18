"use client";

import { CheckCircle, CreditCard, Download, XCircle } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const payments = [
  { id: "PAI-001", user: "Aicha Kone", course: "Design UI/UX", date: "2026-07-18", amount: 25000, method: "Mobile Money", status: "paye" },
  { id: "PAI-002", user: "Koffi Yao", course: "Dev Web Full-Stack", date: "2026-07-17", amount: 65000, method: "Carte", status: "paye" },
  { id: "PAI-003", user: "Fatou Bamba", course: "Marketing Digital", date: "2026-07-17", amount: 35000, method: "Mobile Money", status: "attente" },
  { id: "PAI-004", user: "Yves Kouassi", course: "Data Science", date: "2026-07-16", amount: 78000, method: "Virement", status: "paye" },
  { id: "PAI-005", user: "Ami Diallo", course: "Excel Pro", date: "2026-07-15", amount: 15000, method: "Mobile Money", status: "echec" },
];

export default function AdminPaymentsPage() {
  return (
    <div>
      <PageHeader
        title="Paiements"
        description="Supervisez les transactions et les remboursements."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total du mois" value="4.8M FCFA" icon={CreditCard} trend={{ value: "+8%", positive: true }} />
        <StatCard label="Transactions" value="124" icon={CheckCircle} />
        <StatCard label="En attente" value="8" icon={CreditCard} accent="text-warning" />
      </div>

      <DashboardCard className="mt-6">
        <div className="mb-4 flex justify-end">
          <Button variant="outline" onClick={() => toast.success("Export des paiements simule.")}>
            <Download className="size-4" />
            Exporter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Reference</th>
                <th className="pb-3 font-medium">Utilisateur</th>
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Methode</th>
                <th className="pb-3 font-medium text-right">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-medium text-foreground">{p.id}</td>
                  <td className="py-3 text-muted-foreground">{p.user}</td>
                  <td className="py-3 text-foreground">{p.course}</td>
                  <td className="py-3 text-muted-foreground">{new Date(p.date).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3 text-muted-foreground">{p.method}</td>
                  <td className="py-3 text-right font-medium text-foreground">{p.amount.toLocaleString("fr-FR")} FCFA</td>
                  <td className="py-3">
                    {p.status === "paye" ? <Badge className="bg-success/10 text-success">Paye</Badge> : p.status === "attente" ? <Badge variant="outline">En attente</Badge> : <Badge variant="destructive">Echec</Badge>}
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
