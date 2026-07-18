"use client";

import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const events = [
  { id: 1, title: "Séance live : Design Figma avancé", date: "2026-07-20", time: "10:00 - 11:30", type: "live" },
  { id: 2, title: "Quiz final - Développement Web", date: "2026-07-22", time: "14:00", type: "quiz" },
  { id: 3, title: "Date limite du projet Marketing Digital", date: "2026-07-25", time: "23:59", type: "deadline" },
  { id: 4, title: "Mentorat individuel", date: "2026-07-28", time: "09:00 - 09:45", type: "live" },
];

function typeBadge(type: string) {
  switch (type) {
    case "live":
      return <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10"><Video className="mr-1 size-3" /> Live</Badge>;
    case "quiz":
      return <Badge variant="secondary">Évaluation</Badge>;
    case "deadline":
      return <Badge variant="destructive">Date limite</Badge>;
    default:
      return null;
  }
}

export default function StudentCalendarPage() {
  return (
    <div>
      <PageHeader
        title="Calendrier"
        description="Vos sessions, échéances et rendez-vous à venir."
      />

      <div className="space-y-3">
        {events.map((event) => (
          <DashboardCard key={event.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-primary">
                <CalendarIcon className="size-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">{event.title}</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="size-3.5" /> {new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} • {event.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {typeBadge(event.type)}
              {event.type === "live" && (
                <Button size="sm" onClick={() => toast.success("Lien de la session live ouvert.")}>Rejoindre</Button>
              )}
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
