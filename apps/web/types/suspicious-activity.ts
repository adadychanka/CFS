export type SuspiciousActivityAction = "API" | "DOWNLOAD" | "LOGIN" | "UPLOAD";

export type SuspiciousActivityError =
  | "TOO_MANY_API"
  | "TOO_MANY_DOWNLOAD"
  | "TOO_MANY_LOGIN"
  | "TOO_MANY_UPLOAD";

export interface SuspiciousActivity {
  userId: string;
  email: string;
  ip: string;
  action: SuspiciousActivityAction;
  error: SuspiciousActivityError;
  details: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SuspiciousActivityAlert {
  action: SuspiciousActivityAction;
  error: SuspiciousActivityError;
  details: string;
  ip: string;
  timestamp: string;
}
