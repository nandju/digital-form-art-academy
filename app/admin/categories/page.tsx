"use client";

import { FolderTree, Plus } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/data/categories";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organisez les domaines de formation."
        actions={
          <Button onClick={() => toast.success("Nouvelle categorie ajoutee.")}>
            <Plus className="size-4" />
            Ajouter
          </Button>
        }
      />

      <DashboardCard>
        <div className="mb-4">
          <Input placeholder="Rechercher une categorie..." className="max-w-sm" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: cat.color }}>
                  <FolderTree className="size-5 text-white" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.courseCount} formations</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.success(`Categorie ${cat.name} modifiee.`)}>
                Editer
              </Button>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
