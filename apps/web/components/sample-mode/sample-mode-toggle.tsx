"use client";

import { Button } from "@repo/ui/components/button";
import { FlaskConical, LogOut } from "lucide-react";
import { useSampleMode } from "@/providers/sample-mode-provider";

export default function SampleModeToggle() {
  const { isSampleMode, toggleSampleMode } = useSampleMode();

  return (
    <div className="pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <span
        className={`text-sm px-3 py-1 rounded-md break-words max-w-full sm:max-w-[70%] ${
          isSampleMode
            ? "bg-amber-100 text-amber-800 font-medium"
            : "text-neutral-600"
        }`}
      >
        {isSampleMode
          ? "⚠️ You’re viewing demo feedback. Switch back anytime to see your own data."
          : "Preview the dashboard with demo feedback. Your real data will remain safe and unchanged."}
      </span>

      <Button
        size="sm"
        variant="outline"
        aria-pressed={isSampleMode}
        aria-label={
          isSampleMode
            ? "Exit sample mode and return to your own data"
            : "Enter sample mode and view demo data"
        }
        onClick={toggleSampleMode}
        className="whitespace-nowrap"
      >
        {isSampleMode ? (
          <>
            <LogOut className="mr-1 h-4 w-4" /> Exit Sample Mode
          </>
        ) : (
          <>
            <FlaskConical className="mr-1 h-4 w-4" /> Enter Sample Mode
          </>
        )}
      </Button>
    </div>
  );
}
