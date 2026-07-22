"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Award, CheckCircle2, ChevronLeft, ChevronRight, Download, FileText, PlayCircle } from "lucide-react";

import type { Course, Lesson, Module } from "@/types";
import { Container } from "@/components/shared/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { QuizPlayer } from "./quiz-player";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PROGRESS_KEY = "dfa_student_progress_v1";

interface ProgressStore {
  [courseId: string]: {
    completedLessonIds: string[];
  };
}

function readProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

function writeProgress(store: ProgressStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

function flatLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons);
}

export function CoursePlayer({ course }: { course: Course }) {
  const router = useRouter();
  const [store, setStore] = React.useState<ProgressStore>({});
  const [selectedLessonId, setSelectedLessonId] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const initial = readProgress();
    setStore(initial);
    const first = flatLessons(course)[0];
    if (first) setSelectedLessonId(first.id);
  }, [course]);

  const completedIds = React.useMemo(() => store[course.id]?.completedLessonIds ?? [], [store, course.id]);

  const markLessonComplete = (lessonId: string) => {
    setStore((prev) => {
      const next = { ...prev, [course.id]: { completedLessonIds: [...(prev[course.id]?.completedLessonIds ?? [])] } };
      if (!next[course.id].completedLessonIds.includes(lessonId)) {
        next[course.id].completedLessonIds.push(lessonId);
      }
      writeProgress(next);
      return next;
    });
  };

  const isLessonComplete = (lessonId: string) => completedIds.includes(lessonId);

  const allLessons = React.useMemo(() => flatLessons(course), [course]);
  const selectedLesson = React.useMemo(
    () => allLessons.find((l) => l.id === selectedLessonId) ?? allLessons[0],
    [allLessons, selectedLessonId]
  );

  const completedCount = allLessons.filter((l) => isLessonComplete(l.id)).length;
  const progress = Math.round((completedCount / allLessons.length) * 100);
  const courseComplete = completedCount === allLessons.length;

  const currentIndex = allLessons.findIndex((l) => l.id === selectedLesson?.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) setSelectedLessonId(allLessons[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (hasNext) setSelectedLessonId(allLessons[currentIndex + 1].id);
  };

  const handleQuizPassed = () => {
    if (selectedLesson) markLessonComplete(selectedLesson.id);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-brand-primary py-4 text-white">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-lg font-semibold">{course.title}</h1>
              <p className="text-sm text-white/70">{course.categoryName} · {course.level}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 sm:w-48">
                <div className="flex justify-between text-xs text-white/80">
                  <span>Progression</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
              <Button variant="secondary" size="sm" onClick={() => router.push(`/formations/${course.slug}`)}>
                Fermer
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 font-heading text-sm font-semibold text-foreground">Programme</h2>
          <div className="flex flex-col gap-3">
            {course.modules.map((module) => (
              <ModuleList
                key={module.id}
                module={module}
                selectedLessonId={selectedLesson?.id}
                isComplete={isLessonComplete}
                onSelect={setSelectedLessonId}
              />
            ))}
          </div>
        </aside>

        <main className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {selectedLesson?.type === "video" && "Vidéo"}
                  {selectedLesson?.type === "document" && "Document"}
                  {selectedLesson?.type === "quiz" && "Quiz"}
                </Badge>
                <h2 className="font-heading text-xl font-semibold text-foreground">{selectedLesson?.title}</h2>
              </div>
              {isLessonComplete(selectedLesson?.id ?? "") && (
                <Badge className="bg-success/10 text-success">
                  <CheckCircle2 className="mr-1 size-3" />
                  Terminé
                </Badge>
              )}
            </div>

            {selectedLesson && (
              <LessonContent
                lesson={selectedLesson}
                onMarkComplete={() => {
                  markLessonComplete(selectedLesson.id);
                  toast.success("Leçon marquée comme terminée");
                  if (hasNext) handleNext();
                }}
                onQuizPassed={handleQuizPassed}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={!hasPrevious}>
              <ChevronLeft className="mr-2 size-4" />
              Précédent
            </Button>
            <Button onClick={handleNext} disabled={!hasNext}>
              Suivant
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>

          {courseComplete && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-success/20 bg-success/5 p-6 text-center">
              <Award className="size-10 text-success" />
              <h3 className="font-heading text-lg font-semibold text-foreground">Formation terminée !</h3>
              <p className="text-sm text-muted-foreground">
                Vous avez validé tous les modules. {course.certificateIncluded && "Demandez votre certificat depuis la page Certificats."}
              </p>
              {course.certificateIncluded && (
                <Button onClick={() => router.push("/etudiant/certificats")} className="w-fit">
                  Voir mes certificats
                </Button>
              )}
              {course.summaryPdfUrl && (
                <a
                  href={course.summaryPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
                >
                  <Download className="mr-2 size-4" />
                  Télécharger le récapitulatif PDF
                </a>
              )}
            </div>
          )}
        </main>
      </Container>
    </div>
  );
}

function ModuleList({
  module,
  selectedLessonId,
  isComplete,
  onSelect,
}: {
  module: Module;
  selectedLessonId?: string;
  isComplete: (id: string) => boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-muted-foreground">{module.title}</p>
      <div className="flex flex-col gap-1">
        {module.lessons.map((lesson) => {
          const Icon =
            lesson.type === "video" ? PlayCircle : lesson.type === "document" ? FileText : CheckCircle2;
          return (
            <button
              key={lesson.id}
              onClick={() => onSelect(lesson.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition",
                selectedLessonId === lesson.id
                  ? "bg-brand-secondary/10 text-brand-secondary"
                  : "text-muted-foreground hover:bg-brand-bg",
                isComplete(lesson.id) && "font-medium text-success"
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              <span className="line-clamp-1 flex-1">{lesson.title}</span>
              {isComplete(lesson.id) && <CheckCircle2 className="size-3 text-success" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LessonContent({
  lesson,
  onMarkComplete,
  onQuizPassed,
}: {
  lesson: Lesson;
  onMarkComplete: () => void;
  onQuizPassed: () => void;
}) {
  if (lesson.type === "video") {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          {lesson.videoUrl ? (
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <MediaPlaceholder seed={lesson.id} variant="banner" className="h-full w-full" />
          )}
        </div>
        {lesson.content && <p className="text-sm leading-relaxed text-muted-foreground">{lesson.content}</p>}
        <Button onClick={onMarkComplete} className="w-fit">
          <CheckCircle2 className="mr-2 size-4" />
          J&apos;ai regardé la vidéo
        </Button>
      </div>
    );
  }

  if (lesson.type === "document") {
    return (
      <div className="flex flex-col gap-5">
        {lesson.content && (
          <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{lesson.content}</div>
        )}
        {lesson.images && lesson.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lesson.images.map((src, idx) => (
              <div key={idx} className="relative aspect-video overflow-hidden rounded-xl">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        <Button onClick={onMarkComplete} className="w-fit">
          <CheckCircle2 className="mr-2 size-4" />
          J&apos;ai lu le document
        </Button>
      </div>
    );
  }

  if (lesson.type === "quiz" && lesson.quiz) {
    return <QuizPlayer quiz={lesson.quiz} onPassed={onQuizPassed} />;
  }

  return <p className="text-sm text-muted-foreground">Leçon non disponible.</p>;
}
