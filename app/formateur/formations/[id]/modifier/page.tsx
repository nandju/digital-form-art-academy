"use client";

import { useParams, useRouter } from "next/navigation";

import { PageHeader } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { CourseBuilderForm } from "@/features/trainer/course-builder-form";
import { useTrainerCourses } from "@/lib/course-store";

const TRAINER_ID = "instructor-01";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { courses, ready, getCourse } = useTrainerCourses(TRAINER_ID);
  const course = getCourse(params.id);

  if (!ready) return null;

  if (!course) {
    return (
      <div>
        <PageHeader title="Formation introuvable" />
        <p className="text-sm text-muted-foreground">
          Cette formation n&apos;existe pas ou plus.
        </p>
        <Button className="mt-4" onClick={() => router.push("/formateur/formations")}>
          Retour à mes formations
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Modifier : ${course.title}`}
        description="Mettez à jour les informations, le programme et les quiz de votre formation."
      />
      <CourseBuilderForm instructorId={TRAINER_ID} course={course} key={course.id} />
      {courses.length === 0 && null}
    </div>
  );
}
