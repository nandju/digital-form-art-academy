import type { Metadata } from "next";

import { CatalogueView } from "@/features/catalogue/catalogue-view";

export const metadata: Metadata = {
  title: "Catalogue des formations",
  description:
    "Découvrez plus de 40 formations en développement, design, marketing, data, cybersécurité et entrepreneuriat sur Digital FormArt Academy.",
};

export default function CataloguePage() {
  return <CatalogueView />;
}
