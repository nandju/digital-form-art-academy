"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Sparkles, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { STUDENTS } from "@/data/students";

const badges = [
  { icon: Users, label: `${STUDENTS.length}+ étudiants actifs` },
  { icon: Star, label: "4.7/5 note moyenne" },
  { icon: ShieldCheck, label: "Certificats reconnus" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg to-background">
      <div className="absolute -right-32 -top-32 size-96 rounded-full bg-brand-light/20 blur-3xl" />
      <div className="absolute -left-24 top-1/3 size-72 rounded-full bg-premium/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-light/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-secondary shadow-sm backdrop-blur">
            <Sparkles className="size-3.5" />
            La référence de la formation numérique en Afrique
          </span>

          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Développez vos compétences,{" "}
            <span className="text-brand-primary">révélez votre potentiel</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Plus de 40 formations en développement, design, marketing, data et
            entrepreneuriat, conçues par des experts africains pour vous faire
            progresser rapidement, où que vous soyez.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-6 text-base" render={<Link href="/catalogue" />} nativeButton={false}>
              Explorer les formations
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
              render={<Link href="/a-propos" />}
              nativeButton={false}
            >
              <PlayCircle className="size-4" />
              Découvrir la plateforme
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Icon className="size-4 text-brand-secondary" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl">
            <MediaPlaceholder seed="hero-banner" variant="banner" className="h-full w-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
            <div className="flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Certificat délivré</p>
              <p className="text-xs text-muted-foreground">Formation validée à 100%</p>
            </div>
          </div>
          <div className="absolute -right-4 -top-6 hidden items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:flex">
            <Star className="size-4 fill-warning text-warning" />
            <span className="text-sm font-semibold text-foreground">4.8/5</span>
            <span className="text-xs text-muted-foreground">(2 400 avis)</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
