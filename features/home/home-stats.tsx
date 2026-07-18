import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

import { Container } from "@/components/shared/container";
import { COURSES } from "@/data/courses";
import { INSTRUCTORS } from "@/data/instructors";
import { STUDENTS } from "@/data/students";
import { CERTIFICATES } from "@/data/certificates";

const stats = [
  { icon: BookOpen, value: `${COURSES.length}+`, label: "Formations disponibles" },
  { icon: Users, value: `${STUDENTS.length}+`, label: "Étudiants actifs" },
  { icon: GraduationCap, value: `${INSTRUCTORS.length}+`, label: "Formateurs experts" },
  { icon: Award, value: `${CERTIFICATES.length}+`, label: "Certificats délivrés" },
];

export function HomeStats() {
  return (
    <section className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand-bg text-brand-primary">
              <Icon className="size-5" />
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
