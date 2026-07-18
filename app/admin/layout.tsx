import { RequireRole } from "@/components/dashboard/require-role";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_SIDEBAR_NAV } from "@/constants/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="admin">
      <DashboardShell role="admin" items={ADMIN_SIDEBAR_NAV}>
        {children}
      </DashboardShell>
    </RequireRole>
  );
}
