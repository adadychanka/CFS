"use client";

import ErrorWholePage from "@/features/error-messages/error-whole-page";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";

const NotFound = () => {
  return (
    <ErrorWholePage
      Icon={Ghost}
      title="404 - Page not found"
      description="Sorry, we couldn’t find the page you were looking for."
    >
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </ErrorWholePage>
  );
};

export default NotFound;
