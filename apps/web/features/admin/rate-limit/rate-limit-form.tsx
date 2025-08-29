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
import { useState } from "react";
import type {
  RateLimitResponse,
  RateLimitResponseData,
} from "@/types/rate-limit";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { ConfirmationDialog } from "@/components/dialogs/confirmation-dialog";

const FormSchema = z.object({
  rate: z.coerce
    .number()
    .min(1, "Rate limit must not be less than 1")
    .max(1000, "Rate limit must not be more than 1000"),
});

type Props = {
  defaultValue: RateLimitResponseData | null;
};

export function RateLimitForm({ defaultValue }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rate: defaultValue?.limit || 1000,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const rateLimit = data.rate;

    if (data.rate < 100) {
      setIsDialogOpen(true);
    } else {
      const response: RateLimitResponse = await submitRateLimit({
        limit: rateLimit,
        target: "API",
      });
      if (response.success) {
        toast.success("Successfully updated!");
      } else {
        toast.error(response.message);
      }
    }
    setIsLoading(false);
  }

  function handleDialogCancel() {
    setIsDialogOpen(false);
  }

  async function handleDialogConfirm() {
    const rateLimit = Number(form.getValues("rate"));
    {
      const response: RateLimitResponse = await submitRateLimit({
        limit: rateLimit,
        target: "API",
      });
      if (response.success) {
        toast.success("Successfully updated!");
      } else {
        toast.error(response.message);
      }
    }

    handleDialogCancel();
  }

  return (
    <>
      <ConfirmationDialog
        question="Are you sure you want to update the API rate limit to below 100?"
        description="This will take effect immediately and may reject existing API calls."
        isOpen={isDialogOpen}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
          <Button type="submit" aria-busy={isLoading} disabled={isLoading}>
            {" "}
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
