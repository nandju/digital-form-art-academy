"use client";

import { BarChart3, BookOpen, Eye, Users } from "lucide-react";

import { PageHeader, StatCard, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart, SimpleBarChart, DonutChart } from "@/components/dashboard/charts";
import { trainerRevenueData, trainerEnrollmentsData, categoryDistribution } from "@/data/dashboard";

export default function TrainerStatsPage() {
  return (
    <div>
      <PageHeader
        title="Statistiques"
        description="Analysez la performance de vos formations."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Ventes" value="1 240" icon={BookOpen} trend={{ value: "+8%", positive: true }} />
        <StatCard label="Vues" value="45.2k" icon={Eye} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Inscriptions" value="384" icon={Users} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Taux de completion" value="72%" icon={BarChart3} trend={{ value: "+4%", positive: true }} accent="text-success" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Revenus mensuels (FCFA)">
          <TrendAreaChart data={trainerRevenueData} dataKey="revenus" xKey="month" />
        </DashboardCard>
        <DashboardCard title="Inscriptions par mois">
          <SimpleBarChart data={trainerEnrollmentsData} dataKey="inscriptions" xKey="month" />
        </DashboardCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DashboardCard title="Repartition par categorie" className="lg:col-span-1">
          <DonutChart data={categoryDistribution} />
        </DashboardCard>
        <DashboardCard title="Meilleures lecons" className="lg:col-span-2">
          <div className="space-y-3">
            {["Introduction a Figma", "Prototypage avance", "Autolayout et composants", "Design system", "Export et handoff"].map((lesson, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">{i + 1}.</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{lesson}</p>
                  <div className="h-2 w-full rounded-full bg-brand-bg overflow-hidden">
                    <div className="h-full rounded-full bg-brand-primary" style={{ width: `${92 - i * 8}%` }} />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{92 - i * 8}%</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
