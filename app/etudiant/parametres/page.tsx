"use client";

import { Bell, Lock, Moon, Save, Shield, User } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function StudentSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Personnalisez votre expérience et sécurisez votre compte."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Sécurité">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="current">Mot de passe actuel</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new">Nouveau mot de passe</Label>
                  <Input id="new" type="password" />
                </div>
              </div>
              <Button variant="outline" onClick={() => toast.success("Mot de passe mis à jour.")}>
                <Lock className="size-4" />
                Mettre à jour le mot de passe
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Notifications">
            <div className="space-y-4">
              {[
                { label: "Nouvelles formations", desc: "Recevoir une alerte lorsqu'une nouvelle formation est publiée.", defaultChecked: true },
                { label: "Rappels d'apprentissage", desc: "Recevoir un rappel pour continuer vos formations.", defaultChecked: true },
                { label: "Promotions", desc: "Recevoir les offres spéciales et réductions.", defaultChecked: false },
                { label: "Messages des formateurs", desc: "Être alerté des nouvelles réponses aux questions.", defaultChecked: true },
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

        <div className="space-y-6">
          <DashboardCard title="Préférences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="size-4" />
                  <span className="text-sm font-medium">Mode sombre</span>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="size-4" />
                  <span className="text-sm font-medium">Authentification à deux facteurs</span>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Langue" className="flex items-center justify-between">
            <span className="text-sm font-medium">Français</span>
            <Button variant="outline" size="sm" disabled>Modifier</Button>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
