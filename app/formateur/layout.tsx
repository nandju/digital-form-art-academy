import { RequireRole } from "@/components/dashboard/require-role";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TRAINER_SIDEBAR_NAV } from "@/constants/navigation";

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="trainer">
      <DashboardShell role="trainer" items={TRAINER_SIDEBAR_NAV}>
        {children}
      </DashboardShell>
    </RequireRole>
  );
}
