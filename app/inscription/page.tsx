import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Users } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Rejoignez Digital FormArt Academy en tant qu'étudiant ou formateur.",
};

export default function RegisterChoicePage() {
  return (
    <AuthShell
      title="Créez votre compte gratuit"
      subtitle="Rejoignez des milliers d'apprenants et de formateurs en Côte d'Ivoire et en Afrique francophone."
      seed="auth-register"
    >
      <div className="flex flex-col gap-4">
        <Link
          href="/inscription/etudiant"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <GraduationCap className="size-6" />
          </span>
          <div className="flex-1">
            <p className="font-heading font-semibold text-foreground">Je suis étudiant(e)</p>
            <p className="text-sm text-muted-foreground">
              Accédez aux formations, obtenez des certificats et progressez à votre rythme.
            </p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-primary" />
        </Link>

        <Link
          href="/inscription/formateur"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-lg"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-premium/10 text-premium">
            <Users className="size-6" />
          </span>
          <div className="flex-1">
            <p className="font-heading font-semibold text-foreground">Je suis formateur(rice)</p>
            <p className="text-sm text-muted-foreground">
              Partagez votre expertise, créez vos formations et touchez des milliers d&apos;apprenants.
            </p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-primary" />
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="font-medium text-brand-secondary hover:underline">
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}
