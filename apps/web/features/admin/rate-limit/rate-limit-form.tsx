"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/button";
import { submitRateLimit } from "@/lib/actions/admin/rate-limit";
import { useTransition } from "react";
import type {
  RateLimitResponse,
  RateLimitResponseData,
} from "@/types/rate-limit";
import { TooltipWrapper } from "@/components/tooltip-wrapper";

const FormSchema = z.object({
  rate: z.coerce.number().min(1, "Rate limit must not be less than 1"),
});

type Props = {
  defaultValue: RateLimitResponseData | null;
};

export function RateLimitForm({ defaultValue }: Props) {
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rate: defaultValue?.limit || 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const rateLimit = data.rate;
    setTransition(async () => {
      const response: RateLimitResponse = await submitRateLimit({
        limit: rateLimit,
        target: "API",
      });
      if (response.success) {
        toast.success("Successfully updated!");
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-1">
                  <TooltipWrapper text="Controls how often site users can call the API per hour.">
                    <FormLabel className="words-wrap">
                      Rate limit per hour:
                    </FormLabel>
                  </TooltipWrapper>
                  <FormControl>
                    <Input
                      className="w-[150px]"
                      placeholder="rate limit"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">{isPending ? "Updating..." : "Update"}</Button>
      </form>
    </Form>
  );
}
