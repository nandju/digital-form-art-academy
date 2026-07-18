import type { SVGProps } from "react";

/**
 * Lucide React no longer ships brand/logo icons. These lightweight inline
 * SVGs provide the social network glyphs used across the platform (footer,
 * contact page, profile pages).
 */
type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.25c0-.87.24-1.46 1.5-1.46h1.6V4.14C15.77 4.06 14.7 4 13.6 4 11.03 4 9.5 5.49 9.5 8.05V10.5H7v3h2.5V21h4Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.06V19h2.88V8.5ZM5.5 4a1.69 1.69 0 1 0 0 3.38A1.69 1.69 0 0 0 5.5 4Zm13.5 4.19c-1.5 0-2.42.8-2.82 1.36h-.04V8.5H8.28V19h2.88v-5.3c0-1.4.27-2.75 2-2.75 1.7 0 1.73 1.6 1.73 2.84V19h2.87v-5.72c0-2.5-.54-4.6-3.76-4.6Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm0 5.94a2.34 2.34 0 1 1 0-4.68 2.34 2.34 0 0 1 0 4.68ZM16.2 4H7.8A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4Zm2.55 12.2a2.55 2.55 0 0 1-2.55 2.55H7.8a2.55 2.55 0 0 1-2.55-2.55V7.8A2.55 2.55 0 0 1 7.8 5.25h8.4a2.55 2.55 0 0 1 2.55 2.55v8.4Zm-1.2-9.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.3 4h2.4l-5.24 6 5.99 8h-4.69l-3.67-4.8L8.9 18H6.5l5.6-6.4L6.4 4h4.8l3.3 4.36L18.3 4Zm-1.68 12.6h1.32L8.44 5.32H7.03L16.62 16.6Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 9.3 2 12 2 12s0 2.7.4 4.4a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.4.4-4.4s0-2.7-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}
