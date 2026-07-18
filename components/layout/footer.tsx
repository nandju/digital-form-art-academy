import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { FOOTER_NAV } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";

const socialLinks = [
  { href: SITE_CONFIG.social.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: SITE_CONFIG.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: SITE_CONFIG.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: SITE_CONFIG.social.twitter, icon: XIcon, label: "Twitter / X" },
  { href: SITE_CONFIG.social.youtube, icon: YoutubeIcon, label: "YouTube" },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo variant="light" showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {SITE_CONFIG.description}
            </p>
            <ul className="mt-5 flex flex-col gap-2 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-brand-light" />
                {SITE_CONFIG.supportEmail}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-brand-light" />
                {SITE_CONFIG.supportPhone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-brand-light" />
                {SITE_CONFIG.address}
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-light"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Plateforme" items={FOOTER_NAV.platform} />
          <FooterColumn title="Entreprise" items={FOOTER_NAV.company} />
          <FooterColumn title="Support" items={FOOTER_NAV.support} />
          <FooterColumn title="Mentions légales" items={FOOTER_NAV.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-white/60">
            Conçu avec soin pour l&apos;excellence numérique en Afrique.
          </p>
        </div>
      </Container>
    </footer>
  );
}
