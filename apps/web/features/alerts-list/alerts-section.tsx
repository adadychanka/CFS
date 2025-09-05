import React from "react";
import AlertsList from "@/features/alerts-list/alerts-list";

const AlertsSection = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto p-4">
      <h2 className="font-medium mb-4">Recent Alerts</h2>
      <AlertsList />
    </div>
  );
};

export default AlertsSection;
