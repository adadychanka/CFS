"use client";

import { Button } from "@repo/ui/components/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import ErrorWholePage from "@/features/error-messages/error-whole-page";

const Error = () => {
  return (
    <ErrorWholePage
      Icon={AlertTriangle}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
    >
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </ErrorWholePage>
  );
};

export default Error;
