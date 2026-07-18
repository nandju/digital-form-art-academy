import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CourseCard } from "@/components/shared/course-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSES, getBestsellerCourses, getFeaturedCourses } from "@/data/courses";

export function HomeFeaturedCourses() {
  const featured = getFeaturedCourses().slice(0, 8);
  const bestsellers = getBestsellerCourses().slice(0, 8);
  const newest = [...COURSES].filter((c) => c.isNew).slice(0, 8);

  return (
    <section className="bg-brand-bg py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Formations populaires"
            title="Des formations pensées pour votre réussite"
            description="Sélectionnées et mises à jour régulièrement par nos experts pour rester alignées avec le marché."
          />
          <Button
            variant="outline"
            className="w-fit shrink-0 bg-background"
            render={<Link href="/catalogue" />}
            nativeButton={false}
          >
            Voir le catalogue complet
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <Tabs defaultValue="featured">
          <TabsList>
            <TabsTrigger value="featured">À la une</TabsTrigger>
            <TabsTrigger value="bestsellers">Best-sellers</TabsTrigger>
            <TabsTrigger value="new">Nouveautés</TabsTrigger>
          </TabsList>
          <TabsContent value="featured" className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </TabsContent>
          <TabsContent value="bestsellers" className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </TabsContent>
          <TabsContent value="new" className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {newest.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
