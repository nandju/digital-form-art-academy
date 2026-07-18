"use client";

import { Camera, Globe, Mail, MapPin, Save, User } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { LinkedinIcon, XIcon } from "@/components/shared/social-icons";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function TrainerProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title="Mon profil formateur"
        description="Personnalisez votre identite publique."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Formations" value={12} icon={User} />
        <StatCard label="Etudiants" value={384} icon={User} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Revenus" value="2.4M" icon={Mail} />
      </div>

      <DashboardCard className="mt-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative shrink-0">
            <div className="size-28 overflow-hidden rounded-full">
              <MediaPlaceholder seed={user?.avatarSeed ?? "trainer"} variant="avatar" className="h-full w-full" />
            </div>
            <Button size="icon-sm" className="absolute bottom-1 right-1 rounded-full" onClick={() => toast.success("Photo mise a jour.")}>
              <Camera className="size-4" />
            </Button>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input id="fullName" defaultValue={user?.fullName} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" defaultValue="Senior UX Designer & Formateur" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Localisation</Label>
              <Input id="location" defaultValue="Abidjan, Cote d'Ivoire" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} defaultValue="Formateur passionne avec plus de 10 ans d'experience dans le design digital." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="linkedin" className="flex items-center gap-1.5"><LinkedinIcon className="size-4 text-muted-foreground" /> LinkedIn</Label>
              <Input id="linkedin" defaultValue="https://linkedin.com/in/sergeaka" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="twitter" className="flex items-center gap-1.5"><XIcon className="size-4 text-muted-foreground" /> X / Twitter</Label>
              <Input id="twitter" defaultValue="https://twitter.com/sergeaka" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="website" className="flex items-center gap-1.5"><Globe className="size-4 text-muted-foreground" /> Site web</Label>
              <Input id="website" defaultValue="https://sergeaka.ci" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => toast.success("Profil enregistre.")}>
            <Save className="size-4" />
            Enregistrer
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
}
