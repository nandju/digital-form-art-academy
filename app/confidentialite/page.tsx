import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Digital FormArt Academy collecte, utilise et protège vos données personnelles.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updatedAt="15 juin 2026"
      intro="Digital FormArt Academy attache une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous collectons et comment nous les utilisons."
      sections={[
        {
          title: "1. Données collectées",
          paragraphs: [
            "Nous collectons les données que vous nous fournissez directement (nom, email, informations de paiement) ainsi que des données d'usage (progression, historique de navigation).",
          ],
        },
        {
          title: "2. Utilisation des données",
          paragraphs: [
            "Vos données sont utilisées pour fournir nos services, personnaliser votre expérience, traiter vos paiements et vous envoyer des communications pertinentes.",
          ],
        },
        {
          title: "3. Partage des données",
          paragraphs: [
            "Nous ne vendons jamais vos données personnelles. Elles peuvent être partagées avec nos prestataires de paiement uniquement dans le cadre du traitement de vos transactions.",
          ],
        },
        {
          title: "4. Vos droits",
          paragraphs: [
            "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Contactez-nous à tout moment pour exercer ces droits.",
          ],
        },
        {
          title: "5. Sécurité",
          paragraphs: [
            "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé.",
          ],
        },
      ]}
    />
  );
}
