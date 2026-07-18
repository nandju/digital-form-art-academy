import type { Metadata } from "next";
import { Globe2, Heart, Rocket, Target } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { InstructorCard } from "@/components/shared/instructor-card";
import { INSTRUCTORS } from "@/data/instructors";
import { STUDENTS } from "@/data/students";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez la mission, les valeurs et l'équipe derrière Digital FormArt Academy.",
};

const values = [
  { icon: Target, title: "Excellence pédagogique", description: "Des contenus rigoureux, actualisés et directement applicables sur le marché du travail." },
  { icon: Globe2, title: "Ancrage africain", description: "Des formations pensées pour les réalités et opportunités du continent africain." },
  { icon: Heart, title: "Accessibilité", description: "Des prix justes et des paiements adaptés aux moyens locaux (Mobile Money, etc.)." },
  { icon: Rocket, title: "Impact concret", description: "Des parcours qui débouchent sur des compétences, des certificats et des opportunités réelles." },
];

export default function AboutPage() {
  return (
    <div>
      <div className="border-b border-border bg-brand-bg py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
              À propos de nous
            </span>
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Notre mission : révéler le potentiel numérique de l&apos;Afrique
            </h1>
            <p className="text-muted-foreground">
              Digital FormArt Academy est née d&apos;une conviction simple : l&apos;Afrique regorge de
              talents qui méritent un accès à une formation numérique de qualité mondiale, adaptée
              à leurs réalités locales. Depuis notre lancement, nous accompagnons des milliers
              d&apos;étudiants, de professionnels et d&apos;entreprises dans leur transformation
              numérique.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            <MediaPlaceholder seed="about-hero" variant="banner" className="h-full w-full" />
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <SectionHeading eyebrow="Nos valeurs" title="Ce qui nous guide chaque jour" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-primary text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-y border-border bg-card py-14">
        <Container className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-heading text-3xl font-bold text-brand-primary">{COURSES.length}+</p>
            <p className="text-sm text-muted-foreground">Formations</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-brand-primary">{STUDENTS.length}+</p>
            <p className="text-sm text-muted-foreground">Étudiants</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-brand-primary">{INSTRUCTORS.length}+</p>
            <p className="text-sm text-muted-foreground">Formateurs</p>
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <SectionHeading eyebrow="Notre équipe" title="Des experts passionnés à votre service" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {INSTRUCTORS.slice(0, 8).map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </Container>
    </div>
  );
}
