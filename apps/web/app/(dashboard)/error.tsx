"use client";

import { AlertTriangle } from "lucide-react";
import ErrorWholePage from "@/features/error-messages/error-whole-page";

const Error = () => {
  return (
    <ErrorWholePage
      Icon={AlertTriangle}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
    />
  );
};

export default Error;
