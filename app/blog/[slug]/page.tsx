import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { ArticleCard } from "@/components/shared/article-card";
import { Badge } from "@/components/ui/badge";
import { ARTICLES, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div>
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="border-brand-light/40 text-brand-secondary">
            {article.category}
          </Badge>
          <h1 className="max-w-3xl font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MediaPlaceholder seed={article.author} variant="avatar" className="size-8" />
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.publishedAt}</span>
            <span>·</span>
            <span>{article.readingTime} min de lecture</span>
          </div>
        </div>

        <div className="mx-auto aspect-[16/7] w-full max-w-4xl overflow-hidden rounded-2xl">
          <MediaPlaceholder seed={article.id} variant="illustration" className="h-full w-full" />
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-secondary-foreground/85">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mx-auto flex max-w-2xl flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </Container>

      <div className="border-t border-border bg-card py-14">
        <Container>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            À lire également
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
