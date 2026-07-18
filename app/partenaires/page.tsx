import type { Metadata } from "next";
import Link from "next/link";
import { Handshake } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Digital FormArt Academy collabore avec des entreprises et institutions de référence en Afrique.",
};

export default function PartnersPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Partenaires"
            title="Ils collaborent avec Digital FormArt Academy"
            description="Nous construisons des partenariats solides pour offrir des opportunités concrètes à nos étudiants."
          />
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card text-center"
            >
              <span className="text-sm font-semibold text-foreground">{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-10 text-center">
          <Handshake className="size-8 text-brand-primary" />
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Devenez partenaire
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Vous représentez une entreprise ou une institution souhaitant collaborer avec Digital
            FormArt Academy ? Contactez notre équipe partenariats.
          </p>
          <Button render={<Link href="/contact" />} nativeButton={false}>
            Nous contacter
          </Button>
        </div>
      </Container>
    </div>
  );
}
