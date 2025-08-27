import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { AuthForm } from "./auth-form";
import { getCardContent, type AuthCardVariant } from "@/utils/get-card-content";

type Props = {
  variant: AuthCardVariant;
  isAdmin?: boolean;
};

function AuthCard({ variant, isAdmin = false }: Props) {
  const { link, linkText, title } = getCardContent(variant);
  const isLinkVisible = isAdmin || link !== "/admin/sign-up";

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm variant={variant} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {isLinkVisible && (
          <Button variant="ghost" className="hover:bg-transparent gap-1">
            You can{" "}
            <Link href={link} className="text-blue-500">
              {linkText}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export { AuthCard };
