import Link from "next/link";
import { Compass, Home } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-brand-bg">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="font-heading text-7xl font-bold text-brand-primary">404</span>
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Cette page n&apos;existe pas... encore
          </h1>
          <p className="max-w-md text-muted-foreground">
            La page que vous recherchez a peut-être été déplacée, supprimée ou n&apos;a jamais
            existé. Retournez à l&apos;accueil ou explorez notre catalogue de formations.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/" />} nativeButton={false}>
              <Home className="size-4" />
              Retour à l&apos;accueil
            </Button>
            <Button variant="outline" render={<Link href="/catalogue" />} nativeButton={false}>
              <Compass className="size-4" />
              Explorer le catalogue
            </Button>
          </div>
        </div>
        <div className="aspect-square overflow-hidden rounded-3xl">
          <MediaPlaceholder seed="404" variant="illustration" className="h-full w-full" />
        </div>
      </Container>
    </div>
  );
}
