import { ClipboardCheck, MonitorPlay, Search, Trophy } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    icon: Search,
    title: "Choisissez votre formation",
    description: "Parcourez notre catalogue et trouvez la formation adaptée à vos objectifs.",
  },
  {
    icon: ClipboardCheck,
    title: "Inscrivez-vous facilement",
    description: "Créez votre compte et payez en toute sécurité via Mobile Money ou carte bancaire.",
  },
  {
    icon: MonitorPlay,
    title: "Apprenez à votre rythme",
    description: "Suivez les vidéos, documents et quiz depuis n'importe quel appareil, à tout moment.",
  },
  {
    icon: Trophy,
    title: "Obtenez votre certificat",
    description: "Validez vos acquis et téléchargez un certificat reconnu à partager avec vos employeurs.",
  },
];

export function HomeHowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="Un parcours simple, du premier clic au certificat"
          description="Digital FormArt Academy vous accompagne à chaque étape de votre apprentissage."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="absolute right-5 top-5 font-heading text-3xl font-bold text-brand-gray">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand-primary text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
