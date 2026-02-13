"use client";

import ErrorWholePage from "@/features/error-messages/error-whole-page";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <ErrorWholePage
      Icon={Ghost}
      title="404 - Page not found"
      description="Sorry, we couldn’t find the page you were looking for."
    />
  );
};

export default NotFound;
