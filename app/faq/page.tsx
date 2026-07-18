import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Foire aux questions",
  description: "Trouvez les réponses aux questions les plus fréquentes sur Digital FormArt Academy.",
};

export default function FaqPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Aide"
            title="Foire aux questions"
            description="Vous ne trouvez pas de réponse à votre question ? Contactez notre équipe support."
          />
        </Container>
      </div>

      <Container className="flex flex-col gap-10 py-14">
        {FAQ_CATEGORIES.map((category) => (
          <div key={category}>
            <h2 className="font-heading text-xl font-semibold text-foreground">{category}</h2>
            <Accordion className="mt-4">
              {FAQ_ITEMS.filter((item) => item.category === category).map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="py-4 text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </Container>
    </div>
  );
}
