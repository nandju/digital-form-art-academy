import type { NavItem } from "@/types";

export const MAIN_NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Formations",
    href: "/catalogue",
    children: [
      { label: "Catalogue complet", href: "/catalogue" },
      { label: "Catégories", href: "/categories" },
      { label: "Formateurs", href: "/formateurs" },
      { label: "Rechercher", href: "/recherche" },
    ],
  },
  { label: "Entreprises", href: "/entreprises" },
  { label: "Tarifs", href: "/tarifs" },
  {
    label: "Ressources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Témoignages", href: "/temoignages" },
      { label: "Partenaires", href: "/partenaires" },
    ],
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  platform: [
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Catégories", href: "/categories" },
    { label: "Formateurs", href: "/formateurs" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  company: [
    { label: "À propos", href: "/a-propos" },
    { label: "Entreprises", href: "/entreprises" },
    { label: "Partenaires", href: "/partenaires" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Témoignages", href: "/temoignages" },
    { label: "Support", href: "/contact" },
    { label: "Maintenance", href: "/maintenance" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Cookies", href: "/cookies" },
  ],
} satisfies Record<string, NavItem[]>;

export const STUDENT_SIDEBAR_NAV: NavItem[] = [
  { label: "Tableau de bord", href: "/etudiant" },
  { label: "Mes formations", href: "/etudiant/formations" },
  { label: "Certificats", href: "/etudiant/certificats" },
  { label: "Paiements", href: "/etudiant/paiements" },
  { label: "Favoris", href: "/etudiant/favoris" },
  { label: "Notifications", href: "/etudiant/notifications" },
  { label: "Calendrier", href: "/etudiant/calendrier" },
  { label: "Historique", href: "/etudiant/historique" },
  { label: "Profil", href: "/etudiant/profil" },
  { label: "Paramètres", href: "/etudiant/parametres" },
  { label: "Support", href: "/etudiant/support" },
];

export const TRAINER_SIDEBAR_NAV: NavItem[] = [
  { label: "Tableau de bord", href: "/formateur" },
  { label: "Mes formations", href: "/formateur/formations" },
  { label: "Créer une formation", href: "/formateur/formations/creer" },
  { label: "Étudiants", href: "/formateur/etudiants" },
  { label: "Questions", href: "/formateur/questions" },
  { label: "Statistiques", href: "/formateur/statistiques" },
  { label: "Revenus", href: "/formateur/revenus" },
  { label: "Profil", href: "/formateur/profil" },
];

export const ADMIN_SIDEBAR_NAV: NavItem[] = [
  { label: "Tableau de bord", href: "/admin" },
  { label: "Utilisateurs", href: "/admin/utilisateurs" },
  { label: "Étudiants", href: "/admin/etudiants" },
  { label: "Formateurs", href: "/admin/formateurs" },
  { label: "Catégories", href: "/admin/categories" },
  { label: "Formations", href: "/admin/formations" },
  { label: "Certificats", href: "/admin/certificats" },
  { label: "Paiements", href: "/admin/paiements" },
  { label: "Coupons", href: "/admin/coupons" },
  { label: "Statistiques", href: "/admin/statistiques" },
  { label: "Rapports", href: "/admin/rapports" },
  { label: "Journal", href: "/admin/journal" },
  { label: "Paramètres", href: "/admin/parametres" },
];
