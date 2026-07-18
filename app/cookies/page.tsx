import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Informations sur l'utilisation des cookies sur Digital FormArt Academy.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique de cookies"
      updatedAt="15 juin 2026"
      intro="Cette page vous informe sur l'utilisation des cookies et technologies similaires sur la plateforme Digital FormArt Academy."
      sections={[
        {
          title: "1. Qu'est-ce qu'un cookie ?",
          paragraphs: [
            "Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite sur notre plateforme, permettant de mémoriser certaines informations.",
          ],
        },
        {
          title: "2. Cookies utilisés",
          paragraphs: [
            "Nous utilisons des cookies essentiels (fonctionnement du site), des cookies de performance (statistiques d'usage) et des cookies de préférence (langue, affichage).",
          ],
        },
        {
          title: "3. Gestion des cookies",
          paragraphs: [
            "Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies, sachant que certaines fonctionnalités de la plateforme pourraient être affectées.",
          ],
        },
      ]}
    />
  );
}
