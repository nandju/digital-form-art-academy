import type { Metadata } from "next";

import { HomeHero } from "@/features/home/home-hero";
import { HomeStats } from "@/features/home/home-stats";
import { HomeCategories } from "@/features/home/home-categories";
import { HomeFeaturedCourses } from "@/features/home/home-featured-courses";
import { HomeHowItWorks } from "@/features/home/home-how-it-works";
import { HomeTestimonials } from "@/features/home/home-testimonials";
import { HomePartners } from "@/features/home/home-partners";
import { HomeCta } from "@/features/home/home-cta";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Digital FormArt Academy : la plateforme de référence pour développer vos compétences numériques en Afrique francophone. Formations, certificats et accompagnement premium.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeCategories />
      <HomeFeaturedCourses />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomePartners />
      <HomeCta />
    </>
  );
}
