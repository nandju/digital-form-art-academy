"use client";

import * as React from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import type { Quiz } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuizPlayerProps {
  quiz: Quiz;
  onPassed?: () => void;
  onCompleted?: (score: number) => void;
  onRetry?: () => void;
}

export function QuizPlayer({ quiz, onPassed, onCompleted, onRetry }: QuizPlayerProps) {
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const total = quiz.questions.length;
  const answered = Object.keys(answers).length;

  const handleSubmit = () => {
    if (answered < total) return;
    const correct = quiz.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctOptionIndex ? 1 : 0);
    }, 0);
    const score = Math.round((correct / total) * 100);
    setSubmitted(true);
    onCompleted?.(score);
    if (score >= quiz.passingScore) onPassed?.();
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    onRetry?.();
  };

  if (submitted) {
    const correct = quiz.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctOptionIndex ? 1 : 0);
    }, 0);
    const score = Math.round((correct / total) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 text-center">
        {passed ? (
          <CheckCircle2 className="mx-auto size-12 text-success" />
        ) : (
          <XCircle className="mx-auto size-12 text-destructive" />
        )}
        <div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {score}%
          </p>
          <p className="text-sm text-muted-foreground">
            {correct}/{total} bonnes réponses · Seuil : {quiz.passingScore}%
          </p>
        </div>
        <p className={cn("font-medium", passed ? "text-success" : "text-destructive")}>
          {passed ? "Bravo, vous avez validé ce module !" : "Vous n'avez pas atteint le score de réussite."}
        </p>
        {!passed && (
          <Button onClick={reset} variant="outline" className="mx-auto w-fit">
            <RotateCcw className="mr-2 size-4" />
            Réessayer le quiz
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{quiz.title}</span>
        <span className="text-muted-foreground">{answered}/{total} questions</span>
      </div>
      <Progress value={(answered / total) * 100} className="h-2" />

      {quiz.questions.map((question) => (
        <div key={question.id} className="rounded-xl border border-border p-4">
          <p className="mb-3 text-sm font-medium text-foreground">{question.question}</p>
          <div className="flex flex-col gap-2">
            {question.options.map((option, oIndex) => (
              <button
                key={oIndex}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: oIndex }))}
                className={cn(
                  "rounded-lg border px-4 py-2.5 text-left text-sm transition",
                  answers[question.id] === oIndex
                    ? "border-brand-secondary bg-brand-secondary/10 text-foreground"
                    : "border-border bg-card hover:bg-brand-bg"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleSubmit} disabled={answered < total} className="w-fit">
        Valider mes réponses
      </Button>
    </div>
  );
}
