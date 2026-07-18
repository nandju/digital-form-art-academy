import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { InstructorCard } from "@/components/shared/instructor-card";
import { INSTRUCTORS } from "@/data/instructors";

export const metadata: Metadata = {
  title: "Nos formateurs",
  description:
    "Découvrez les experts qui animent les formations Digital FormArt Academy : développeurs, designers, data scientists et entrepreneurs.",
};

export default function TrainersPage() {
  return (
    <div>
      <div className="border-b border-border bg-card py-10">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Nos formateurs experts
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {INSTRUCTORS.length} experts passionnés, sélectionnés pour leur expertise pratique et
            leur pédagogie, prêts à vous accompagner vers la réussite.
          </p>
        </Container>
      </div>
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {INSTRUCTORS.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </Container>
    </div>
  );
}
