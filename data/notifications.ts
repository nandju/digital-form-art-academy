import type { Notification } from "@/types";
import { COURSES } from "@/data/courses";

const TEMPLATES: Array<{ type: Notification["type"]; title: string; message: string }> = [
  { type: "success", title: "Leçon terminée", message: "Vous avez terminé une nouvelle leçon. Continuez sur cette lancée !" },
  { type: "info", title: "Nouvelle formation disponible", message: "Une formation correspondant à vos centres d'intérêt vient d'être publiée." },
  { type: "success", title: "Certificat délivré", message: "Félicitations, votre certificat est prêt à être téléchargé." },
  { type: "warning", title: "Paiement en attente", message: "Votre paiement est en cours de vérification. Cela peut prendre quelques minutes." },
  { type: "info", title: "Rappel de formation", message: "N'oubliez pas de continuer votre formation cette semaine." },
  { type: "success", title: "Quiz réussi", message: "Bravo, vous avez réussi le quiz avec succès !" },
  { type: "error", title: "Échec du paiement", message: "Votre paiement n'a pas pu être traité. Veuillez réessayer." },
  { type: "info", title: "Nouveau message du formateur", message: "Votre formateur a répondu à votre question dans le forum du cours." },
  { type: "info", title: "Promotion spéciale", message: "Profitez de -30% sur une sélection de formations cette semaine." },
  { type: "success", title: "Avis publié", message: "Merci d'avoir laissé un avis sur une formation suivie." },
];

export const NOTIFICATIONS: Notification[] = Array.from({ length: 120 }, (_, index) => {
  const template = TEMPLATES[index % TEMPLATES.length];
  const course = COURSES[index % COURSES.length];

  return {
    id: `notification-${String(index + 1).padStart(3, "0")}`,
    type: template.type,
    title: template.title,
    message: `${template.message} (${course.title})`,
    read: index % 3 !== 0,
    createdAt: `2026-0${1 + (index % 9)}-${String(1 + (index % 27)).padStart(2, "0")}T${String(
      8 + (index % 12)
    ).padStart(2, "0")}:${String((index * 7) % 60).padStart(2, "0")}:00`,
    link: `/etudiant/formations/${course.slug}`,
  };
});
