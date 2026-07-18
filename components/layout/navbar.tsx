"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MAIN_NAV } from "@/constants/navigation";
import type { NavItem } from "@/types";

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = React.useState(false);
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "relative px-3 py-2 text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-brand-primary",
          isActive && "text-brand-primary"
        )}
      >
        {item.label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-primary"
          />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-brand-primary",
          isActive && "text-brand-primary"
        )}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 min-w-56 overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-lg"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-lg px-3 py-2 text-sm text-secondary-foreground/80 transition-colors hover:bg-brand-bg hover:text-brand-primary"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "border-border shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center lg:flex" aria-label="Navigation principale">
          {MAIN_NAV.map((item) => (
            <DesktopNavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Rechercher"
            render={<Link href="/recherche" />}
            nativeButton={false}
          >
            <Search />
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/connexion" />}
            nativeButton={false}
          >
            Connexion
          </Button>
          <Button size="sm" render={<Link href="/inscription" />} nativeButton={false}>
            Commencer gratuitement
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Ouvrir le menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm p-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle render={<div />}>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 overflow-y-auto p-4">
              {MAIN_NAV.map((item) => (
                <div key={item.href} className="py-1">
                  <SheetClose
                    render={
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-brand-bg"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                  {item.children && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      {item.children.map((child) => (
                        <SheetClose
                          key={child.href}
                          render={
                            <Link
                              href={child.href}
                              className="rounded-lg px-3 py-2 text-sm text-secondary-foreground/80 hover:bg-brand-bg hover:text-brand-primary"
                            />
                          }
                        >
                          {child.label}
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <SheetFooterActions />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SheetFooterActions() {
  return (
    <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
      <SheetClose
        render={<Button variant="outline" render={<Link href="/connexion" />} nativeButton={false} />}
      >
        Connexion
      </SheetClose>
      <SheetClose
        render={<Button render={<Link href="/inscription" />} nativeButton={false} />}
      >
        Commencer gratuitement
      </SheetClose>
    </div>
  );
}
