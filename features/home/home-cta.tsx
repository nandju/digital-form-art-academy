import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-brand-secondary to-premium px-8 py-14 text-center sm:px-16">
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
              Prêt à faire évoluer votre carrière dès aujourd&apos;hui ?
            </h2>
            <p className="max-w-xl text-white/80">
              Rejoignez des milliers d&apos;étudiants qui développent déjà leurs
              compétences numériques avec Digital FormArt Academy.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-white px-6 text-base text-brand-primary hover:bg-white/90"
                render={<Link href="/inscription" />}
                nativeButton={false}
              >
                Créer mon compte gratuit
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10"
                render={<Link href="/tarifs" />}
                nativeButton={false}
              >
                Voir les tarifs
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
