import type { Quiz } from "@/types";
import { CATEGORIES } from "./categories";
import { pickIllustration } from "@/lib/media";

export const VIDEO_EMBEDS = [
  "https://www.youtube.com/embed/M7lc1UVf-VE",
  "https://www.youtube.com/embed/PkZNo7MFNFg",
  "https://www.youtube.com/embed/ScMzIvxBSi4",
  "https://www.youtube.com/embed/jfKfP_yGSwA",
];

function pickFromList<T>(list: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return list[hash % list.length];
}

export function getVideoEmbed(seed: string): string {
  return pickFromList(VIDEO_EMBEDS, seed);
}

export function getDocumentImages(seed: string): string[] {
  const primary = pickIllustration(seed);
  const secondary = pickIllustration(seed + "-doc");
  return [primary, secondary === primary ? pickIllustration(seed + "-alt") : secondary];
}

export function getDocumentContent(moduleTitle: string, categoryName: string): string {
  return [
    `Ce document de synthèse accompagne le module "${moduleTitle}" dans la catégorie ${categoryName}.`,
    "",
    "Objectifs de cette leçon :",
    `• Maîtriser les concepts clés du module "${moduleTitle}"`,
    "• Découvrir des cas pratiques inspirés du marché africain et francophone",
    "• Identifier les erreurs courantes à éviter",
    "• Préparer les éléments nécessaires au quiz de validation",
    "",
    "Prenez le temps de lire les points essentiels et d'observer les exemples illustrés ci-dessous. Vous pouvez revenir sur cette page autant que nécessaire avant de passer à l'évaluation.",
  ].join("\n");
}

function otherCategories(categoryName: string): string[] {
  const others = CATEGORIES.filter((c) => c.name !== categoryName).map((c) => c.name);
  return others.slice(0, 3);
}

export function getModuleQuiz(seed: string, moduleTitle: string, categoryName: string): Quiz {
  const wrongTopics = ["Introduction générale", "Projets avancés", "Études de marché"];
  const wrongCategories = otherCategories(categoryName);

  const ensure = (list: string[], min: number, fallback: string) => {
    const copy = [...list];
    while (copy.length < min) copy.push(fallback);
    return copy.slice(0, min);
  };

  const categoriesForQ2 = [categoryName, ...ensure(wrongCategories, 3, "Autre domaine")];

  return {
    id: `quiz-${seed}`,
    title: `Quiz : ${moduleTitle}`,
    passingScore: 60,
    questions: [
      {
        id: "q1",
        question: `Quel est l'objet principal du module "${moduleTitle}" ?`,
        options: [moduleTitle, ...ensure(wrongTopics, 3, "Autre sujet")],
        correctOptionIndex: 0,
      },
      {
        id: "q2",
        question: "Cette formation appartient à quel domaine ?",
        options: categoriesForQ2,
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        question: "Comment valider ses acquis à la fin de ce module ?",
        options: [
          "Réussir le quiz de validation",
          "Envoyer un email au formateur",
          "Payer un supplément",
          "Attendre 24 heures",
        ],
        correctOptionIndex: 0,
      },
    ],
  };
}
