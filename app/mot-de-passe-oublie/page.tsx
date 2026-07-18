"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, MailCheck, Send } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Adresse email invalide."),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSentTo(values.email);
  };

  return (
    <AuthShell
      title="Mot de passe oublié ?"
      subtitle="Saisissez votre adresse email pour recevoir un lien de réinitialisation."
      seed="auth-forgot"
    >
      {sentTo ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
            <MailCheck className="mt-0.5 size-5 shrink-0 text-success" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Email envoyé !</p>
              <p className="mt-1 text-muted-foreground">
                Un lien de réinitialisation a été envoyé à{" "}
                <span className="font-medium text-foreground">{sentTo}</span>. Vérifiez votre boîte
                de réception.
              </p>
            </div>
          </div>
          <Button render={<Link href="/reinitialiser-mot-de-passe" />} nativeButton={false}>
            Continuer vers la réinitialisation
          </Button>
          <Link
            href="/connexion"
            className="flex items-center justify-center gap-2 text-sm font-medium text-brand-secondary hover:underline"
          >
            <ArrowLeft className="size-4" /> Retour à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {isSubmitting ? "Envoi..." : "Envoyer le lien"}
          </Button>
          <Link
            href="/connexion"
            className="flex items-center justify-center gap-2 text-sm font-medium text-brand-secondary hover:underline"
          >
            <ArrowLeft className="size-4" /> Retour à la connexion
          </Link>
        </form>
      )}
    </AuthShell>
  );
}
