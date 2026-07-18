"use client";

import { Download, Wallet } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { trainerRevenueData } from "@/data/dashboard";
import { toast } from "sonner";

const transactions = [
  { id: "REV-001", date: "2026-07-01", course: "Design UI/UX Avance", amount: 175000, status: "Paye" },
  { id: "REV-002", date: "2026-07-02", course: "Developpement Web Full-Stack", amount: 320000, status: "Paye" },
  { id: "REV-003", date: "2026-07-03", course: "Marketing Digital", amount: 98000, status: "En attente" },
  { id: "REV-004", date: "2026-07-05", course: "Data Science avec Python", amount: 145000, status: "Paye" },
];

export default function TrainerRevenuePage() {
  return (
    <div>
      <PageHeader
        title="Revenus"
        description="Suivez vos gains et demandez un retrait."
        actions={
          <Button onClick={() => toast.success("Demande de retrait simulee.")}>
            <Wallet className="size-4" />
            Demander un retrait
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Solde disponible" value="1.85M FCFA" icon={Wallet} accent="text-success" />
        <StatCard label="Revenus ce mois" value="842k FCFA" icon={Wallet} trend={{ value: "+15%", positive: true }} />
        <StatCard label="Retraits effectues" value="1.2M FCFA" icon={Download} />
      </div>

      <DashboardCard title="Evolution des revenus" className="mt-6">
        <TrendAreaChart data={trainerRevenueData} dataKey="revenus" xKey="month" height={320} />
      </DashboardCard>

      <DashboardCard title="Dernieres transactions" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Reference</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Formation</th>
                <th className="pb-3 font-medium text-right">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-3 font-medium text-foreground">{t.id}</td>
                  <td className="py-3 text-muted-foreground">{new Date(t.date).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3 text-foreground">{t.course}</td>
                  <td className="py-3 text-right font-medium text-foreground">{t.amount.toLocaleString("fr-FR")} FCFA</td>
                  <td className="py-3 text-muted-foreground">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
