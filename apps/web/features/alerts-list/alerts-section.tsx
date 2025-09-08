"use client";

import AlertsList from "@/features/alerts-list/alerts-list";
import { useAlertsSocketListener } from "@/hooks/useAlertsListener";

const AlertsSection = () => {
  useAlertsSocketListener();

  return (
    <div className="w-full max-w-[1280px] mx-auto p-4">
      <h2 className="font-medium mb-4">Recent Alerts</h2>
      <AlertsList />
    </div>
  );
};

export default AlertsSection;
