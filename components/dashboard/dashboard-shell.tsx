"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";

import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ICONS } from "@/components/dashboard/nav-icons";
import { useAuth, type DashboardRole } from "@/lib/auth-context";
import { NOTIFICATIONS } from "@/data/notifications";

const ROLE_LABELS: Record<DashboardRole, string> = {
  student: "Espace étudiant",
  trainer: "Espace formateur",
  admin: "Espace administration",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SidebarNav({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = NAV_ICONS[item.href] ?? User;
        const isActive =
          pathname === item.href ||
          (item.href !== "/etudiant" &&
            item.href !== "/formateur" &&
            item.href !== "/admin" &&
            pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-primary text-white"
                : "text-muted-foreground hover:bg-brand-bg hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({
  role,
  items,
  children,
}: {
  role: DashboardRole;
  items: NavItem[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;
  const recentNotifications = NOTIFICATIONS.slice(0, 5);

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  const profileHref =
    role === "student" ? "/etudiant/profil" : role === "trainer" ? "/formateur/profil" : "/admin/parametres";
  const settingsHref =
    role === "student" ? "/etudiant/parametres" : role === "trainer" ? "/formateur/profil" : "/admin/parametres";

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo size={32} />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {ROLE_LABELS[role]}
          </p>
          <SidebarNav items={items} />
        </div>
        {user && (
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                {getInitials(user.fullName)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{user.fullName}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-border px-5">
                <Logo size={30} />
              </div>
              <div className="overflow-y-auto px-3 py-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {ROLE_LABELS[role]}
                </p>
                <SidebarNav items={items} onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-xs flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="h-9 pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-sm" aria-label="Notifications" />}
              >
                <span className="relative">
                  <Bell className="size-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary" className="text-[10px]">
                    {unreadCount} non lues
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recentNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-0.5 py-2">
                    <span className="text-sm font-medium text-foreground">{notification.title}</span>
                    <span className="line-clamp-2 text-xs text-muted-foreground">
                      {notification.message}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" className="gap-2 px-2" aria-label="Compte" />}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                    {getInitials(user.fullName)}
                  </span>
                  <span className="hidden text-sm font-medium sm:inline">
                    {user.fullName.split(" ")[0]}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium text-foreground">{user.fullName}</p>
                    <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href={profileHref} />}>
                    <User className="size-4" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href={settingsHref} />}>
                    <Settings className="size-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut className="size-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
