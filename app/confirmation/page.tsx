"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, LayoutDashboard } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { useAuth, type DashboardRole } from "@/lib/auth-context";

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const { roleHome } = useAuth();
  const role = (searchParams.get("role") ?? "student") as DashboardRole;
  const home = roleHome(role);

  return (
    <AuthShell
      title="Compte confirmé avec succès"
      subtitle="Félicitations ! Votre compte est désormais actif et prêt à l'emploi."
      seed="auth-confirm"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-9" />
          </span>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              Bienvenue dans la communauté !
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Vous pouvez maintenant accéder à votre tableau de bord et commencer votre parcours.
            </p>
          </div>
        </div>

        <Button size="lg" className="h-12" render={<Link href={home} />} nativeButton={false}>
          <LayoutDashboard className="size-4" />
          Accéder à mon tableau de bord
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12"
          render={<Link href="/catalogue" />}
          nativeButton={false}
        >
          Explorer le catalogue
        </Button>
      </div>
    </AuthShell>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationInner />
    </Suspense>
  );
}
