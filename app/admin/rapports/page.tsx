"use client";

import { Download, FileText } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { SimpleBarChart } from "@/components/dashboard/charts";
import { toast } from "sonner";

const reports = [
  { id: "R-001", title: "Rapport mensuel - Juillet 2026", type: "Financier", date: "2026-07-15", size: "1.2 Mo" },
  { id: "R-002", title: "Rapport dactivite etudiants - Juin 2026", type: "Pedagogique", date: "2026-07-05", size: "850 Ko" },
  { id: "R-003", title: "Analyse des ventes - T2 2026", type: "Commercial", date: "2026-07-01", size: "1.5 Mo" },
  { id: "R-004", title: "Synthese marketing - Juin 2026", type: "Marketing", date: "2026-06-28", size: "920 Ko" },
];

const monthlyData = [
  { month: "Avr", value: 12 },
  { month: "Mai", value: 18 },
  { month: "Juin", value: 24 },
  { month: "Juil", value: 30 },
];

export default function AdminReportsPage() {
  return (
    <div>
      <PageHeader
        title="Rapports"
        description="Generez et telechargez les rapports de la plateforme."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Rapports disponibles">
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand-bg text-brand-primary">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.type} • {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success(`${report.title} telecharge.`)}>
                  <Download className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Rapports generes par mois">
          <SimpleBarChart data={monthlyData} dataKey="value" xKey="month" />
        </DashboardCard>
      </div>
    </div>
  );
}
