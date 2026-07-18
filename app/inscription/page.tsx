"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, Loader2, UserPlus, Users } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth, type DashboardRole } from "@/lib/auth-context";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Le nom complet est requis."),
    email: z.string().email("Adresse email invalide."),
    password: z.string().min(6, "6 caractères minimum."),
    confirmPassword: z.string(),
    role: z.enum(["student", "trainer"]),
    acceptTerms: z.literal(true, {
      error: "Vous devez accepter les conditions d'utilisation.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login, roleHome } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student", acceptTerms: undefined },
  });

  const role = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login(values.role as DashboardRole, values.fullName, values.email);
    toast.success("Compte créé avec succès", {
      description: "Vérifiez votre boîte mail pour confirmer votre inscription.",
    });
    router.push(`/verification?role=${values.role}`);
  };

  return (
    <AuthShell
      title="Créez votre compte gratuit"
      subtitle="Rejoignez des milliers d'apprenants et commencez à développer vos compétences dès aujourd'hui."
      seed="auth-register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Je m&apos;inscris en tant que</Label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: "student", label: "Étudiant", icon: GraduationCap },
                { value: "trainer", label: "Formateur", icon: Users },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("role", value)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors",
                  role === value
                    ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                    : "border-border text-muted-foreground hover:border-brand-light"
                )}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input id="fullName" placeholder="Votre nom complet" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" type="email" placeholder="vous@exemple.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirmer</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="acceptTerms" onCheckedChange={(checked) => setValue("acceptTerms", checked === true ? true : (undefined as never))} />
          <Label htmlFor="acceptTerms" className="text-sm font-normal leading-relaxed text-muted-foreground">
            J&apos;accepte les{" "}
            <Link href="/conditions-utilisation" className="text-brand-secondary hover:underline">
              conditions d&apos;utilisation
            </Link>{" "}
            et la{" "}
            <Link href="/confidentialite" className="text-brand-secondary hover:underline">
              politique de confidentialité
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <UserPlus className="size-4" />
          )}
          {isSubmitting ? "Création du compte..." : "Créer mon compte"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà inscrit ?{" "}
        <Link href="/connexion" className="font-medium text-brand-secondary hover:underline">
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}
