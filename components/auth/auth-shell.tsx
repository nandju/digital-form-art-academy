import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";

export function AuthShell({
  children,
  title,
  subtitle,
  seed = "auth-hero",
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  seed?: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-8 px-6 py-12 sm:px-12 lg:px-20">
        <Link href="/" className="w-fit">
          <Logo size={36} />
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="relative hidden overflow-hidden bg-brand-primary lg:block">
        <MediaPlaceholder seed={seed} variant="banner" className="h-full w-full opacity-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-brand-primary/70 p-12 text-center text-white">
          <h2 className="font-heading text-3xl font-bold">Digital FormArt Academy</h2>
          <p className="max-w-md text-white/80">
            Développez vos compétences numériques, révélez votre potentiel. Rejoignez des milliers
            d&apos;apprenants à travers l&apos;Afrique francophone.
          </p>
        </div>
      </div>
    </div>
  );
}
