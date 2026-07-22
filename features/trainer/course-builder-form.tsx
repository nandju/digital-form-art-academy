"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  ListChecks,
  Plus,
  PlayCircle,
  Trash2,
} from "lucide-react";

import type { Course, CourseLanguage, CourseLevel, Lesson, Module, Quiz } from "@/types";
import { DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/data/categories";
import { useTrainerCourses, type CourseDraft } from "@/lib/course-store";
import { QuizBuilderDialog } from "@/features/trainer/quiz-builder-dialog";

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function emptyModule(): Module {
  return { id: uid("module"), title: "", description: "", lessons: [], duration: 0 };
}

function emptyLesson(): Lesson {
  return { id: uid("lesson"), title: "", type: "video", duration: 10 };
}

interface GeneralInfo {
  title: string;
  subtitle: string;
  description: string;
  categoryId: string;
  level: CourseLevel;
  language: CourseLanguage;
  price: number;
  originalPrice: number | undefined;
  certificateIncluded: boolean;
  learningOutcomes: string;
  requirements: string;
  summaryPdfUrl: string;
  tags: string;
}

function courseToGeneralInfo(course?: Course): GeneralInfo {
  return {
    title: course?.title ?? "",
    subtitle: course?.subtitle ?? "",
    description: course?.description ?? "",
    categoryId: course?.categoryId ?? CATEGORIES[0].id,
    level: course?.level ?? "débutant",
    language: course?.language ?? "Français",
    price: course?.price ?? 15000,
    originalPrice: course?.originalPrice,
    certificateIncluded: course?.certificateIncluded ?? true,
    summaryPdfUrl: course?.summaryPdfUrl ?? "",
    learningOutcomes: course?.learningOutcomes.join("\n") ?? "",
    requirements: course?.requirements.join("\n") ?? "",
    tags: course?.tags.join(", ") ?? "",
  };
}

export function CourseBuilderForm({
  instructorId,
  course,
}: {
  instructorId: string;
  course?: Course;
}) {
  const router = useRouter();
  const { createCourse, updateCourse } = useTrainerCourses(instructorId);
  const isEdit = Boolean(course);

  const [info, setInfo] = React.useState<GeneralInfo>(() => courseToGeneralInfo(course));
  const [modules, setModules] = React.useState<Module[]>(() => course?.modules ?? []);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const setField = <K extends keyof GeneralInfo>(key: K, value: GeneralInfo[K]) =>
    setInfo((prev) => ({ ...prev, [key]: value }));

  const toggleExpanded = (moduleId: string) =>
    setExpanded((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));

  const addModuleRow = () => {
    const newModule = emptyModule();
    setModules((prev) => [...prev, newModule]);
    setExpanded((prev) => ({ ...prev, [newModule.id]: true }));
  };

  const updateModuleRow = (moduleId: string, patch: Partial<Module>) =>
    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, ...patch } : m)));

  const removeModuleRow = (moduleId: string) =>
    setModules((prev) => prev.filter((m) => m.id !== moduleId));

  const addLessonRow = (moduleId: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, emptyLesson()] }
          : m
      )
    );

  const updateLessonRow = (moduleId: string, lessonId: string, patch: Partial<Lesson>) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) }
          : m
      )
    );

  const removeLessonRow = (moduleId: string, lessonId: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
      )
    );

  const setLessonQuizRow = (moduleId: string, lessonId: string, quiz: Quiz) =>
    updateLessonRow(moduleId, lessonId, { quiz });

  const buildDraft = (status: Course["status"]): CourseDraft => ({
    title: info.title.trim(),
    subtitle: info.subtitle.trim(),
    description: info.description.trim(),
    categoryId: info.categoryId,
    level: info.level,
    language: info.language,
    price: info.price,
    originalPrice: info.originalPrice,
    certificateIncluded: info.certificateIncluded,
    summaryPdfUrl: info.summaryPdfUrl.trim(),
    learningOutcomes: info.learningOutcomes.split("\n").map((s) => s.trim()).filter(Boolean),
    requirements: info.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
    tags: info.tags.split(",").map((s) => s.trim()).filter(Boolean),
    modules,
    status,
  });

  const handleSubmit = (status: Course["status"]) => {
    if (!info.title.trim()) {
      toast.error("Le titre de la formation est requis.");
      return;
    }
    const draft = buildDraft(status);
    if (isEdit && course) {
      updateCourse(course.id, {
        title: draft.title,
        subtitle: draft.subtitle,
        description: draft.description,
        categoryId: draft.categoryId,
        categoryName: CATEGORIES.find((c) => c.id === draft.categoryId)?.name ?? course.categoryName,
        level: draft.level,
        language: draft.language,
        price: draft.price,
        originalPrice: draft.originalPrice,
        certificateIncluded: draft.certificateIncluded,
        summaryPdfUrl: draft.summaryPdfUrl,
        learningOutcomes: draft.learningOutcomes,
        requirements: draft.requirements,
        tags: draft.tags,
        modules: draft.modules,
        status,
      });
      toast.success(status === "publie" ? "Formation publiée." : "Modifications enregistrées.");
    } else {
      createCourse(draft);
      toast.success(
        status === "publie" ? "Formation créée et publiée." : "Formation enregistrée en brouillon."
      );
    }
    router.push("/formateur/formations");
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <DashboardCard title="Informations générales">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title">Titre de la formation</Label>
              <Input
                id="title"
                placeholder="Ex. Maîtrise Photoshop de A à Z"
                value={info.title}
                onChange={(e) => setField("title", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                placeholder="Une accroche courte et claire"
                value={info.subtitle}
                onChange={(e) => setField("subtitle", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Décrivez le contenu et les objectifs..."
                value={info.description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={info.categoryId} onValueChange={(v) => setField("categoryId", v ?? info.categoryId)}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="level">Niveau</Label>
                <Select value={info.level} onValueChange={(v) => setField("level", (v as CourseLevel) ?? info.level)}>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="débutant">Débutant</SelectItem>
                    <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                    <SelectItem value="avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                <Input id="tags" placeholder="React, Next.js, JavaScript" value={info.tags} onChange={(e) => setField("tags", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="language">Langue</Label>
                <Select value={info.language} onValueChange={(v) => setField("language", (v as CourseLanguage) ?? info.language)}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Choisir une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Anglais">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Objectifs et prérequis">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="outcomes">Ce que les étudiants vont apprendre (une ligne par objectif)</Label>
              <Textarea
                id="outcomes"
                rows={4}
                value={info.learningOutcomes}
                onChange={(e) => setField("learningOutcomes", e.target.value)}
                placeholder={"Comprendre les fondamentaux\nRéaliser un projet pratique"}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="requirements">Prérequis (une ligne par prérequis)</Label>
              <Textarea
                id="requirements"
                rows={4}
                value={info.requirements}
                onChange={(e) => setField("requirements", e.target.value)}
                placeholder={"Un ordinateur avec connexion internet\nAucune expérience préalable requise"}
              />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Programme de la formation"
          action={
            <Button type="button" size="sm" variant="outline" onClick={addModuleRow}>
              <Plus className="size-4" />
              Ajouter un module
            </Button>
          }
        >
          {modules.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun module pour le moment. Ajoutez votre premier module.</p>
          )}
          <div className="flex flex-col gap-5">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="rounded-xl border border-border">
                <div className="flex items-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(module.id)}
                    className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground"
                  >
                    {expanded[module.id] ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </button>
                  <Input
                    value={module.title}
                    onChange={(e) => updateModuleRow(module.id, { title: e.target.value })}
                    placeholder={`Titre du module ${moduleIndex + 1}`}
                    className="flex-1"
                  />
                  <Button type="button" size="icon-sm" variant="ghost" onClick={() => removeModuleRow(module.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {expanded[module.id] && (
                  <div className="flex flex-col gap-3 border-t border-border p-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
                        <span className="text-xs font-medium text-muted-foreground">#{lessonIndex + 1}</span>
                        <Input
                          value={lesson.title}
                          onChange={(e) => updateLessonRow(module.id, lesson.id, { title: e.target.value })}
                          placeholder="Titre de la leçon"
                          className="min-w-[180px] flex-1"
                        />
                        <Select
                          value={lesson.type}
                          onValueChange={(v) =>
                            updateLessonRow(module.id, lesson.id, { type: (v as Lesson["type"]) ?? lesson.type })
                          }
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Vidéo</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          min={1}
                          value={lesson.duration}
                          onChange={(e) => updateLessonRow(module.id, lesson.id, { duration: Number(e.target.value) })}
                          placeholder="Durée (min)"
                          className="w-24"
                        />
                        {lesson.type === "video" && (
                          <PlayCircle className="size-4 shrink-0 text-brand-secondary" />
                        )}
                        {lesson.type === "document" && (
                          <FileText className="size-4 shrink-0 text-brand-secondary" />
                        )}
                        {lesson.type === "quiz" && (
                          <QuizBuilderDialog
                            quiz={lesson.quiz}
                            onSave={(quiz) => setLessonQuizRow(module.id, lesson.id, quiz)}
                            trigger={
                              <Button type="button" size="sm" variant="outline">
                                <ListChecks className="size-3.5" />
                                {lesson.quiz ? `${lesson.quiz.questions.length} question(s)` : "Configurer"}
                              </Button>
                            }
                          />
                        )}
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          className="ml-auto"
                          onClick={() => removeLessonRow(module.id, lesson.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" size="sm" variant="outline" onClick={() => addLessonRow(module.id)}>
                      <Plus className="size-3.5" />
                      Ajouter une leçon
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="space-y-8">
        <DashboardCard title="Prix et accessibilité">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="price">Prix (FCFA)</Label>
              <Input
                id="price"
                type="number"
                value={info.price}
                onChange={(e) => setField("price", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="originalPrice">Prix barré (optionnel)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={info.originalPrice ?? ""}
                onChange={(e) => setField("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Certificat inclus</p>
                <p className="text-xs text-muted-foreground">Les étudiants pourront demander un certificat.</p>
              </div>
              <Switch
                checked={info.certificateIncluded}
                onCheckedChange={(checked) => setField("certificateIncluded", checked)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="summaryPdfUrl">Document récapitulatif PDF (lien de téléchargement)</Label>
              <Input
                id="summaryPdfUrl"
                type="url"
                placeholder="https://exemple.com/mon-cours-recap.pdf"
                value={info.summaryPdfUrl}
                onChange={(e) => setField("summaryPdfUrl", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Les étudiants pourront télécharger ce PDF à la fin de la formation.
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Statut">
          <div className="flex flex-col gap-3">
            {course && (
              <Badge variant="outline" className="w-fit">
                Statut actuel : {course.status === "publie" ? "Publié" : course.status === "archive" ? "Archivé" : "Brouillon"}
              </Badge>
            )}
            <Button type="button" className="h-11" onClick={() => handleSubmit("publie")}>
              {isEdit ? "Enregistrer et publier" : "Créer et publier"}
            </Button>
            <Button type="button" variant="outline" className="h-11" onClick={() => handleSubmit("brouillon")}>
              Enregistrer en brouillon
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
