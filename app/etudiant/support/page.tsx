"use client";

import { HelpCircle, MessageSquare, Phone, Send } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const faqs = [
  { q: "Comment réinitialiser mon mot de passe ?", a: "Rendez-vous sur la page de connexion et cliquez sur 'Mot de passe oublié' pour recevoir un lien par email." },
  { q: "Puis-je télécharger mes certificats ?", a: "Oui, tous vos certificats sont disponibles dans la section 'Certificats' de votre espace étudiant." },
  { q: "Comment contacter mon formateur ?", a: "Utilisez le formulaire de support ou la messagerie dans la page de la formation concernée." },
  { q: "Les paiements sont-ils sécurisés ?", a: "Tous les paiements sont cryptés et traités via nos partenaires Mobile Money et banque certifiés." },
];

export default function StudentSupportPage() {
  return (
    <div>
      <PageHeader
        title="Support"
        description="Obtenez de l'aide et contactez notre équipe."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Envoyer un message">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message envoyé. Notre équipe vous répondra sous 24h.");
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" placeholder="Ex. Problème de connexion" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} placeholder="Décrivez votre problème en détail..." />
            </div>
            <Button type="submit">
              <Send className="size-4" />
              Envoyer
            </Button>
          </form>
        </DashboardCard>

        <div className="space-y-6">
          <DashboardCard title="FAQ rapide">
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </DashboardCard>

          <DashboardCard>
            <div className="flex items-start gap-4">
              <Phone className="size-5 shrink-0 text-brand-primary" />
              <div>
                <p className="font-medium text-foreground">Assistance téléphonique</p>
                <p className="text-sm text-muted-foreground">+225 27 20 00 00 00</p>
                <p className="text-xs text-muted-foreground">Lun - Ven, 08h - 17h</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
