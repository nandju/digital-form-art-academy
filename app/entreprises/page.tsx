import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Building2, ShieldCheck, Users2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { COMPANY_LOGOS } from "@/data/partners";

export const metadata: Metadata = {
  title: "Solutions Entreprises",
  description: "Formez vos équipes à grande échelle avec les solutions entreprises de Digital FormArt Academy.",
};

const benefits = [
  { icon: Users2, title: "Gestion centralisée des équipes", description: "Suivez la progression de tous vos collaborateurs depuis un tableau de bord unique." },
  { icon: BarChart3, title: "Rapports détaillés", description: "Obtenez des statistiques précises sur l'engagement et les compétences acquises." },
  { icon: ShieldCheck, title: "Certificats reconnus", description: "Valorisez les compétences de vos équipes avec des certificats officiels." },
  { icon: Building2, title: "Formations sur-mesure", description: "Bénéficiez de parcours adaptés aux besoins spécifiques de votre secteur." },
];

export default function CompaniesPage() {
  return (
    <div>
      <div className="border-b border-border bg-brand-primary py-16 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow="Entreprises"
            title="Formez vos équipes à grande échelle"
            description="Une solution complète pour développer les compétences numériques de vos collaborateurs, partout en Afrique."
            className="[&_h2]:text-white [&_p]:text-white/75 [&_span]:bg-white/10 [&_span]:text-white"
          />
          <Button
            size="lg"
            className="h-12 bg-white px-6 text-brand-primary hover:bg-white/90"
            render={<Link href="/contact" />}
            nativeButton={false}
          >
            Demander une démonstration
          </Button>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-bg text-brand-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Elles nous font confiance
          </p>
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {COMPANY_LOGOS.map((company) => (
              <div
                key={company.id}
                className="flex h-16 items-center justify-center rounded-xl border border-border bg-card px-3 text-center text-xs font-semibold text-muted-foreground/70"
              >
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
