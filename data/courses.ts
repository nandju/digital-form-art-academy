import type { Course, CourseLevel, Module } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { INSTRUCTORS } from "@/data/instructors";
import { getDocumentContent, getDocumentImages, getModuleQuiz, getVideoEmbed } from "./seed-content";

interface CourseSeed {
  title: string;
  subtitle: string;
  categorySlug: string;
  level: CourseLevel;
  tags: string[];
}

const COURSE_SEEDS: CourseSeed[] = [
  // Développement Web
  { title: "React & Next.js : Créer des applications web modernes", subtitle: "Maîtrisez React 19 et Next.js pour construire des applications performantes", categorySlug: "developpement-web", level: "intermédiaire", tags: ["React", "Next.js", "JavaScript"] },
  { title: "HTML, CSS & JavaScript : Les fondamentaux du web", subtitle: "Le point de départ idéal pour devenir développeur web", categorySlug: "developpement-web", level: "débutant", tags: ["HTML", "CSS", "JavaScript"] },
  { title: "TypeScript pour développeurs JavaScript", subtitle: "Passez au typage statique et fiabilisez vos applications", categorySlug: "developpement-web", level: "intermédiaire", tags: ["TypeScript", "JavaScript"] },
  { title: "Node.js & Express : Créer des API robustes", subtitle: "Construisez des back-ends performants avec Node.js", categorySlug: "developpement-web", level: "intermédiaire", tags: ["Node.js", "Express", "API"] },
  { title: "Tailwind CSS : Design rapide et professionnel", subtitle: "Stylisez vos interfaces avec le framework CSS le plus populaire", categorySlug: "developpement-web", level: "débutant", tags: ["Tailwind CSS", "CSS"] },
  { title: "Formation complète Développeur Full-Stack", subtitle: "De zéro à développeur full-stack en une seule formation", categorySlug: "developpement-web", level: "avancé", tags: ["Full-Stack", "React", "Node.js"] },
  // Design UI/UX
  { title: "Figma : Concevoir des interfaces professionnelles", subtitle: "L'outil de référence pour le design d'interface", categorySlug: "design-ui-ux", level: "débutant", tags: ["Figma", "UI Design"] },
  { title: "UX Design : Recherche et conception centrée utilisateur", subtitle: "Comprenez et concevez pour vos utilisateurs", categorySlug: "design-ui-ux", level: "intermédiaire", tags: ["UX", "Recherche utilisateur"] },
  { title: "Design System : Créer une identité cohérente", subtitle: "Construisez un design system évolutif pour vos produits", categorySlug: "design-ui-ux", level: "avancé", tags: ["Design System", "Figma"] },
  { title: "Prototypage et Animation d'Interfaces", subtitle: "Donnez vie à vos maquettes avec des interactions fluides", categorySlug: "design-ui-ux", level: "intermédiaire", tags: ["Prototypage", "Animation"] },
  // Marketing Digital
  { title: "SEO : Référencement naturel de A à Z", subtitle: "Positionnez votre site en tête des résultats Google", categorySlug: "marketing-digital", level: "débutant", tags: ["SEO", "Google"] },
  { title: "Growth Hacking : Stratégies de croissance rapide", subtitle: "Techniques éprouvées pour accélérer votre croissance", categorySlug: "marketing-digital", level: "avancé", tags: ["Growth Hacking", "Analytics"] },
  { title: "Marketing sur les Réseaux Sociaux", subtitle: "Développez votre marque sur Facebook, Instagram et TikTok", categorySlug: "marketing-digital", level: "débutant", tags: ["Réseaux sociaux", "Community Management"] },
  { title: "Publicité en Ligne : Google Ads & Meta Ads", subtitle: "Créez des campagnes publicitaires rentables", categorySlug: "marketing-digital", level: "intermédiaire", tags: ["Google Ads", "Meta Ads"] },
  // Data & IA
  { title: "Python pour la Data Science", subtitle: "Apprenez Python et ses bibliothèques pour analyser des données", categorySlug: "data-intelligence-artificielle", level: "débutant", tags: ["Python", "Data Science"] },
  { title: "Machine Learning : De la théorie à la pratique", subtitle: "Construisez vos premiers modèles de Machine Learning", categorySlug: "data-intelligence-artificielle", level: "intermédiaire", tags: ["Machine Learning", "Python"] },
  { title: "Intelligence Artificielle Générative : Prompt Engineering", subtitle: "Exploitez le potentiel des IA génératives comme ChatGPT", categorySlug: "data-intelligence-artificielle", level: "débutant", tags: ["IA générative", "Prompt Engineering"] },
  { title: "Deep Learning avec TensorFlow", subtitle: "Concevez des réseaux de neurones profonds", categorySlug: "data-intelligence-artificielle", level: "avancé", tags: ["Deep Learning", "TensorFlow"] },
  // Cybersécurité
  { title: "Cybersécurité : Les fondamentaux", subtitle: "Protégez vos systèmes et vos données efficacement", categorySlug: "cybersecurite", level: "débutant", tags: ["Cybersécurité", "Sécurité réseau"] },
  { title: "Ethical Hacking : Tests d'intrusion", subtitle: "Apprenez à penser comme un hacker pour mieux vous défendre", categorySlug: "cybersecurite", level: "avancé", tags: ["Ethical Hacking", "Pentest"] },
  { title: "Sécurité des Applications Web (OWASP)", subtitle: "Sécurisez vos applications contre les failles courantes", categorySlug: "cybersecurite", level: "intermédiaire", tags: ["OWASP", "Sécurité web"] },
  // Gestion de projet
  { title: "Scrum & Agile : Piloter des projets efficacement", subtitle: "Maîtrisez les méthodologies agiles les plus utilisées", categorySlug: "gestion-de-projet", level: "débutant", tags: ["Scrum", "Agile"] },
  { title: "Certification PMP : Préparation complète", subtitle: "Préparez-vous à la certification en gestion de projet la plus reconnue", categorySlug: "gestion-de-projet", level: "avancé", tags: ["PMP", "Gestion de projet"] },
  { title: "Outils Collaboratifs pour Équipes Projet", subtitle: "Notion, Jira, Trello : organisez efficacement vos projets", categorySlug: "gestion-de-projet", level: "débutant", tags: ["Notion", "Jira"] },
  // Entrepreneuriat
  { title: "Créer son Entreprise en Afrique", subtitle: "De l'idée au lancement : le guide complet de l'entrepreneur", categorySlug: "entrepreneuriat", level: "débutant", tags: ["Entrepreneuriat", "Business Plan"] },
  { title: "Lever des Fonds pour sa Startup", subtitle: "Stratégies et techniques pour convaincre les investisseurs", categorySlug: "entrepreneuriat", level: "avancé", tags: ["Levée de fonds", "Startup"] },
  { title: "Business Model Canvas et Validation d'Idée", subtitle: "Structurez et validez votre projet entrepreneurial", categorySlug: "entrepreneuriat", level: "intermédiaire", tags: ["Business Model", "Innovation"] },
  // Développement mobile
  { title: "Flutter : Créer des Applications Mobiles Multiplateformes", subtitle: "Développez pour iOS et Android avec un seul code base", categorySlug: "developpement-mobile", level: "intermédiaire", tags: ["Flutter", "Dart"] },
  { title: "React Native : Applications Mobiles avec React", subtitle: "Réutilisez vos compétences React pour le mobile", categorySlug: "developpement-mobile", level: "intermédiaire", tags: ["React Native", "Mobile"] },
  { title: "Développement Android avec Kotlin", subtitle: "Créez des applications Android natives et performantes", categorySlug: "developpement-mobile", level: "débutant", tags: ["Kotlin", "Android"] },
  // Bureautique
  { title: "Excel : De Débutant à Expert", subtitle: "Maîtrisez le tableur le plus utilisé au monde", categorySlug: "bureautique", level: "débutant", tags: ["Excel", "Tableaux croisés"] },
  { title: "Power BI : Tableaux de Bord et Reporting", subtitle: "Visualisez et analysez vos données professionnelles", categorySlug: "bureautique", level: "intermédiaire", tags: ["Power BI", "Data Visualisation"] },
  { title: "Google Workspace pour Professionnels", subtitle: "Collaborez efficacement avec les outils Google", categorySlug: "bureautique", level: "débutant", tags: ["Google Workspace", "Productivité"] },
  // Photo & Vidéo
  { title: "Photographie Professionnelle : Les Fondamentaux", subtitle: "Maîtrisez votre appareil et composez de belles images", categorySlug: "photographie-video", level: "débutant", tags: ["Photographie", "Composition"] },
  { title: "Montage Vidéo avec Premiere Pro", subtitle: "Créez des vidéos professionnelles pour vos projets", categorySlug: "photographie-video", level: "intermédiaire", tags: ["Montage vidéo", "Premiere Pro"] },
  // Langues
  { title: "Anglais Professionnel pour le Monde des Affaires", subtitle: "Communiquez avec assurance en contexte professionnel", categorySlug: "langues", level: "intermédiaire", tags: ["Anglais", "Business English"] },
  { title: "Communication Interculturelle en Entreprise", subtitle: "Travaillez efficacement dans des équipes multiculturelles", categorySlug: "langues", level: "débutant", tags: ["Communication", "Interculturel"] },
  // Finance
  { title: "Comptabilité Générale pour Entrepreneurs", subtitle: "Comprenez et gérez la comptabilité de votre entreprise", categorySlug: "finance-comptabilite", level: "débutant", tags: ["Comptabilité", "Gestion financière"] },
  { title: "Analyse Financière et Prise de Décision", subtitle: "Analysez la santé financière d'une entreprise", categorySlug: "finance-comptabilite", level: "intermédiaire", tags: ["Analyse financière", "Finance"] },
  // RH
  { title: "Recrutement et Sélection des Talents", subtitle: "Attirez et sélectionnez les meilleurs profils", categorySlug: "ressources-humaines", level: "intermédiaire", tags: ["Recrutement", "RH"] },
  { title: "Droit du Travail : Les Essentiels pour les RH", subtitle: "Sécurisez vos pratiques RH avec les bases légales", categorySlug: "ressources-humaines", level: "débutant", tags: ["Droit du travail", "RH"] },
  // Cloud & DevOps
  { title: "AWS : Fondamentaux du Cloud Computing", subtitle: "Déployez et gérez vos infrastructures sur AWS", categorySlug: "cloud-devops", level: "intermédiaire", tags: ["AWS", "Cloud"] },
  { title: "Docker & Kubernetes : Conteneurisation Moderne", subtitle: "Déployez vos applications à grande échelle", categorySlug: "cloud-devops", level: "avancé", tags: ["Docker", "Kubernetes"] },
  // Développement personnel
  { title: "Leadership et Prise de Décision", subtitle: "Développez votre posture de leader au quotidien", categorySlug: "developpement-personnel", level: "intermédiaire", tags: ["Leadership", "Management"] },
  { title: "Prise de Parole en Public avec Confiance", subtitle: "Captivez votre audience et gagnez en assurance", categorySlug: "developpement-personnel", level: "débutant", tags: ["Prise de parole", "Confiance en soi"] },
];

const MODULE_TITLES = [
  "Introduction et mise en place",
  "Les fondamentaux essentiels",
  "Concepts intermédiaires",
  "Techniques avancées",
  "Projet pratique guidé",
  "Bonnes pratiques et optimisation",
  "Étude de cas réels",
  "Préparation à la certification",
];

const LESSON_TITLES = [
  "Présentation du module",
  "Démonstration pratique",
  "Exercice guidé",
  "Approfondissement du concept",
  "Étude de cas",
  "Quiz de validation",
  "Ressources complémentaires",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildModules(courseIndex: number, categoryName: string): Module[] {
  const moduleCount = 4; // 4 modules per course for a clear demo
  const modules: Module[] = [];

  for (let m = 0; m < moduleCount; m++) {
    const moduleTitle = MODULE_TITLES[m % MODULE_TITLES.length];
    const seed = `course-${courseIndex}-module-${m}`;
    const moduleDuration = 12 + 8 + 5;

    modules.push({
      id: `c${courseIndex}-m${m}`,
      title: moduleTitle,
      description: `Module ${m + 1} : "${moduleTitle}" vous guide pas à pas avec une vidéo pédagogique, un document illustré et un quiz de validation.`,
      duration: moduleDuration,
      lessons: [
        {
          id: `c${courseIndex}-m${m}-video`,
          title: "Vidéo de cours",
          type: "video",
          duration: 12,
          videoUrl: getVideoEmbed(seed),
          content: `Regardez attentivement la vidéo du module "${moduleTitle}". Elle présente les notions essentielles sur lesquelles porte le quiz de validation.`,
        },
        {
          id: `c${courseIndex}-m${m}-doc`,
          title: "Document de synthèse",
          type: "document",
          duration: 8,
          content: getDocumentContent(moduleTitle, categoryName),
          images: getDocumentImages(seed),
        },
        {
          id: `c${courseIndex}-m${m}-quiz`,
          title: "Quiz de validation",
          type: "quiz",
          duration: 5,
          quiz: getModuleQuiz(seed, moduleTitle, categoryName),
        },
      ],
    });
  }

  return modules;
}

export const COURSES: Course[] = COURSE_SEEDS.map((seed, index) => {
  const category = CATEGORIES.find((c) => c.slug === seed.categorySlug) ?? CATEGORIES[0];
  const instructor = INSTRUCTORS[index % INSTRUCTORS.length];
  const modules = buildModules(index, category.name);
  const lessonsCount = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const duration = modules.reduce((sum, mod) => sum + mod.duration, 0);
  const rating = Number((4.3 + ((index * 11) % 7) / 10).toFixed(1));
  const reviewsCount = 20 + ((index * 37) % 480);
  const studentsCount = 150 + ((index * 211) % 4200);
  const basePrice = 15000 + (index % 6) * 5000;
  const hasDiscount = index % 3 === 0;

  return {
    id: `course-${String(index + 1).padStart(3, "0")}`,
    slug: slugify(seed.title),
    title: seed.title,
    subtitle: seed.subtitle,
    description: `${seed.subtitle}. Cette formation complète vous guide pas à pas, avec des exercices pratiques, des projets concrets et un accompagnement par ${instructor.fullName}, expert reconnu dans le domaine. Adaptée aux réalités du marché africain, elle vous permettra d'acquérir des compétences directement applicables en entreprise ou en freelance.`,
    thumbnail: `/assets/courses/course-${String((index % 20) + 1).padStart(2, "0")}.jpg`,
    banner: `/assets/banners/course-${String((index % 10) + 1).padStart(2, "0")}.jpg`,
    categoryId: category.id,
    categoryName: category.name,
    instructorId: instructor.id,
    level: seed.level,
    language: "Français",
    price: basePrice,
    originalPrice: hasDiscount ? Math.round(basePrice * 1.4) : undefined,
    currency: "FCFA",
    rating,
    reviewsCount,
    studentsCount,
    duration,
    lessonsCount,
    modules,
    tags: seed.tags,
    learningOutcomes: [
      `Comprendre les concepts fondamentaux de ${seed.tags[0]}`,
      "Réaliser un projet pratique de bout en bout",
      "Appliquer les bonnes pratiques professionnelles du secteur",
      "Obtenir un certificat reconnu à l'issue de la formation",
    ],
    requirements: [
      "Un ordinateur avec connexion internet",
      "Aucune expérience préalable requise" +
        (seed.level !== "débutant" ? ", des bases seront un plus" : ""),
      "Motivation et envie d'apprendre",
    ],
    featured: index % 5 === 0,
    bestseller: index % 7 === 0,
    isNew: index % 9 === 0,
    updatedAt: "2026-06-15",
    createdAt: "2025-01-10",
    certificateIncluded: index % 3 !== 0,
    status: "publie",
  };
});

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categorySlug: string) {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return COURSES.filter((course) => course.categoryId === category.id);
}

export function getCoursesByCategoryId(categoryId: string) {
  return COURSES.filter((course) => course.categoryId === categoryId);
}

export function getCoursesByInstructor(instructorId: string) {
  return COURSES.filter((course) => course.instructorId === instructorId);
}

export function getFeaturedCourses() {
  return COURSES.filter((course) => course.featured);
}

export function getBestsellerCourses() {
  return COURSES.filter((course) => course.bestseller);
}
