import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Recreation of the Digital FormArt Academy brand mark: a stylised
 * bulb split into a colourful "brain" silhouette. Used as a placeholder
 * until the final brand asset (public/assets/logos/logo.png) is supplied.
 */
export function LogoMark({ className, size = 40 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Digital FormArt Academy"
    >
      <defs>
        <linearGradient id="dfa-gradient" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="35%" stopColor="#DC2626" />
          <stop offset="65%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4A90E2" />
        </linearGradient>
      </defs>
      <path
        d="M32 4c-9.94 0-18 8.06-18 18 0 7.02 4.02 11.6 7.2 15.03 1.72 1.87 2.8 3.11 2.8 4.47v2.5h16v-2.5c0-1.36 1.08-2.6 2.8-4.47C46 33.6 50 29.02 50 22 50 12.06 41.94 4 32 4Z"
        fill="url(#dfa-gradient)"
      />
      <path d="M25 47h14v3a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-3Z" fill="#123A7D" />
      <rect x="27" y="55" width="10" height="3" rx="1.5" fill="#123A7D" />
      <path
        d="M32 12v26M24 20c2.5 1.5 3.5 4 3.5 6.5S26 31 24 32M40 20c-2.5 1.5-3.5 4-3.5 6.5S38 31 40 32"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
