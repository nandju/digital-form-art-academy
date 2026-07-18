import { cn } from "@/lib/utils";
import { GraduationCap, ImageIcon, User } from "lucide-react";

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
}

/**
 * Elegant gradient placeholder used until real brand media
 * (public/assets/**) is supplied. Deterministic per `seed` so the same
 * course/instructor always renders the same visual.
 */
export function MediaPlaceholder({
  seed,
  className,
  variant = "course",
}: MediaPlaceholderProps) {
  const gradient = GRADIENTS[hashToIndex(seed, GRADIENTS.length)];
  const Icon =
    variant === "avatar" ? User : variant === "illustration" ? ImageIcon : GraduationCap;

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
