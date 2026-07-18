"use client";

import { Bell, Globe, Lock, Save, Shield } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Parametres"
        description="Configurez la plateforme et la securite."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Informations generales">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="siteName">Nom de la plateforme</Label>
              <Input id="siteName" defaultValue="Digital FormArt Academy" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input id="contactEmail" type="email" defaultValue="contact@digitalformart.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="currency">Devise par defaut</Label>
              <Input id="currency" defaultValue="FCFA" />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Securite">
          <div className="space-y-4">
            {[
              { label: "Authentification a deux facteurs", desc: "Obligatoire pour les administrateurs", defaultChecked: true },
              { label: "Connexion par email", desc: "Activer la connexion par lien magique", defaultChecked: false },
              { label: "Verification des comptes formateurs", desc: "Validation manuelle avant publication", defaultChecked: true },
              { label: "Journal dactivite", desc: "Enregistrer toutes les actions administrateur", defaultChecked: true },
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

        <DashboardCard title="Notifications">
          <div className="space-y-4">
            {[
              { label: "Alertes de paiement", desc: "Recevoir une alerte pour chaque paiement", defaultChecked: true },
              { label: "Nouvelles inscriptions", desc: "Notification lors dune nouvelle inscription", defaultChecked: true },
              { label: "Rapports hebdomadaires", desc: "Envoyer un resume chaque lundi", defaultChecked: true },
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
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => toast.success("Parametres enregistres.")}>
          <Save className="size-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
