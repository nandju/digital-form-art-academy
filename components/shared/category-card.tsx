import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  Camera,
  Cloud,
  Code2,
  FileSpreadsheet,
  KanbanSquare,
  Landmark,
  Languages,
  Megaphone,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

import type { Category } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  PenTool,
  Megaphone,
  BrainCircuit,
  ShieldCheck,
  KanbanSquare,
  Rocket,
  Smartphone,
  FileSpreadsheet,
  Camera,
  Languages,
  Landmark,
  Users,
  Cloud,
  Sparkles,
};

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  const Icon = ICONS[category.icon] ?? BookOpen;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-light hover:shadow-lg",
        className
      )}
    >
      <div
        className="flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${category.color}15`, color: category.color }}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground">{category.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{category.courseCount} formations</p>
      </div>
    </Link>
  );
}
