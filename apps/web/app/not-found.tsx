import React from "react";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
      <Ghost className="w-20 h-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-2">404 - Page not found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
