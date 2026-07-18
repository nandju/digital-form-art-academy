import type { Metadata } from "next";

import { SearchView } from "@/features/search/search-view";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Recherchez parmi nos formations, catégories et formateurs.",
};

export default function SearchPage() {
  return <SearchView />;
}
