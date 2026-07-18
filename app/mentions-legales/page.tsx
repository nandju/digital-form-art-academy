import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Digital FormArt Academy.",
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      updatedAt="15 juin 2026"
      intro="Le présent site est édité par Digital FormArt Academy. Ces mentions légales ont pour objectif d'informer les utilisateurs sur l'identité de l'éditeur et les conditions d'utilisation de la plateforme."
      sections={[
        {
          title: "1. Éditeur du site",
          paragraphs: [
            `Digital FormArt Academy, société de formation en ligne, dont le siège social est situé à ${SITE_CONFIG.address}.`,
            `Contact : ${SITE_CONFIG.supportEmail} · ${SITE_CONFIG.supportPhone}`,
          ],
        },
        {
          title: "2. Hébergement",
          paragraphs: [
            "La plateforme Digital FormArt Academy est hébergée sur des infrastructures cloud sécurisées, garantissant disponibilité et protection des données.",
          ],
        },
        {
          title: "3. Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus présents sur la plateforme (textes, vidéos, images, logos) est protégé par le droit d'auteur et demeure la propriété exclusive de Digital FormArt Academy ou de ses partenaires formateurs.",
          ],
        },
        {
          title: "4. Responsabilité",
          paragraphs: [
            "Digital FormArt Academy s'efforce de fournir des informations aussi précises que possible, mais ne peut être tenue responsable des omissions ou inexactitudes.",
          ],
        },
      ]}
    />
  );
}
