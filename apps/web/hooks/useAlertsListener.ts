"use client";

import { useEffect } from "react";
import { useSocket } from "@/providers/socket-provider";
import { toast } from "sonner";
import { SuspiciousActivityAlert } from "@/types/suspicious-activity";

/**
 * Listens to suspicious activities and shows toast of it happens
 *
 */
export const useAlertsSocketListener = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const alertSuspiciousActivity = (val: SuspiciousActivityAlert) => {
      switch (val.error) {
        case "TOO_MANY_API":
          toast.warning("Too many API requests detected.");
          break;
        case "TOO_MANY_DOWNLOAD":
          toast.warning("Too many downloads detected.");
          break;
        case "TOO_MANY_LOGIN":
          toast.warning("Too many login attempts detected.");
          break;
        case "TOO_MANY_UPLOAD":
          toast.warning("Too many uploads detected.");
          break;
        default:
          toast.warning("Suspicious activity detected.");
      }
    };

    socket.on("suspiciousActivity", alertSuspiciousActivity);

    return () => {
      socket.off("suspiciousActivity", alertSuspiciousActivity);
    };
  }, [socket]);
};
