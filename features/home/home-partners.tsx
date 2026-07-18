import { Container } from "@/components/shared/container";
import { PARTNERS } from "@/data/partners";

export function HomePartners() {
  return (
    <section className="py-14">
      <Container className="flex flex-col items-center gap-8">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Ils font confiance à Digital FormArt Academy
        </p>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex h-14 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-semibold text-muted-foreground/70 grayscale transition-all hover:grayscale-0 hover:text-brand-primary"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
