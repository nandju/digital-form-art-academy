import { RequireRole } from "@/components/dashboard/require-role";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { STUDENT_SIDEBAR_NAV } from "@/constants/navigation";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="student">
      <DashboardShell role="student" items={STUDENT_SIDEBAR_NAV}>
        {children}
      </DashboardShell>
    </RequireRole>
  );
}
