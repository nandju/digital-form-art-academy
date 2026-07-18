"use client";

import { Copy, Plus, Tag } from "lucide-react";

import { PageHeader, DashboardCard, StatCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const coupons = [
  { code: "BIENVENUE30", discount: "30%", usage: 128, max: 500, active: true },
  { code: "FORMATION15", discount: "15%", usage: 42, max: 200, active: true },
  { code: "ENTREPRISE50", discount: "50%", usage: 12, max: 50, active: true },
  { code: "VIP2026", discount: "20%", usage: 0, max: 100, active: false },
];

export default function AdminCouponsPage() {
  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Gerez les codes promotionnels et reductions."
        actions={
          <Button onClick={() => toast.success("Nouveau coupon cree.")}>
            <Plus className="size-4" />
            Creer
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Actifs" value={3} icon={Tag} />
        <StatCard label="Utilisations" value={182} icon={Tag} trend={{ value: "+14%", positive: true }} />
        <StatCard label="Economises" value="1.2M FCFA" icon={Tag} accent="text-success" />
      </div>

      <DashboardCard className="mt-6">
        <div className="mb-4">
          <Input placeholder="Rechercher un coupon..." className="max-w-sm" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((c) => (
            <div key={c.code} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="font-heading text-lg font-bold text-foreground">{c.code}</p>
                <Badge variant={c.active ? "default" : "secondary"}>{c.active ? "Actif" : "Inactif"}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Reduction {c.discount}</p>
              <p className="text-xs text-muted-foreground">{c.usage}/{c.max} utilisations</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Code ${c.code} copie.`)}>
                  <Copy className="size-4" />
                  Copier
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast.success(`Coupon ${c.code} modifie.`)}>
                  Editer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
