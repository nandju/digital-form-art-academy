import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/shared/logo-mark";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  showTagline?: boolean;
  size?: number;
  href?: string;
}

export function Logo({
  className,
  variant = "default",
  showTagline = false,
  size = 40,
  href = "/",
}: LogoProps) {
  const titleColor = variant === "light" ? "text-white" : "text-brand-primary";
  const taglineColor =
    variant === "light" ? "text-white/70" : "text-secondary-foreground/60";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none",
        className
      )}
      aria-label="Digital FormArt Academy - Accueil"
    >
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            titleColor
          )}
        >
          FormArt
          <span className="text-brand-secondary">Academy</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-wider",
              taglineColor
            )}
          >
            Digital Skills Development
          </span>
        )}
      </span>
    </Link>
  );
}
