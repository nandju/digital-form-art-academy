import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { RatingStars } from "@/components/shared/rating-stars";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { REVIEWS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Découvrez les témoignages de nos étudiants et entreprises partenaires à travers l'Afrique francophone.",
};

export default function TestimonialsPage() {
  const extraReviews = REVIEWS.slice(0, 9);

  return (
    <div>
      <div className="border-b border-border bg-card py-14">
        <Container>
          <SectionHeading
            eyebrow="Témoignages"
            title="Ce que nos étudiants disent de nous"
            description={`Plus de ${REVIEWS.length} avis vérifiés partagés par notre communauté d'apprenants.`}
          />
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <Quote className="size-6 text-brand-light" />
              <p className="text-sm leading-relaxed text-secondary-foreground/80">{testimonial.content}</p>
              <RatingStars rating={testimonial.rating} />
              <div className="mt-auto flex items-center gap-3 pt-2">
                <MediaPlaceholder seed={testimonial.id} variant="avatar" className="size-10" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-heading text-xl font-semibold text-foreground">
          Avis récents sur nos formations
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {extraReviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3">
                <MediaPlaceholder seed={review.id} variant="avatar" className="size-8" />
                <p className="text-sm font-semibold text-foreground">{review.studentName}</p>
              </div>
              <RatingStars rating={review.rating} />
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
