import { Quote } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { RatingStars } from "@/components/shared/rating-stars";
import { TESTIMONIALS } from "@/data/testimonials";

export function HomeTestimonials() {
  return (
    <section className="bg-brand-primary py-16 sm:py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Témoignages"
          title="Ils ont transformé leur carrière avec nous"
          className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:bg-white/10 [&_span]:text-white"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <Quote className="size-6 text-brand-light" />
              <p className="text-sm leading-relaxed text-white/85">{testimonial.content}</p>
              <RatingStars rating={testimonial.rating} />
              <div className="mt-auto flex items-center gap-3 pt-2">
                <MediaPlaceholder seed={testimonial.id} variant="avatar" className="size-10" />
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/60">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
