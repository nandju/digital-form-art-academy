"use client";

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DashboardCard, PageHeader, StatCard } from "@/components/dashboard/dashboard-ui";
import { DonutChart, SimpleBarChart, TrendAreaChart } from "@/components/dashboard/charts";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { toast } from "sonner";
import { COURSES } from "@/data/courses";

const sampleData = [
  { month: "Jan", value: 12 },
  { month: "Fev", value: 19 },
  { month: "Mar", value: 15 },
  { month: "Avr", value: 25 },
];

const donutData = [
  { name: "Design", value: 35 },
  { name: "Dev", value: 40 },
  { name: "Marketing", value: 25 },
];

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader
          title="UI Playground"
          description="Apercu des composants disponibles dans le design system."
          actions={
            <Button onClick={() => toast.success("Action de test declenchee.")}>
              Test Toast
            </Button>
          }
        />

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Boutons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Defaut</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructif</Button>
            <Button variant="secondary">Secondaire</Button>
            <Button size="sm">Petit</Button>
            <Button size="lg">Grand</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Formulaires</h2>
          <div className="grid max-w-md gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pg-input">Input</Label>
              <Input id="pg-input" placeholder="Saisissez du texte..." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pg-textarea">Textarea</Label>
              <Textarea id="pg-textarea" rows={3} placeholder="Contenu multiligne..." />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="pg-switch" defaultChecked />
              <Label htmlFor="pg-switch">Interrupteur</Label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Badges & Cards</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Defaut</Badge>
            <Badge variant="secondary">Secondaire</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructif</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card basique</CardTitle>
                <CardDescription>Description de la carte.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Contenu de la carte avec espacement standard.</p>
                <Progress value={65} className="mt-4" />
              </CardContent>
              <CardFooter>
                <Button size="sm" render={<Link href="/catalogue" />} nativeButton={false}>Voir</Button>
              </CardFooter>
            </Card>
            <DashboardCard title="DashboardCard" action={<Badge>Action</Badge>}>
              <p className="text-sm text-muted-foreground">Carte de tableau de bord avec titre et action.</p>
            </DashboardCard>
            <StatCard label="Etudiants" value="6 320" icon={Users} trend={{ value: "+12%", positive: true }} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Accordeon & Avatar</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>Question frequente 1</AccordionTrigger>
                <AccordionContent>Reponse detaillee a la question posee par un utilisateur.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Question frequente 2</AccordionTrigger>
                <AccordionContent>Une autre reponse claire et concise pour illustrer le composant.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex gap-3">
              <Avatar className="size-12">
                <AvatarFallback className="bg-brand-primary text-white">AB</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback className="bg-brand-secondary text-white">CD</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback className="bg-premium text-white">EF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Graphiques</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DashboardCard title="Aire">
              <TrendAreaChart data={sampleData} dataKey="value" xKey="month" height={260} />
            </DashboardCard>
            <DashboardCard title="Barres">
              <SimpleBarChart data={sampleData} dataKey="value" xKey="month" height={260} />
            </DashboardCard>
            <DashboardCard title="Donut">
              <DonutChart data={donutData} height={260} />
            </DashboardCard>
            <DashboardCard title="Carte de cours">
              <div className="flex gap-4 rounded-xl border border-border p-3">
                <div className="size-16 rounded-lg bg-brand-bg" />
                <div>
                  <p className="font-medium text-foreground line-clamp-1">{COURSES[0].title}</p>
                  <p className="text-xs text-muted-foreground">{COURSES[0].categoryName}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{COURSES[0].price.toLocaleString("fr-FR")} FCFA</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </section>
      </div>
    </div>
  );
}
