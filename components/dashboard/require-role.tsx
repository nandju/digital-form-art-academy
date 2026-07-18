"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth, type DashboardRole } from "@/lib/auth-context";

export function RequireRole({
  role,
  children,
}: {
  role: DashboardRole;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, roleHome } = useAuth();

  React.useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/connexion");
    } else if (user.role !== role) {
      router.replace(roleHome(user.role));
    }
  }, [isLoading, user, role, router, roleHome]);

  if (isLoading || !user || user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg">
        <Loader2 className="size-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
