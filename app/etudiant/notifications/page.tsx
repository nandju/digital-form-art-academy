"use client";

import { Bell, Check } from "lucide-react";

import { PageHeader, DashboardCard } from "@/components/dashboard/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NOTIFICATIONS } from "@/data/notifications";
import { toast } from "sonner";

const types: Record<string, string> = {
  success: "success",
  info: "secondary",
  warning: "warning",
  error: "destructive",
};

export default function StudentNotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Restez informé de vos progrès et des nouveautés."
        actions={
          <Button variant="outline" size="sm" onClick={() => toast.success("Toutes les notifications sont marquées comme lues.")}>
            <Check className="size-4" />
            Tout marquer comme lu
          </Button>
        }
      />

      <div className="space-y-3">
        {NOTIFICATIONS.slice(0, 15).map((notification) => (
          <DashboardCard key={notification.id} className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-primary">
              <Bell className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{notification.title}</p>
                {!notification.read && <Badge variant="default" className="text-[10px]">Nouveau</Badge>}
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{notification.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString("fr-FR")}</p>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
