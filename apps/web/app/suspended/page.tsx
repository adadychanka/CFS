import { Button } from "@repo/ui/components/button";
import { Lock, Phone } from "lucide-react";

// TODO: if suspended protect other routes
function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
      <Lock className="w-20 h-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-2">Account Suspended</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Your account has been suspended. Please contact support if you think
        this is a mistake.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="mailto:someone@example.com">
          <Button variant="outline">
            {" "}
            <Phone /> Contact Support
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Page;
