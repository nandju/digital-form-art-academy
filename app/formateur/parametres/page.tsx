"use client";

import { Bell, FileCheck2, Save } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function TrainerSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Gérez la certification, les notifications et la sécurité de votre compte."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Émission de certificats">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">Délivrer des certificats</p>
                <p className="text-sm text-muted-foreground">Activez cette option si vous souhaitez délivrer des certificats officiels.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ncc">Numéro de Compte Contribuable (NCC)</Label>
              <Input id="ncc" defaultValue="CI-20260718-Z" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="template" className="flex items-center gap-1.5">
                <FileCheck2 className="size-4 text-muted-foreground" />
                Modèle de certificat (vierge)
              </Label>
              <Input id="template" type="file" accept="application/pdf,image/*" className="h-auto p-0 text-xs" />
              <p className="text-xs text-muted-foreground">Format PDF ou image. Utilisé pour générer les certificats validés.</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Notifications">
          <div className="space-y-4">
            {[
              { label: "Nouvelle demande de certificat", desc: "Être notifié quand un étudiant termine une formation certifiante", defaultChecked: true },
              { label: "Nouvelles questions", desc: "Être notifié des questions posées par les étudiants", defaultChecked: true },
              { label: "Nouvelles ventes", desc: "Recevoir une alerte à chaque nouvelle inscription payante", defaultChecked: true },
              { label: "Résumé hebdomadaire", desc: "Recevoir un résumé de vos statistiques chaque lundi", defaultChecked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Sécurité">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input id="newPassword" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmNewPassword">Confirmer</Label>
                <Input id="confirmNewPassword" type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => toast.success("Paramètres enregistrés.")}>
          <Save className="size-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
