"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, GraduationCap, Loader2, LogIn, Shield, Users } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, type DashboardRole } from "@/lib/auth-context";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  password: z.string().min(4, "Le mot de passe doit contenir au moins 4 caractères."),
  role: z.enum(["student", "trainer", "admin"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const roleOptions: { value: DashboardRole; label: string; icon: typeof GraduationCap }[] = [
  { value: "student", label: "Étudiant", icon: GraduationCap },
  { value: "trainer", label: "Formateur", icon: Users },
  { value: "admin", label: "Administrateur", icon: Shield },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, roleHome } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "student" },
  });

  const role = watch("role");

  const onSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const user = login(values.role, undefined, values.email);
    toast.success(`Bienvenue ${user.fullName.split(" ")[0]} !`, {
      description: "Connexion réussie.",
    });
    router.push(roleHome(values.role));
  };

  const handleDemoLogin = (demoRole: DashboardRole) => {
    const user = login(demoRole);
    toast.success(`Connecté en tant que ${user.fullName}`, {
      description: "Mode démonstration activé.",
    });
    router.push(roleHome(demoRole));
  };

  return (
    <AuthShell
      title="Connectez-vous à votre compte"
      subtitle="Accédez à vos formations, votre tableau de bord et bien plus."
    >
      <div className="flex flex-col gap-7">
        <div className="grid grid-cols-3 gap-3">
          {roleOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleDemoLogin(value)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Connexion rapide en mode démonstration, ou utilisez le formulaire ci-dessous.
        </p>

        <div className="relative flex items-center">
          <span className="h-px flex-1 bg-border" />
          <span className="px-3 text-xs text-muted-foreground">OU</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Se connecter en tant que</Label>
            <Select value={role} onValueChange={(value) => setValue("role", value as DashboardRole)}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Choisir un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Étudiant</SelectItem>
                <SelectItem value="trainer">Formateur</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Se souvenir de moi
              </Label>
            </div>
            <Link
              href="/mot-de-passe-oublie"
              className="text-sm font-medium text-brand-secondary hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-brand-secondary hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
