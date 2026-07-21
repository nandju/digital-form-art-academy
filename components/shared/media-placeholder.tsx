import Image from "next/image";

import { cn } from "@/lib/utils";
import { GraduationCap, ImageIcon, User } from "lucide-react";
import { pickAvatar, pickBanner, pickCourseCover, pickIllustration } from "@/lib/media";

const GRADIENTS = [
  "from-[#123A7D] via-[#1E5BB8] to-[#4A90E2]",
  "from-[#7C3AED] via-[#1E5BB8] to-[#123A7D]",
  "from-[#1E5BB8] via-[#4A90E2] to-[#7C3AED]",
  "from-[#123A7D] via-[#7C3AED] to-[#DC2626]",
  "from-[#F59E0B] via-[#DC2626] to-[#7C3AED]",
];

function hashToIndex(seed: string, length: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return hash % length;
}

interface MediaPlaceholderProps {
  seed: string;
  className?: string;
  variant?: "course" | "avatar" | "banner" | "illustration";
  /** Force the gradient placeholder even if a real photo is available. */
  forcePlaceholder?: boolean;
  alt?: string;
}

/**
 * Renders a deterministic real photo (from `public/images`, see
 * `lib/media.ts`) per `seed`/`variant`. Falls back to an elegant gradient
 * placeholder when `forcePlaceholder` is set or no photo bucket applies.
 */
export function MediaPlaceholder({
  seed,
  className,
  variant = "course",
  forcePlaceholder = false,
  alt = "Illustration Digital FormArt Academy",
}: MediaPlaceholderProps) {
  const gradient = GRADIENTS[hashToIndex(seed, GRADIENTS.length)];
  const Icon =
    variant === "avatar" ? User : variant === "illustration" ? ImageIcon : GraduationCap;

  const photoSrc = forcePlaceholder
    ? null
    : variant === "avatar"
      ? pickAvatar(seed)
      : variant === "banner"
        ? pickBanner(seed)
        : variant === "illustration"
          ? pickIllustration(seed)
          : pickCourseCover(seed);

  if (photoSrc) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          variant === "avatar" ? "rounded-full" : "rounded-xl",
          className
        )}
      >
        <Image
          src={photoSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        variant === "avatar" ? "rounded-full" : "rounded-xl",
        className
      )}
      role="img"
      aria-label="Illustration à venir"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
      <Icon
        className={cn(
          "text-white/85",
          variant === "avatar" ? "size-1/2" : "size-8"
        )}
        strokeWidth={1.5}
      />
    </div>
  );
}
