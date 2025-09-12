import { toast } from "sonner";
import type { SuspiciousActivityAlert } from "@/types/suspicious-activity";

export const normilizeIp = (ip: string) => {
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }

  return ip;
};

/**
 * Shows a toast notification based on alert type
 */
export const handleSuspiciousActivity = (val: SuspiciousActivityAlert) => {
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
