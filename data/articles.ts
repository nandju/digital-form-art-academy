import type { Article } from "@/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ArticleSeed {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
}

const SEEDS: ArticleSeed[] = [
  { title: "10 compétences numériques indispensables en 2026", excerpt: "Découvrez les compétences les plus recherchées par les employeurs sur le marché numérique africain.", category: "Carrière", author: "Aïcha Koné", tags: ["Carrière", "Compétences"] },
  { title: "Comment se reconvertir dans la tech sans diplôme informatique", excerpt: "De nombreux professionnels réussissent leur transition vers la tech. Voici comment s'y prendre.", category: "Carrière", author: "Ibrahim Traoré", tags: ["Reconversion", "Tech"] },
  { title: "Le guide complet pour réussir son premier projet React", excerpt: "Toutes les étapes clés pour structurer et livrer votre premier projet React avec succès.", category: "Développement", author: "Hamed Toure", tags: ["React", "Développement"] },
  { title: "Pourquoi le Design System change la donne pour les équipes produit", excerpt: "Comprendre l'impact d'un design system bien pensé sur la vitesse et la cohérence produit.", category: "Design", author: "Fatou Ndiaye", tags: ["Design", "Design System"] },
  { title: "SEO en 2026 : les tendances à ne pas manquer", excerpt: "Les moteurs de recherche évoluent vite. Voici ce qui compte vraiment pour votre référencement.", category: "Marketing", author: "Aminata Bamba", tags: ["SEO", "Marketing"] },
  { title: "Intelligence Artificielle générative : opportunités pour les entreprises africaines", excerpt: "Comment les PME africaines peuvent tirer parti des IA génératives dès aujourd'hui.", category: "Intelligence Artificielle", author: "Chiamaka Okafor", tags: ["IA", "Entreprises"] },
  { title: "5 erreurs à éviter en cybersécurité pour les PME", excerpt: "Protégez efficacement votre entreprise en évitant ces erreurs courantes.", category: "Cybersécurité", author: "Kwame Mensah", tags: ["Cybersécurité", "PME"] },
  { title: "Comment structurer un business plan qui convainc les investisseurs", excerpt: "Les éléments essentiels d'un business plan solide pour lever des fonds en Afrique.", category: "Entrepreneuriat", author: "Didier Abessolo", tags: ["Entrepreneuriat", "Business Plan"] },
  { title: "Scrum vs Kanban : quelle méthodologie choisir pour votre équipe ?", excerpt: "Un comparatif clair pour choisir la méthodologie agile adaptée à votre contexte.", category: "Gestion de Projet", author: "Awa Cissé", tags: ["Agile", "Scrum"] },
  { title: "Le télétravail en Afrique : défis et opportunités", excerpt: "Comment les entreprises africaines s'adaptent au travail à distance et hybride.", category: "Carrière", author: "Grace Adeyemi", tags: ["Télétravail", "Organisation"] },
  { title: "Créer un portfolio de développeur qui impressionne les recruteurs", excerpt: "Les meilleures pratiques pour présenter vos projets et décrocher des entretiens.", category: "Carrière", author: "Paul Mbeki", tags: ["Portfolio", "Recrutement"] },
  { title: "Data Science : par où commencer en 2026 ?", excerpt: "Un parcours d'apprentissage clair pour se lancer dans la data science sans se perdre.", category: "Data", author: "Ibrahim Traoré", tags: ["Data Science", "Python"] },
];

export const ARTICLES: Article[] = SEEDS.map((seed, index) => ({
  id: `article-${String(index + 1).padStart(2, "0")}`,
  slug: slugify(seed.title),
  title: seed.title,
  excerpt: seed.excerpt,
  content: `${seed.excerpt}\n\nDans cet article, nous explorons en détail les meilleures pratiques et retours d'expérience pour ${seed.title.toLowerCase()}. Que vous soyez débutant ou professionnel confirmé, vous trouverez des conseils concrets et applicables immédiatement dans votre parcours en Afrique francophone.`,
  cover: `/assets/illustrations/article-${String((index % 8) + 1).padStart(2, "0")}.jpg`,
  category: seed.category,
  author: seed.author,
  authorAvatar: `/assets/avatars/instructor-${String((index % 12) + 1).padStart(2, "0")}.jpg`,
  publishedAt: `2026-0${1 + (index % 9)}-${String(1 + (index % 27)).padStart(2, "0")}`,
  readingTime: 4 + (index % 6),
  tags: seed.tags,
}));

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
