import type { CourseLanguage, Instructor } from "@/types";

interface InstructorSeed {
  firstName: string;
  lastName: string;
  title: string;
  expertise: string[];
  location: string;
  bioFocus: string;
}

const SEEDS: InstructorSeed[] = [
  { firstName: "Aïcha", lastName: "Koné", title: "Développeuse Full-Stack Senior", expertise: ["React", "Next.js", "Node.js"], location: "Abidjan, Côte d'Ivoire", bioFocus: "le développement web moderne" },
  { firstName: "Moussa", lastName: "Diarra", title: "Architecte Cloud & DevOps", expertise: ["AWS", "Docker", "Kubernetes"], location: "Dakar, Sénégal", bioFocus: "les infrastructures cloud à grande échelle" },
  { firstName: "Fatou", lastName: "Ndiaye", title: "Lead Designer UI/UX", expertise: ["Figma", "Design System", "Prototypage"], location: "Dakar, Sénégal", bioFocus: "la conception d'expériences utilisateur mémorables" },
  { firstName: "Ibrahim", lastName: "Traoré", title: "Data Scientist", expertise: ["Python", "Machine Learning", "TensorFlow"], location: "Bamako, Mali", bioFocus: "la science des données et l'intelligence artificielle" },
  { firstName: "Aminata", lastName: "Bamba", title: "Experte Marketing Digital", expertise: ["SEO", "Growth Hacking", "Réseaux sociaux"], location: "Abidjan, Côte d'Ivoire", bioFocus: "les stratégies d'acquisition digitale" },
  { firstName: "Kwame", lastName: "Mensah", title: "Ingénieur Cybersécurité", expertise: ["Ethical Hacking", "Pentest", "ISO 27001"], location: "Accra, Ghana", bioFocus: "la sécurité des systèmes d'information" },
  { firstName: "Awa", lastName: "Cissé", title: "Consultante en Gestion de Projet", expertise: ["Scrum", "Agile", "PMP"], location: "Abidjan, Côte d'Ivoire", bioFocus: "le pilotage de projets complexes" },
  { firstName: "Yao", lastName: "N'Guessan", title: "Développeur Mobile Senior", expertise: ["Flutter", "React Native", "Kotlin"], location: "Abidjan, Côte d'Ivoire", bioFocus: "le développement d'applications mobiles" },
  { firstName: "Adjoa", lastName: "Boateng", title: "Formatrice Bureautique", expertise: ["Excel", "Power BI", "Google Sheets"], location: "Accra, Ghana", bioFocus: "la maîtrise des outils bureautiques" },
  { firstName: "Souleymane", lastName: "Bah", title: "Directeur Artistique & Photographe", expertise: ["Photographie", "Lightroom", "Storytelling"], location: "Conakry, Guinée", bioFocus: "la création visuelle et l'image de marque" },
  { firstName: "Nadia", lastName: "El Amrani", title: "Coach en Communication", expertise: ["Anglais professionnel", "Prise de parole", "Leadership"], location: "Casablanca, Maroc", bioFocus: "la communication interculturelle" },
  { firstName: "Jean-Marc", lastName: "Kouassi", title: "Expert Finance & Comptabilité", expertise: ["Comptabilité", "Analyse financière", "Fiscalité"], location: "Abidjan, Côte d'Ivoire", bioFocus: "la gestion financière des entreprises" },
  { firstName: "Ramata", lastName: "Sow", title: "Responsable Ressources Humaines", expertise: ["Recrutement", "SIRH", "Droit du travail"], location: "Dakar, Sénégal", bioFocus: "la gestion des talents et des organisations" },
  { firstName: "Didier", lastName: "Abessolo", title: "Coach en Entrepreneuriat", expertise: ["Business Plan", "Levée de fonds", "Startup"], location: "Libreville, Gabon", bioFocus: "l'accompagnement des entrepreneurs africains" },
  { firstName: "Chiamaka", lastName: "Okafor", title: "Ingénieure Machine Learning", expertise: ["Deep Learning", "NLP", "Python"], location: "Lagos, Nigéria", bioFocus: "l'intelligence artificielle appliquée" },
  { firstName: "Paul", lastName: "Mbeki", title: "Développeur Back-End Senior", expertise: ["Node.js", "PostgreSQL", "Microservices"], location: "Abidjan, Côte d'Ivoire", bioFocus: "les architectures back-end robustes" },
  { firstName: "Salimata", lastName: "Ouédraogo", title: "Spécialiste UX Research", expertise: ["Recherche utilisateur", "Tests A/B", "Analytics"], location: "Ouagadougou, Burkina Faso", bioFocus: "la recherche centrée utilisateur" },
  { firstName: "Eric", lastName: "Assogba", title: "Formateur Développement Personnel", expertise: ["Leadership", "Gestion du temps", "Confiance en soi"], location: "Cotonou, Bénin", bioFocus: "l'épanouissement professionnel et personnel" },
  { firstName: "Grace", lastName: "Adeyemi", title: "Chef de Projet Digital", expertise: ["Agile", "Product Management", "Jira"], location: "Lagos, Nigéria", bioFocus: "la coordination de projets numériques" },
  { firstName: "Mamadou", lastName: "Fall", title: "Expert Réseaux & Systèmes", expertise: ["Cybersécurité", "Administration réseau", "Cloud"], location: "Dakar, Sénégal", bioFocus: "l'administration des infrastructures IT" },
  { firstName: "Léa", lastName: "Guei", title: "Motion Designer", expertise: ["After Effects", "Vidéo", "Animation 2D"], location: "Abidjan, Côte d'Ivoire", bioFocus: "la création audiovisuelle et le motion design" },
  { firstName: "Hamed", lastName: "Toure", title: "Développeur Front-End Senior", expertise: ["React", "TypeScript", "Tailwind CSS"], location: "Bamako, Mali", bioFocus: "les interfaces web modernes et accessibles" },
  { firstName: "Sandrine", lastName: "Nkouka", title: "Consultante Growth & Analytics", expertise: ["Growth Marketing", "Google Analytics", "CRM"], location: "Brazzaville, Congo", bioFocus: "l'optimisation de la croissance digitale" },
  { firstName: "Franck", lastName: "Zoungrana", title: "Architecte Logiciel", expertise: ["Java", "Spring Boot", "Architecture logicielle"], location: "Ouagadougou, Burkina Faso", bioFocus: "la conception de systèmes logiciels scalables" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const INSTRUCTORS: Instructor[] = SEEDS.map((seed, index) => {
  const fullName = `${seed.firstName} ${seed.lastName}`;
  const rating = Number((4.5 + ((index * 7) % 5) / 10).toFixed(1));
  const studentsCount = 800 + ((index * 137) % 6000);
  const coursesCount = 1 + (index % 4);
  const reviewsCount = 60 + ((index * 53) % 900);
  const languages: CourseLanguage[] =
    index % 5 === 0 ? ["Français", "Anglais"] : ["Français"];

  return {
    id: `instructor-${String(index + 1).padStart(2, "0")}`,
    slug: slugify(fullName),
    firstName: seed.firstName,
    lastName: seed.lastName,
    fullName,
    title: seed.title,
    avatar: `/assets/avatars/instructor-${String((index % 12) + 1).padStart(2, "0")}.jpg`,
    bio: `${seed.firstName} accompagne depuis plusieurs années des étudiants et professionnels à travers l'Afrique francophone dans ${seed.bioFocus}. Fort(e) d'une solide expérience de terrain, ${seed.firstName} conçoit des formations pratiques, actionnables et adaptées aux réalités du marché africain.`,
    expertise: seed.expertise,
    rating,
    studentsCount,
    coursesCount,
    reviewsCount,
    location: seed.location,
    languages,
    socials: {
      linkedin: `https://linkedin.com/in/${slugify(fullName)}`,
      website: index % 3 === 0 ? `https://${slugify(fullName)}.com` : undefined,
    },
    joinedAt: `20${20 + (index % 5)}-0${1 + (index % 9)}-1${index % 9}`,
    verified: index % 4 !== 3,
  };
});

export function getInstructorBySlug(slug: string) {
  return INSTRUCTORS.find((instructor) => instructor.slug === slug);
}

export function getInstructorById(id: string) {
  return INSTRUCTORS.find((instructor) => instructor.id === id);
}
