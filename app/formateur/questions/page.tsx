"use client";

import { CheckCircle, MessageSquare, Send } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const questions = [
  { id: 1, student: "Aicha Kone", course: "Design UI/UX Avance", message: "Quelle est la difference entre UX et UI ?", answered: false },
  { id: 2, student: "Koffi Yao", course: "Developpement Web Full-Stack", message: "Pouvez-vous clarifier l'utilisation de useEffect ?", answered: true },
  { id: 3, student: "Fatou Bamba", course: "Marketing Digital", message: "Le cours sur le SEO est-il mis a jour regulierement ?", answered: false },
  { id: 4, student: "Yves Kouassi", course: "Data Science avec Python", message: "Merci pour la clarification sur les DataFrames !", answered: true },
];

export default function TrainerQuestionsPage() {
  return (
    <div>
      <PageHeader
        title="Questions des etudiants"
        description="Repondez aux questions de vos apprenants."
      />

      <div className="space-y-4">
        {questions.map((q) => (
          <DashboardCard key={q.id}>
            <div className="flex items-start gap-4">
              <Avatar className="size-10">
                <AvatarFallback className="bg-brand-secondary text-white text-xs">
                  {q.student.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{q.student}</p>
                  <Badge variant={q.answered ? "secondary" : "default"}>
                    {q.answered ? "Repondu" : "En attente"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{q.course}</p>
                <p className="mt-2 text-sm text-foreground">{q.message}</p>
                {!q.answered && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success("Reponse envoyee.");
                    }}
                    className="mt-3 space-y-2"
                  >
                    <Textarea rows={2} placeholder="Votre reponse..." />
                    <Button size="sm" type="submit">
                      <Send className="size-3.5" />
                      Repondre
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
