import Link from "next/link";

import type { Article } from "@/types";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <MediaPlaceholder seed={article.id} variant="illustration" className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Badge variant="outline" className="w-fit border-brand-light/40 text-brand-secondary">
          {article.category}
        </Badge>
        <h3 className="line-clamp-2 font-heading text-base font-semibold text-foreground">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.readingTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}
