"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Loader2, UserPlus } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";

const STUDY_LEVELS = [
  "Lycée / Secondaire",
  "BTS / DUT",
  "Licence",
  "Master",
  "Doctorat",
  "Formation professionnelle",
];

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Le nom complet est requis."),
    email: z.string().email("Adresse email invalide."),
    password: z.string().min(6, "6 caractères minimum."),
    confirmPassword: z.string(),
    program: z.string().min(2, "La filière d'étude est requise."),
    level: z.string().min(1, "Le niveau d'étude est requis."),
    address: z.string().min(2, "L'adresse est requise."),
    bio: z.string().optional(),
    acceptTerms: z.literal(true, {
      error: "Vous devez accepter les conditions d'utilisation.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function StudentRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { level: "", acceptTerms: undefined },
  });

  const level = watch("level");

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login("student", values.fullName, values.email);
    toast.success("Compte étudiant créé avec succès", {
      description: "Vérifiez votre boîte mail pour confirmer votre inscription.",
    });
    router.push("/verification?role=student");
  };

  return (
    <AuthShell
      title="Inscription étudiant"
      subtitle="Créez votre compte apprenant et commencez à développer vos compétences dès aujourd'hui."
      seed="auth-register-student"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-brand-bg text-muted-foreground">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="Photo de profil" className="h-full w-full object-cover" />
            ) : (
              <Camera className="size-6" />
            )}
          </div>
          <div>
            <Label htmlFor="photo" className="cursor-pointer text-sm font-medium text-brand-secondary">
              Ajouter une photo (optionnel)
            </Label>
            <Input id="photo" type="file" accept="image/*" onChange={onPhotoChange} className="mt-1 h-auto p-0 text-xs" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input id="fullName" placeholder="Votre nom complet" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" type="email" placeholder="vous@exemple.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirmer</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="program">Filière d&apos;étude</Label>
          <Input id="program" placeholder="Ex : Informatique, Gestion, Marketing..." {...register("program")} />
          {errors.program && <p className="text-xs text-destructive">{errors.program.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="level">Niveau d&apos;étude</Label>
          <Select value={level} onValueChange={(value) => setValue("level", value ?? "")}>
            <SelectTrigger id="level" className="w-full">
              <SelectValue placeholder="Choisir un niveau" />
            </SelectTrigger>
            <SelectContent>
              {STUDY_LEVELS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.level && <p className="text-xs text-destructive">{errors.level.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address">Adresse</Label>
          <Input id="address" placeholder="Ex : Cocody, Abidjan" {...register("address")} />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio (optionnel)</Label>
          <Textarea id="bio" rows={3} placeholder="Parlez-nous un peu de vous..." {...register("bio")} />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked === true ? true : (undefined as never))
            }
          />
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
        {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>}

        <Button type="submit" size="lg" className="h-12" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />}
          {isSubmitting ? "Création du compte..." : "Créer mon compte étudiant"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Vous êtes formateur ?{" "}
        <Link href="/inscription/formateur" className="font-medium text-brand-secondary hover:underline">
          Inscription formateur
        </Link>
      </p>
    </AuthShell>
  );
}
