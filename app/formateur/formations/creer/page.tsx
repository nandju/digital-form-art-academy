"use client";

import { PageHeader } from "@/components/dashboard/dashboard-ui";
import { CourseBuilderForm } from "@/features/trainer/course-builder-form";

const TRAINER_ID = "instructor-01";

export default function CreateCoursePage() {
  return (
    <div>
      <PageHeader
        title="Créer une formation"
        description="Renseignez les informations, le programme et les quiz de votre nouvelle formation."
      />
      <CourseBuilderForm instructorId={TRAINER_ID} />
    </div>
  );
}
