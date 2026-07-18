import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation de la plateforme Digital FormArt Academy.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions d'utilisation"
      updatedAt="15 juin 2026"
      intro="Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation de la plateforme Digital FormArt Academy par tout utilisateur, visiteur, étudiant ou formateur."
      sections={[
        {
          title: "1. Acceptation des conditions",
          paragraphs: [
            "En accédant à la plateforme, vous acceptez sans réserve les présentes conditions d'utilisation. Si vous ne les acceptez pas, veuillez ne pas utiliser nos services.",
          ],
        },
        {
          title: "2. Inscription et compte utilisateur",
          paragraphs: [
            "L'inscription est gratuite et ouverte à toute personne majeure. Vous êtes responsable de la confidentialité de vos identifiants de connexion.",
          ],
        },
        {
          title: "3. Accès aux formations",
          paragraphs: [
            "L'accès aux formations payantes est conditionné au paiement intégral du prix affiché. Une fois achetée, une formation reste accessible à vie, incluant ses mises à jour.",
          ],
        },
        {
          title: "4. Comportement des utilisateurs",
          paragraphs: [
            "Tout comportement frauduleux, abusif ou contraire à la loi entraînera la suspension immédiate du compte concerné.",
          ],
        },
        {
          title: "5. Modification des conditions",
          paragraphs: [
            "Digital FormArt Academy se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés de toute modification substantielle.",
          ],
        },
      ]}
    />
  );
}
