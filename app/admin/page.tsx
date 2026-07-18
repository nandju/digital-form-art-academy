"use client";

import { Award, BookOpen, CreditCard, Users } from "lucide-react";

import { PageHeader, StatCard, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart, SimpleBarChart, DonutChart } from "@/components/dashboard/charts";
import { adminRevenueData, adminUsersGrowth, categoryDistribution, paymentMethodsDistribution } from "@/data/dashboard";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Tableau de bord administrateur"
        description="Vue densemble de la plateforme."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Utilisateurs" value="6 500" icon={Users} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Formations" value={42} icon={BookOpen} trend={{ value: "+5", positive: true }} />
        <StatCard label="Certificats" value={128} icon={Award} trend={{ value: "+18", positive: true }} />
        <StatCard label="Revenus" value="64.2M FCFA" icon={CreditCard} trend={{ value: "+9%", positive: true }} accent="text-success" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Revenus mensuels (FCFA)">
          <TrendAreaChart data={adminRevenueData} dataKey="revenus" xKey="month" />
        </DashboardCard>
        <DashboardCard title="Croissance des utilisateurs">
          <SimpleBarChart data={adminUsersGrowth} dataKey="utilisateurs" xKey="month" />
        </DashboardCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Repartition des categories">
          <DonutChart data={categoryDistribution} />
        </DashboardCard>
        <DashboardCard title="Modes de paiement">
          <DonutChart data={paymentMethodsDistribution} />
        </DashboardCard>
      </div>
    </div>
  );
}
