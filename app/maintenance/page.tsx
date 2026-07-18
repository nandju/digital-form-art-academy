import type { Metadata } from "next";
import { Wrench } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";

export const metadata: Metadata = {
  title: "Maintenance en cours",
  description: "Digital FormArt Academy est actuellement en maintenance. Merci de votre patience.",
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-bg px-4 text-center">
      <Logo size={48} />
      <div className="aspect-square w-48 overflow-hidden rounded-3xl">
        <MediaPlaceholder seed="maintenance" variant="illustration" className="h-full w-full" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-warning/10 text-warning">
          <Wrench className="size-6" />
        </span>
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Maintenance en cours
        </h1>
        <Container className="max-w-md">
          <p className="text-muted-foreground">
            Nous améliorons actuellement votre expérience sur Digital FormArt Academy. La
            plateforme sera de nouveau disponible très prochainement. Merci de votre patience.
          </p>
        </Container>
      </div>
    </div>
  );
}
