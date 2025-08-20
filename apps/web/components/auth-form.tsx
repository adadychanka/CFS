"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/button";
import { Form, FormField } from "@repo/ui/components/form";
import { AuthFormItem } from "@/components/auth-form-item";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { authAction } from "@/lib/actions";
import { Info } from "lucide-react";
import {
  getSubmitButtonContent,
  type AuthCardVariant,
} from "@/utils/get-card-content";

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type Props = {
  variant: AuthCardVariant;
};

function AuthForm({ variant }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    try {
      setTransition(async () => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("variant", variant);
        formData.append("redirectTo", callbackUrl);

        const result = await authAction(formData);
        if (result) {
          setServerError(result);
        } else {
          setServerError(null);
        }
      });
    } catch (error: unknown) {
      console.error(error);

      setServerError("An unexpected error occurred");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <AuthFormItem
              field={field}
              label="Email"
              placeholder="example@gmail.com"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <AuthFormItem
              field={field}
              label="Password"
              placeholder="password"
            />
          )}
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-busy={isPending}
        >
          {getSubmitButtonContent(variant, isPending)}
        </Button>
        {serverError && (
          <div className="flex justify-start gap-1">
            <Info className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{serverError}</p>
          </div>
        )}
      </form>
    </Form>
  );
}

export { AuthForm };
