import type { Certificate } from "@/types";
import { COURSES } from "@/data/courses";
import { STUDENTS } from "@/data/students";
import { INSTRUCTORS } from "@/data/instructors";

const GRADES = ["Mention Très Bien", "Mention Bien", "Mention Assez Bien", "Validé"];

export const CERTIFICATES: Certificate[] = COURSES.filter((_, i) => i % 1 === 0).map(
  (course, index) => {
    const student = STUDENTS[(index * 5) % STUDENTS.length];
    const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId) ?? INSTRUCTORS[0];

    return {
      id: `certificate-${String(index + 1).padStart(3, "0")}`,
      certificateNumber: `DFA-${2026}-${String(index + 1).padStart(5, "0")}`,
      courseTitle: course.title,
      studentName: student.fullName,
      instructorName: instructor.fullName,
      issueDate: `2026-0${1 + (index % 9)}-${String(1 + (index % 27)).padStart(2, "0")}`,
      qrCode: `/assets/illustrations/qr-placeholder.svg`,
      grade: GRADES[index % GRADES.length],
    };
  }
);

export function getCertificateById(id: string) {
  return CERTIFICATES.find((certificate) => certificate.id === id);
}
