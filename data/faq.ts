import type { FaqItem } from "@/types";

export const FAQ_ITEMS: FaqItem[] = [
  { id: "faq-01", category: "Général", question: "Qu'est-ce que Digital FormArt Academy ?", answer: "Digital FormArt Academy est une plateforme de formation en ligne panafricaine qui propose des cours dans le numérique, le design, le marketing, la data et bien d'autres domaines, dispensés par des experts francophones." },
  { id: "faq-02", category: "Général", question: "Les formations sont-elles disponibles en français ?", answer: "Oui, l'intégralité de nos formations, supports et certificats sont disponibles en français, avec certains contenus également proposés en anglais." },
  { id: "faq-03", category: "Inscription", question: "Comment m'inscrire à une formation ?", answer: "Créez un compte gratuit, choisissez la formation qui vous intéresse, puis procédez au paiement sécurisé pour accéder immédiatement au contenu." },
  { id: "faq-04", category: "Inscription", question: "Puis-je essayer une formation avant de payer ?", answer: "Oui, chaque formation propose un aperçu gratuit comprenant le programme complet et certaines leçons d'introduction." },
  { id: "faq-05", category: "Paiement", question: "Quels moyens de paiement sont acceptés ?", answer: "Nous acceptons Orange Money, MTN Mobile Money, Moov Money, Wave, ainsi que les cartes Visa et Mastercard via nos partenaires CinetPay et Flutterwave." },
  { id: "faq-06", category: "Paiement", question: "Les paiements sont-ils sécurisés ?", answer: "Oui, toutes les transactions sont chiffrées et traitées par des passerelles de paiement certifiées et reconnues en Afrique." },
  { id: "faq-07", category: "Paiement", question: "Puis-je obtenir un remboursement ?", answer: "Vous disposez de 7 jours après l'achat pour demander un remboursement si vous n'êtes pas satisfait, sous certaines conditions détaillées dans nos CGU." },
  { id: "faq-08", category: "Certification", question: "Les certificats sont-ils reconnus ?", answer: "Nos certificats attestent des compétences acquises et sont de plus en plus reconnus par les entreprises partenaires à travers l'Afrique francophone." },
  { id: "faq-09", category: "Certification", question: "Comment obtenir mon certificat ?", answer: "Le certificat est délivré automatiquement après avoir complété 100% des leçons et réussi le quiz final de la formation." },
  { id: "faq-10", category: "Certification", question: "Puis-je partager mon certificat sur LinkedIn ?", answer: "Oui, chaque certificat dispose d'un bouton de partage direct vers LinkedIn et d'autres réseaux sociaux." },
  { id: "faq-11", category: "Formateurs", question: "Qui sont les formateurs de la plateforme ?", answer: "Nos formateurs sont des experts en activité, sélectionnés pour leur expertise pratique et leur pédagogie, issus de toute l'Afrique francophone et anglophone." },
  { id: "faq-12", category: "Formateurs", question: "Comment devenir formateur sur Digital FormArt Academy ?", answer: "Rendez-vous sur la page 'Devenir formateur', soumettez votre candidature avec vos qualifications, notre équipe vous recontactera sous 5 jours ouvrés." },
  { id: "faq-13", category: "Entreprises", question: "Proposez-vous des offres pour les entreprises ?", answer: "Oui, nous proposons des abonnements groupés avec suivi des équipes, statistiques de progression et formations sur-mesure pour les entreprises." },
  { id: "faq-14", category: "Technique", question: "Puis-je suivre les formations sur mobile ?", answer: "Oui, la plateforme est entièrement responsive et fonctionne parfaitement sur ordinateur, tablette et smartphone." },
  { id: "faq-15", category: "Technique", question: "Ai-je un accès illimité aux formations achetées ?", answer: "Oui, une fois achetée, une formation reste accessible à vie, incluant toutes les mises à jour futures du contenu." },
  { id: "faq-16", category: "Technique", question: "Que faire si j'ai un problème technique ?", answer: "Notre équipe support est disponible via le centre d'aide, le chat en direct et par email pour résoudre rapidement tout problème technique." },
];

export function getFaqByCategory(category: string) {
  return FAQ_ITEMS.filter((item) => item.category === category);
}

export const FAQ_CATEGORIES = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));
