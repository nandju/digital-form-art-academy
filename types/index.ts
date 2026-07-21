export type UserRole = "visitor" | "student" | "trainer" | "admin";

export type CourseLevel = "débutant" | "intermédiaire" | "avancé";

export type CourseLanguage = "Français" | "Anglais";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface Instructor {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  studentsCount: number;
  coursesCount: number;
  reviewsCount: number;
  location: string;
  languages: CourseLanguage[];
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  joinedAt: string;
  verified: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "document" | "quiz";
  duration: number;
  completed?: boolean;
  locked?: boolean;
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: number;
}

export interface Review {
  id: string;
  courseId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  banner: string;
  categoryId: string;
  categoryName: string;
  instructorId: string;
  level: CourseLevel;
  language: CourseLanguage;
  price: number;
  originalPrice?: number;
  currency: "FCFA";
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: number;
  lessonsCount: number;
  modules: Module[];
  tags: string[];
  learningOutcomes: string[];
  requirements: string[];
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  updatedAt: string;
  createdAt: string;
  certificateIncluded: boolean;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  email: string;
  location: string;
  joinedAt: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  certificatesEarned: number;
}

export type CertificateStatus = "en_attente" | "validee" | "rejetee";

export interface Certificate {
  id: string;
  certificateNumber: string;
  courseId?: string;
  courseTitle: string;
  studentId?: string;
  studentName: string;
  instructorId?: string;
  instructorName: string;
  issueDate: string;
  qrCode: string;
  grade: string;
  status: CertificateStatus;
  completionRate?: number;
  quizAverage?: number;
  requestedAt?: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "mois" | "an";
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface TrainerPricingPlan {
  id: string;
  name: string;
  price: number;
  period: "mois" | "an";
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
