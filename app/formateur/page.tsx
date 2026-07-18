"use client";

import { BookOpen, DollarSign, Eye, Users } from "lucide-react";

import { PageHeader, StatCard, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart, SimpleBarChart } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { COURSES } from "@/data/courses";
import { trainerRevenueData, trainerEnrollmentsData } from "@/data/dashboard";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

const myCourses = COURSES.filter((c) => c.instructorId === "instructor-01").slice(0, 4);

export default function TrainerDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title={`Bienvenue ${user?.fullName.split(" ")[0] ?? ""} 👋`}
        description="Voici les performances de vos formations."
        actions={
          <Button render={<Link href="/formateur/formations/creer" />} nativeButton={false}>
            Créer une formation
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Formations" value={12} icon={BookOpen} trend={{ value: "+2", positive: true }} />
        <StatCard label="Étudiants" value={384} icon={Users} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Revenus" value="2.4M FCFA" icon={DollarSign} trend={{ value: "+12%", positive: true }} accent="text-success" />
        <StatCard label="Vues" value="8 210" icon={Eye} trend={{ value: "+5%", positive: true }} accent="text-brand-secondary" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Revenus (FCFA)">
          <TrendAreaChart data={trainerRevenueData} dataKey="revenus" xKey="month" />
        </DashboardCard>
        <DashboardCard title="Inscriptions">
          <SimpleBarChart data={trainerEnrollmentsData} dataKey="inscriptions" xKey="month" />
        </DashboardCard>
      </div>

      <DashboardCard title="Formations les plus populaires" className="mt-6">
        <div className="space-y-4">
          {myCourses.map((course) => (
            <div key={course.id} className="flex items-center gap-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-lg">
                <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium text-foreground">{course.title}</p>
                <p className="text-xs text-muted-foreground">{course.studentsCount} étudiants • {course.rating} ★</p>
                <Progress value={Math.min(course.studentsCount / 4, 100)} className="mt-2 h-1.5" />
              </div>
              <Badge variant="secondary">{course.price.toLocaleString("fr-FR")} FCFA</Badge>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
