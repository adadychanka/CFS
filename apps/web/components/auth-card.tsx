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

type Props = {
  isSignUp?: boolean;
};

function AuthCard({ isSignUp }: Props) {
  let title = "Log in";
  let linkText = "sign up here";
  let link = "/sign-up";

  if (isSignUp) {
    title = "Sign up";
    linkText = "login in here";
    link = "/log-in";
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="ghost" className="hover:bg-transparent">
          You can{" "}
          <Link href={link} className="text-blue-500">
            {linkText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { AuthCard };
