"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";

import type { Quiz, QuizQuestion } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function emptyQuestion(): QuizQuestion {
  return { id: uid("question"), question: "", options: ["", ""], correctOptionIndex: 0 };
}

export function QuizBuilderDialog({
  trigger,
  quiz,
  onSave,
}: {
  trigger: React.ReactElement;
  quiz?: Quiz;
  onSave: (quiz: Quiz) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(quiz?.title ?? "");
  const [passingScore, setPassingScore] = React.useState(quiz?.passingScore ?? 70);
  const [questions, setQuestions] = React.useState<QuizQuestion[]>(
    quiz?.questions?.length ? quiz.questions : [emptyQuestion()]
  );

  React.useEffect(() => {
    if (open) {
      setTitle(quiz?.title ?? "");
      setPassingScore(quiz?.passingScore ?? 70);
      setQuestions(quiz?.questions?.length ? quiz.questions : [emptyQuestion()]);
    }
  }, [open, quiz]);

  const updateQuestion = (id: string, patch: Partial<QuizQuestion>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((o, i) => (i === index ? value : o)) }
          : q
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, options: [...q.options, ""] } : q))
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== index),
              correctOptionIndex: q.correctOptionIndex >= index ? Math.max(0, q.correctOptionIndex - 1) : q.correctOptionIndex,
            }
          : q
      )
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeQuestion = (id: string) =>
    setQuestions((prev) => (prev.length > 1 ? prev.filter((q) => q.id !== id) : prev));

  const handleSave = () => {
    onSave({
      id: quiz?.id ?? uid("quiz"),
      title: title.trim() || "Quiz",
      passingScore,
      questions: questions.map((q) => ({
        ...q,
        question: q.question.trim() || "Question sans titre",
        options: q.options.filter((o) => o.trim().length > 0).length >= 2 ? q.options : ["Option A", "Option B"],
      })),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurer le quiz</DialogTitle>
          <DialogDescription>
            Ajoutez des questions à choix multiples et définissez le score de réussite.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
            <div className="space-y-1.5">
              <Label htmlFor="quiz-title">Titre du quiz</Label>
              <Input id="quiz-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex : Quiz de validation" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quiz-passing">Score de réussite (%)</Label>
              <Input
                id="quiz-passing"
                type="number"
                min={0}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Label className="text-sm">Question {qIndex + 1}</Label>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => removeQuestion(question.id)}
                    disabled={questions.length === 1}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Input
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                  placeholder="Intitulé de la question"
                  className="mb-3"
                />
                <div className="flex flex-col gap-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuestion(question.id, { correctOptionIndex: oIndex })}
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                          question.correctOptionIndex === oIndex
                            ? "border-success bg-success text-white"
                            : "border-border text-transparent"
                        )}
                        title="Marquer comme bonne réponse"
                      >
                        ✓
                      </button>
                      <Input
                        value={option}
                        onChange={(e) => updateOption(question.id, oIndex, e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => removeOption(question.id, oIndex)}
                        disabled={question.options.length <= 2}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => addOption(question.id)}
                >
                  <Plus className="size-3.5" />
                  Ajouter une option
                </Button>
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={addQuestion}>
            <Plus className="size-4" />
            Ajouter une question
          </Button>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSave}>
            Enregistrer le quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
