import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BarChart3,
  BookOpen,
  Globe2,
  GraduationCap,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { TrainerPricingGrid } from "@/features/trainer/trainer-pricing-grid";
import { INSTRUCTORS } from "@/data/instructors";

export const metadata: Metadata = {
  title: "Devenir formateur",
  description:
    "Partagez votre savoir avec des milliers d'apprenants en Côte d'Ivoire et en Afrique francophone. Créez vos formations sur Digital FormArt Academy.",
};

const impactPoints = [
  {
    icon: Heart,
    title: "Partagez votre savoir",
    description: "Votre expérience et votre expertise méritent d'être transmises au plus grand nombre.",
  },
  {
    icon: Globe2,
    title: "Dépassez les murs d'une salle",
    description: "Une formation physique touche quelques dizaines de personnes. En ligne, vous pouvez en toucher des milliers.",
  },
  {
    icon: Users,
    title: "Un impact réel et durable",
    description: "Accompagnez des étudiants et professionnels partout en Côte d'Ivoire et en Afrique francophone.",
  },
  {
    icon: Award,
    title: "Une reconnaissance méritée",
    description: "Développez votre visibilité professionnelle et votre réputation d'expert.",
  },
];

const toolkitPoints = [
  { icon: BookOpen, title: "Créez vos formations", description: "Modules, leçons, vidéos, documents PDF, quiz : tout est configurable." },
  { icon: Users, title: "Suivez vos étudiants", description: "Progression, résultats de quiz, questions : gardez le contrôle sur l'expérience d'apprentissage." },
  { icon: Award, title: "Délivrez des certificats", description: "Importez votre propre modèle et validez chaque certificat avant envoi." },
  { icon: BarChart3, title: "Analysez vos résultats", description: "Statistiques détaillées sur vos revenus, vos ventes et l'engagement de vos apprenants." },
];

export default function BecomeTrainerPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg to-background">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-brand-light/20 blur-3xl" />
        <Container className="relative grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-light/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-secondary shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" />
              Devenir formateur
            </span>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Votre savoir mérite d&apos;être partagé{" "}
              <span className="text-brand-primary">largement</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Digital FormArt Academy fait disparaître les limites d&apos;une salle de classe. Un
              seul formateur peut désormais toucher des milliers d&apos;apprenants à travers la
              Côte d&apos;Ivoire et l&apos;Afrique francophone : créez vos formations, suivez vos
              étudiants, délivrez des certificats et développez votre visibilité professionnelle.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6 text-base" render={<Link href="/inscription/formateur" />} nativeButton={false}>
                Devenir formateur
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" render={<Link href="#tarifs" />} nativeButton={false}>
                Voir les offres formateur
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl">
              <MediaPlaceholder seed="devenir-formateur-hero" variant="banner" className="h-full w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{INSTRUCTORS.length}+ formateurs</p>
                <p className="text-xs text-muted-foreground">déjà engagés sur la plateforme</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading
          eyebrow="Pourquoi former sur Digital FormArt Academy"
          title="La transmission avant tout"
          description="Notre mission est de vous donner les moyens de partager votre expertise au plus grand nombre. Les revenus ne sont qu'un bénéfice secondaire d'un impact réel."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-bg text-brand-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-y border-border bg-brand-bg/40">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Votre boîte à outils"
            title="Tout ce qu'il faut pour enseigner sereinement"
            description="Un espace formateur complet, pensé pour créer, gérer et faire grandir vos formations."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {toolkitPoints.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-premium/10 text-premium">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16" id="tarifs">
        <SectionHeading
          eyebrow="Offres formateur"
          title="Choisissez la formule adaptée à votre ambition"
          description="Des offres pensées pour tous les profils : formateurs indépendants, organismes de formation et entreprises."
        />
        <div className="mt-10">
          <TrainerPricingGrid />
        </div>
      </Container>

      <div className="border-t border-border bg-brand-primary py-16 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-heading text-3xl font-bold">
            Prêt à transmettre votre savoir à des milliers d&apos;apprenants ?
          </h2>
          <p className="max-w-xl text-white/80">
            Rejoignez la communauté de formateurs Digital FormArt Academy dès aujourd&apos;hui.
          </p>
          <Button
            size="lg"
            className="h-12 bg-white px-6 text-brand-primary hover:bg-white/90"
            render={<Link href="/inscription/formateur" />}
            nativeButton={false}
          >
            Devenir formateur
          </Button>
        </Container>
      </div>
    </div>
  );
}
