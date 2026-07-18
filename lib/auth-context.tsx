"use client";

import * as React from "react";

export type DashboardRole = "student" | "trainer" | "admin";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: DashboardRole;
  avatarSeed: string;
}

const STORAGE_KEY = "dfa_auth_user";

export const DEMO_ACCOUNTS: Record<DashboardRole, AuthUser> = {
  student: {
    id: "student-001",
    fullName: "Aïcha Koné",
    email: "etudiant.demo@digitalformart.com",
    role: "student",
    avatarSeed: "student-001",
  },
  trainer: {
    id: "instructor-01",
    fullName: "Serge Aka",
    email: "formateur.demo@digitalformart.com",
    role: "trainer",
    avatarSeed: "instructor-01",
  },
  admin: {
    id: "admin-001",
    fullName: "Grace Adjei",
    email: "admin.demo@digitalformart.com",
    role: "admin",
    avatarSeed: "admin-001",
  },
};

const ROLE_HOME: Record<DashboardRole, string> = {
  student: "/etudiant",
  trainer: "/formateur",
  admin: "/admin",
};

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (role: DashboardRole, fullName?: string, email?: string) => AuthUser;
  logout: () => void;
  roleHome: (role: DashboardRole) => string;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = React.useCallback(
    (role: DashboardRole, fullName?: string, email?: string) => {
      const base = DEMO_ACCOUNTS[role];
      const nextUser: AuthUser = {
        ...base,
        fullName: fullName?.trim() || base.fullName,
        email: email?.trim() || base.email,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    },
    []
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const roleHome = React.useCallback((role: DashboardRole) => ROLE_HOME[role], []);

  const value = React.useMemo(
    () => ({ user, isLoading, login, logout, roleHome }),
    [user, isLoading, login, logout, roleHome]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
