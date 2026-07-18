"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { PriceTag } from "@/components/shared/price-tag";
import { COURSES } from "@/data/courses";
import { INSTRUCTORS } from "@/data/instructors";
import { toast } from "sonner";

const favorites = COURSES.slice(6, 11);

function getInstructorName(id: string) {
  return INSTRUCTORS.find((i) => i.id === id)?.fullName ?? "Formateur";
}

export default function StudentFavoritesPage() {
  return (
    <div>
      <PageHeader
        title="Mes favoris"
        description="Les formations que vous avez mises de côté."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((course) => (
          <DashboardCard key={course.id} className="flex flex-col">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder seed={course.id} variant="course" className="h-full w-full" />
              <Badge className="absolute left-3 top-3 bg-card text-foreground">{course.categoryName}</Badge>
            </div>
            <p className="line-clamp-1 font-heading text-base font-semibold text-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">{getInstructorName(course.instructorId)} • {course.rating} ★</p>
            <div className="mt-3 flex items-center gap-2">
              <PriceTag price={course.price} originalPrice={course.originalPrice} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" className="flex-1" render={<Link href={`/formations/${course.slug}`} />} nativeButton={false}>
                <ShoppingCart className="size-4" />
                Acheter
              </Button>
              <Button size="icon-sm" variant="outline" onClick={() => toast.success("Formation retirée des favoris.")}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
