"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, ImagePlus, Loader2, UserPlus } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Le nom complet est requis."),
    email: z.string().email("Adresse email invalide."),
    password: z.string().min(6, "6 caractères minimum."),
    confirmPassword: z.string(),
    title: z.string().min(2, "La spécialité / le poste est requis."),
    company: z.string().optional(),
    location: z.string().min(2, "La localisation est requise."),
    bio: z.string().min(10, "Décrivez votre parcours en quelques mots."),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
    issuesCertificate: z.enum(["yes", "no"]),
    taxpayerNumber: z.string().optional(),
    acceptTerms: z.literal(true, {
      error: "Vous devez accepter les conditions d'utilisation.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => data.issuesCertificate === "no" || (data.taxpayerNumber?.trim().length ?? 0) > 0,
    {
      message: "Le numéro de compte contribuable (NCC) est requis pour délivrer des certificats.",
      path: ["taxpayerNumber"],
    }
  );

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function TrainerRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { issuesCertificate: "no", acceptTerms: undefined },
  });

  const issuesCertificate = watch("issuesCertificate");

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const onCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login("trainer", values.fullName, values.email);
    toast.success("Compte formateur créé avec succès", {
      description:
        values.issuesCertificate === "yes"
          ? "Votre demande d'émission de certificats sera vérifiée par notre équipe."
          : "Vérifiez votre boîte mail pour confirmer votre inscription.",
    });
    router.push("/verification?role=trainer");
  };

  return (
    <AuthShell
      title="Devenez formateur"
      subtitle="Partagez votre savoir, créez vos formations et touchez des milliers d'apprenants à travers la Côte d'Ivoire et l'Afrique francophone."
      seed="auth-register-trainer"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative">
          <div className="relative h-24 w-full overflow-hidden rounded-xl border border-border bg-brand-bg">
            {coverPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPreview} alt="Photo de couverture" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <ImagePlus className="size-6" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 left-4 flex size-16 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-card text-muted-foreground">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="Photo de profil" className="h-full w-full object-cover" />
            ) : (
              <Camera className="size-6" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="photo" className="cursor-pointer text-xs font-medium text-brand-secondary">
              Photo de profil
            </Label>
            <Input id="photo" type="file" accept="image/*" onChange={onPhotoChange} className="h-auto p-0 text-xs" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="cover" className="cursor-pointer text-xs font-medium text-brand-secondary">
              Photo de couverture (optionnel)
            </Label>
            <Input id="cover" type="file" accept="image/*" onChange={onCoverChange} className="h-auto p-0 text-xs" />
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Titre / Spécialité</Label>
            <Input id="title" placeholder="Ex : Expert Marketing Digital" {...register("title")} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Entreprise (optionnel)</Label>
            <Input id="company" placeholder="Nom de votre entreprise" {...register("company")} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Localisation</Label>
          <Input id="location" placeholder="Ex : Abidjan, Côte d'Ivoire" {...register("location")} />
          {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Biographie</Label>
          <Textarea id="bio" rows={3} placeholder="Présentez votre parcours et votre expertise..." {...register("bio")} />
          {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" placeholder="URL" {...register("linkedin")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="twitter">X / Twitter</Label>
            <Input id="twitter" placeholder="URL" {...register("twitter")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="website">Site web</Label>
            <Input id="website" placeholder="URL" {...register("website")} />
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-brand-bg/50 p-4">
          <Label>Délivrez-vous un certificat à vos étudiants ?</Label>
          <div className="grid grid-cols-2 gap-3">
            {([
              { value: "yes", label: "Oui" },
              { value: "no", label: "Non" },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("issuesCertificate", value)}
                className={cn(
                  "rounded-lg border p-2.5 text-sm font-medium transition-colors",
                  issuesCertificate === value
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-border text-muted-foreground hover:border-brand-light"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {issuesCertificate === "yes" && (
            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="taxpayerNumber">
                Numéro de Compte Contribuable (NCC) de l&apos;entreprise
              </Label>
              <Input
                id="taxpayerNumber"
                placeholder="Ex : CI-XXXXXXXX-Z"
                {...register("taxpayerNumber")}
              />
              <p className="text-xs text-muted-foreground">
                Requis pour activer l&apos;émission de certificats officiels.
              </p>
              {errors.taxpayerNumber && (
                <p className="text-xs text-destructive">{errors.taxpayerNumber.message}</p>
              )}
            </div>
          )}
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
          {isSubmitting ? "Création du compte..." : "Créer mon compte formateur"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Vous êtes étudiant ?{" "}
        <Link href="/inscription/etudiant" className="font-medium text-brand-secondary hover:underline">
          Inscription étudiant
        </Link>
      </p>
    </AuthShell>
  );
}
