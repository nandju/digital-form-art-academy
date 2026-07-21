import type { TrainerPricingPlan } from "@/types";

/**
 * Trainer-only rate grid. Never surfaced on student-facing pages
 * (/tarifs is the student pricing page). Shown on /devenir-formateur
 * and inside the trainer dashboard (/formateur/tarifs).
 */
export const TRAINER_PRICING_PLANS: TrainerPricingPlan[] = [
  {
    id: "formateur-starter",
    name: "Starter Formateur",
    price: 0,
    period: "mois",
    description: "Idéal pour débuter et partager vos premières formations.",
    features: [
      "Création de profil formateur",
      "Jusqu'à 3 formations",
      "Gestion des étudiants",
      "Import de vidéos YouTube",
      "Documents PDF",
      "Quiz",
      "Tableau de bord",
      "Statistiques de base",
    ],
    cta: "Commencer gratuitement",
  },
  {
    id: "formateur-pro",
    name: "Formateur Professionnel",
    price: 25000,
    period: "mois",
    description: "Pour les organismes de formation qui veulent aller plus loin.",
    features: [
      "Tout Starter, plus :",
      "Formations illimitées",
      "Certificats personnalisés",
      "Statistiques avancées",
      "Gestion des revenus",
      "Gestion des promotions",
      "Support prioritaire",
    ],
    popular: true,
    cta: "Choisir Professionnel",
  },
  {
    id: "formateur-business",
    name: "Business Formateur",
    price: 75000,
    period: "mois",
    description: "Conçu pour les entreprises et cabinets de formation.",
    features: [
      "Tout Professionnel, plus :",
      "Plusieurs formateurs",
      "Gestion d'équipe",
      "Tableau de bord entreprise",
      "Image de marque personnalisée",
      "Rapports avancés",
      "Support prioritaire dédié",
    ],
    cta: "Contacter l'équipe commerciale",
  },
];
