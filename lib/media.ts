/**
 * Central registry of real image assets uploaded to `public/images`.
 * Provides deterministic per-seed selection so the same course/instructor
 * always renders the same photo across the app, with graceful category
 * bucketing (course covers, avatars, banners, illustrations, partners).
 */

export const BRAND_LOGO = "/images/logo-digital-formart.png";
export const BRAND_LOGO_MARK = "/images/logo_fond.jpeg";

export const HERO_IMAGES = ["/images/hero.png", "/images/image-accueil.jpg"];

export const AMBASSADOR_IMAGE = "/images/ambassadeur.jpg";
export const PRESS_IMAGE = "/images/presse.jpg";

export const COURSE_COVER_IMAGES = [
  "/images/IA.jpg",
  "/images/creationdecontenu.jpg",
  "/images/programme1.jpg",
  "/images/programme2.jpg",
  "/images/reseauxsociaux.jpg",
  "/images/image_content_1.jpg",
  "/images/image_content_2.jpg",
  "/images/image_content_3.jpg",
];

export const AVATAR_IMAGES = [
  "/images/men1.jpg",
  "/images/men2.jpg",
  "/images/women.jpg",
  "/images/ambassadeur.jpg",
];

export const ILLUSTRATION_IMAGES = [
  "/images/image_content_1.jpg",
  "/images/image_content_2.jpg",
  "/images/image_content_3.jpg",
  "/images/reseauxsociaux.jpg",
];

export const PARTNER_LOGO_IMAGES = [
  "/images/business-logo/logo_1.png",
  "/images/business-logo/logo_2.png",
];

function hashToIndex(seed: string, length: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return hash % length;
}

export function pickFrom(list: string[], seed: string) {
  return list[hashToIndex(seed, list.length)];
}

export function pickCourseCover(seed: string) {
  return pickFrom(COURSE_COVER_IMAGES, seed);
}

export function pickAvatar(seed: string) {
  return pickFrom(AVATAR_IMAGES, seed);
}

export function pickBanner(seed: string) {
  return pickFrom(HERO_IMAGES, seed);
}

export function pickIllustration(seed: string) {
  return pickFrom(ILLUSTRATION_IMAGES, seed);
}

export function pickPartnerLogo(seed: string) {
  return pickFrom(PARTNER_LOGO_IMAGES, seed);
}
