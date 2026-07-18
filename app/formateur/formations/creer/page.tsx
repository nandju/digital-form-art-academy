"use client";

import { Save } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateCoursePage() {
  return (
    <div>
      <PageHeader
        title="Créer une formation"
        description="Renseignez les informations de votre nouvelle formation."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Formation créée avec succès (simulation).");
        }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <DashboardCard title="Informations générales">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Titre de la formation</Label>
                <Input id="title" placeholder="Ex. Maîtrise Photoshop de A à Z" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input id="subtitle" placeholder="Un accroche courte et claire" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={5} placeholder="Décrivez le contenu et les objectifs..." />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Prix et accessibilité">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input id="price" type="number" placeholder="25000" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="originalPrice">Prix barré (optionnel)</Label>
                <Input id="originalPrice" type="number" placeholder="50000" />
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard title="Options">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="category">Catégorie</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="dev">Développement</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="data">Data & IA</SelectItem>
                    <SelectItem value="bureautique">Bureautique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="level">Niveau</Label>
                <Select>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="language">Langue</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Choisir une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DashboardCard>

          <Button type="submit" className="w-full">
            <Save className="size-4" />
            Enregistrer le brouillon
          </Button>
        </div>
      </form>
    </div>
  );
}
