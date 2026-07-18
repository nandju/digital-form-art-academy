import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/features/contact/contact-form";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Digital FormArt Academy pour toute question ou demande de partenariat.",
};

const infos = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.supportEmail },
  { icon: Phone, label: "Téléphone", value: SITE_CONFIG.supportPhone },
  { icon: MapPin, label: "Adresse", value: SITE_CONFIG.address },
];

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Une question ? Parlons-en"
            description="Notre équipe vous répond sous 24 heures ouvrées."
          />
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          {infos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-bg text-brand-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
