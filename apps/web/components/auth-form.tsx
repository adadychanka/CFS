"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/button";
import { Form, FormField } from "@repo/ui/components/form";
import { AuthFormItem } from "@/components/auth-form-item";

const formSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function AuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //eslint-disable-next-line
  function onSubmit(data: z.infer<typeof formSchema>) {
    //TODO handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export { AuthForm };
