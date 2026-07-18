import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArticleCard } from "@/components/shared/article-card";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités, conseils de carrière et tendances du numérique par les experts Digital FormArt Academy.",
};

export default function BlogPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Conseils, tendances et actualités numériques"
            description="Restez informé des dernières tendances et développez votre carrière grâce à nos experts."
          />
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </div>
  );
}
