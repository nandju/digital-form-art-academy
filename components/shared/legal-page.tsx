import { Container } from "@/components/shared/container";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export function LegalPage({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div>
      <div className="border-b border-border bg-card py-12">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dernière mise à jour : {updatedAt}
          </p>
        </Container>
      </div>
      <Container className="flex flex-col gap-8 py-12">
        <p className="max-w-3xl text-muted-foreground">{intro}</p>
        {sections.map((section) => (
          <div key={section.title} className="max-w-3xl">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
