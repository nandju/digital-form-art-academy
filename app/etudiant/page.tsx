"use client";

import Link from "next/link";
import { Award, BookOpen, Clock, Flame, PlayCircle, Sparkles, TrendingUp } from "lucide-react";

import { PageHeader, StatCard, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { TrendAreaChart, DonutChart } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/shared/course-card";
import { COURSES } from "@/data/courses";
import { studentLearningHours, studentProgressData } from "@/data/dashboard";
import { useAuth } from "@/lib/auth-context";

const enrolled = COURSES.slice(0, 4).map((course, index) => ({
  course,
  progress: [72, 45, 90, 20][index],
  completedModules: Math.round(([72, 45, 90, 20][index] / 100) * course.modules.length),
  remainingMinutes: Math.max(0, Math.round(course.duration * (1 - [72, 45, 90, 20][index] / 100))),
}));

const enrolledCourseIds = new Set(enrolled.map(({ course }) => course.id));
const enrolledCategoryIds = new Set(enrolled.map(({ course }) => course.categoryId));
const recommendations = COURSES.filter(
  (c) => !enrolledCourseIds.has(c.id) && enrolledCategoryIds.has(c.categoryId)
).slice(0, 3);

export default function StudentDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title={`Bonjour ${user?.fullName.split(" ")[0] ?? ""} 👋`}
        description="Voici un aperçu de votre progression cette semaine."
        actions={
          <Button render={<Link href="/catalogue" />} nativeButton={false}>
            <BookOpen className="size-4" />
            Explorer les formations
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Formations suivies" value={9} icon={BookOpen} trend={{ value: "+2 ce mois", positive: true }} />
        <StatCard label="Heures d'apprentissage" value="84h" icon={Clock} trend={{ value: "+16h", positive: true }} accent="text-brand-secondary" />
        <StatCard label="Certificats obtenus" value={4} icon={Award} trend={{ value: "+1", positive: true }} accent="text-premium" />
        <StatCard label="Série d'apprentissage" value="12 j" icon={Flame} accent="text-warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DashboardCard title="Temps d'apprentissage" className="lg:col-span-2">
          <TrendAreaChart data={studentLearningHours} dataKey="heures" xKey="month" />
        </DashboardCard>
        <DashboardCard title="Répartition des formations">
          <DonutChart data={studentProgressData} />
        </DashboardCard>
      </div>

      <DashboardCard
        title="Continuer l'apprentissage"
        className="mt-6"
        action={
          <Link href="/etudiant/formations" className="text-sm font-medium text-brand-secondary hover:underline">
            Voir tout
          </Link>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {enrolled.map(({ course, progress, completedModules, remainingMinutes }) => (
            <div key={course.id} className="flex gap-4 rounded-xl border border-border p-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-lg">
                <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">{course.title}</p>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {progress}%
                  </Badge>
                </div>
                <Progress value={progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {completedModules}/{course.modules.length} modules · {remainingMinutes} min restantes
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-1 w-fit"
                  render={<Link href={`/formations/${course.slug}`} />}
                  nativeButton={false}
                >
                  <PlayCircle className="size-3.5" />
                  Reprendre
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {recommendations.length > 0 && (
        <DashboardCard
          title="Recommandations pour vous"
          className="mt-6"
          action={
            <Link href="/catalogue" className="text-sm font-medium text-brand-secondary hover:underline">
              Voir le catalogue
            </Link>
          }
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </DashboardCard>
      )}

      <DashboardCard title="Objectif hebdomadaire" className="mt-6">
        <div className="flex items-center gap-4">
          <TrendingUp className="size-8 text-success" />
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">16h / 20h cette semaine</span>
              <span className="font-medium text-foreground">80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
