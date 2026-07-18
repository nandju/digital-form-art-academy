"use client";

import { Camera, Clock, Mail, MapPin, Phone, Save, User } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

function Field({ label, icon: Icon, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{Icon && <Icon className="mr-1.5 inline size-3.5 text-muted-foreground" />}{label}</Label>
      {children}
    </div>
  );
}

export default function StudentProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title="Mon profil"
        description="Gérez vos informations personnelles et votre progression."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Formations" value={9} icon={User} />
        <StatCard label="Heures" value="84h" icon={Clock} />
        <StatCard label="Certificats" value={4} icon={Camera} />
      </div>

      <DashboardCard className="mt-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative shrink-0">
            <div className="size-28 overflow-hidden rounded-full">
              <MediaPlaceholder seed={user?.avatarSeed ?? "student"} variant="avatar" className="h-full w-full" />
            </div>
            <Button size="icon-sm" className="absolute bottom-1 right-1 rounded-full" onClick={() => toast.success("Photo de profil mise à jour.")}>
              <Camera className="size-4" />
            </Button>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nom complet" icon={User}>
              <Input id="fullName" defaultValue={user?.fullName} />
            </Field>
            <Field label="Email" icon={Mail}>
              <Input id="email" type="email" defaultValue={user?.email} />
            </Field>
            <Field label="Téléphone" icon={Phone}>
              <Input id="phone" defaultValue="+225 07 08 09 10" />
            </Field>
            <Field label="Localisation" icon={MapPin}>
              <Input id="location" defaultValue="Abidjan, Côte d'Ivoire" />
            </Field>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} defaultValue="Passionnée par le design et la tech, je construis mes compétences pas à pas grâce à Digital FormArt Academy." />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => toast.success("Profil enregistré.")}>
            <Save className="size-4" />
            Enregistrer
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
}
