import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-decouverte",
    name: "Découverte",
    price: 0,
    period: "mois",
    description: "Idéal pour explorer la plateforme et tester les fonctionnalités de base.",
    features: [
      "Accès à 5 formations gratuites",
      "Certificats de participation",
      "Accès communauté",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
  },
  {
    id: "plan-premium",
    name: "Premium",
    price: 15000,
    period: "mois",
    description: "Le meilleur choix pour progresser rapidement sur tous les sujets numériques.",
    features: [
      "Accès illimité à toutes les formations",
      "Certificats officiels reconnus",
      "Téléchargement des ressources hors-ligne",
      "Support prioritaire 7j/7",
      "Accès aux nouveautés en avant-première",
    ],
    popular: true,
    cta: "Choisir Premium",
  },
  {
    id: "plan-carriere",
    name: "Carrière+",
    price: 25000,
    period: "mois",
    description: "Pour les professionnels souhaitant un accompagnement personnalisé.",
    features: [
      "Tous les avantages du plan Premium",
      "Sessions de mentorat individuel",
      "Revue de portfolio et CV",
      "Accès aux ateliers en direct",
      "Badge de profil vérifié",
    ],
    cta: "Choisir Carrière+",
  },
  {
    id: "plan-entreprise",
    name: "Entreprise",
    price: 0,
    period: "an",
    description: "Solution sur-mesure pour former vos équipes à grande échelle.",
    features: [
      "Tableau de bord de suivi des équipes",
      "Formations personnalisées",
      "Facturation centralisée",
      "Gestionnaire de compte dédié",
      "Rapports de progression détaillés",
    ],
    cta: "Contacter l'équipe commerciale",
  },
];
