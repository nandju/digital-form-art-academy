"use client";

import { CheckCircle, Clock, PlayCircle } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Progress } from "@/components/ui/progress";
import { COURSES } from "@/data/courses";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";

const history = COURSES.slice(0, 8).map((course, index) => ({
  course,
  action: ["Leçon terminée", "Quiz réussi", "Formation commencée", "Certificat obtenu", "Formation consultée", "Avis laissé", "Leçon terminée", "Session live assistée"][index],
  date: ["Il y a 10 min", "Hier", "Il y a 2 jours", "Il y a 3 jours", "La semaine dernière", "Il y a 2 semaines", "Il y a 3 semaines", "Le mois dernier"][index],
  icon: [CheckCircle, CheckCircle, PlayCircle, Clock, PlayCircle, CheckCircle, CheckCircle, Clock][index],
}));

export default function StudentHistoryPage() {
  return (
    <div>
      <PageHeader
        title="Historique"
        description="Vos dernières activités sur la plateforme."
      />

      <div className="space-y-3">
        {history.map(({ course, action, date, icon: Icon }) => (
          <DashboardCard key={`${course.id}-${action}`} className="flex items-center gap-4">
            <div className="size-12 shrink-0 overflow-hidden rounded-lg">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 font-medium text-foreground">{course.title}</p>
              <p className="text-sm text-muted-foreground">{action} • {date}</p>
            </div>
            <Icon className="size-5 shrink-0 text-brand-secondary" />
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
