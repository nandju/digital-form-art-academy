"use client";

import { BarChart3, Users, BookOpen, CreditCard } from "lucide-react";

import { PageHeader, StatCard, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart, SimpleBarChart, DonutChart } from "@/components/dashboard/charts";
import { adminRevenueData, adminUsersGrowth, categoryDistribution, paymentMethodsDistribution } from "@/data/dashboard";

export default function AdminStatsPage() {
  return (
    <div>
      <PageHeader
        title="Statistiques"
        description="Analyse detaillee de lactivite de la plateforme."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Utilisateurs actifs" value="6 320" icon={Users} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Formations vues" value="84.1k" icon={BookOpen} trend={{ value: "+5%", positive: true }} />
        <StatCard label="Certificats delivres" value="1 240" icon={BarChart3} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Revenus" value="64.2M" icon={CreditCard} trend={{ value: "+9%", positive: true }} accent="text-success" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Revenus mensuels (FCFA)">
          <TrendAreaChart data={adminRevenueData} dataKey="revenus" xKey="month" />
        </DashboardCard>
        <DashboardCard title="Croissance utilisateurs">
          <SimpleBarChart data={adminUsersGrowth} dataKey="utilisateurs" xKey="month" />
        </DashboardCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Repartition par categorie">
          <DonutChart data={categoryDistribution} />
        </DashboardCard>
        <DashboardCard title="Modes de paiement">
          <DonutChart data={paymentMethodsDistribution} />
        </DashboardCard>
      </div>
    </div>
  );
}
