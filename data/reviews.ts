import type { Review } from "@/types";
import { COURSES } from "@/data/courses";

const STUDENT_NAMES = [
  "Kadiatou Diallo", "Bassirou Sarr", "Marie-Claire Nguema", "Ousmane Bah",
  "Rokia Camara", "Emmanuel Tetteh", "Aissata Barry", "Kevin Yao",
  "Fatoumata Keita", "David Owusu", "Grace Mwangi", "Abdoulaye Sy",
  "Nafissatou Diop", "Junior Kouassi", "Bintou Coulibaly", "Samuel Adjei",
  "Zeinab Toure", "Christian Nzeza", "Aya Kone", "Moussa Sangare",
];

const COMMENT_TEMPLATES = [
  "Formation excellente, très bien structurée et facile à suivre. Je recommande vivement !",
  "Le formateur explique clairement les concepts, même les plus complexes. Très satisfait.",
  "Contenu riche et à jour. Les exercices pratiques m'ont vraiment aidé à progresser.",
  "Un excellent rapport qualité-prix. J'ai pu appliquer mes acquis directement au travail.",
  "Formation complète avec de bons exemples concrets adaptés à notre contexte africain.",
  "Le rythme est parfait pour un débutant. J'ai beaucoup appris en peu de temps.",
  "Très bonne pédagogie, quelques passages auraient pu être plus détaillés mais globalement top.",
  "Une des meilleures formations que j'ai suivies sur cette plateforme. Merci !",
  "Le formateur est très réactif aux questions. Support de grande qualité.",
  "J'ai obtenu mon certificat et j'ai déjà pu le valoriser auprès de mon employeur.",
];

function seededRating(seed: number) {
  const options = [5, 5, 5, 4, 4, 3];
  return options[seed % options.length];
}

export const REVIEWS: Review[] = [];

COURSES.forEach((course, courseIndex) => {
  const reviewCount = 3 + (courseIndex % 5); // 3 to 7 reviews per course
  for (let i = 0; i < reviewCount; i++) {
    const seed = courseIndex * 7 + i;
    REVIEWS.push({
      id: `review-${course.id}-${i}`,
      courseId: course.id,
      studentName: STUDENT_NAMES[seed % STUDENT_NAMES.length],
      studentAvatar: `/assets/avatars/student-${String((seed % 24) + 1).padStart(2, "0")}.jpg`,
      rating: seededRating(seed),
      comment: COMMENT_TEMPLATES[seed % COMMENT_TEMPLATES.length],
      date: `2026-0${1 + (seed % 6)}-${String(1 + (seed % 27)).padStart(2, "0")}`,
      helpful: seed % 40,
    });
  }
});

export function getReviewsByCourse(courseId: string) {
  return REVIEWS.filter((review) => review.courseId === courseId);
}
