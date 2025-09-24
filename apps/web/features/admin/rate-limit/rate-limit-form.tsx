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
import { useEffect, useMemo, useState } from "react";
import type { RateLimitResponseData } from "@/types/rate-limit";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { ConfirmationDialog } from "@/components/dialogs/confirmation-dialog";
import { getRateLimits } from "@/lib/get-rate-limits";
import { mutate } from "swr";

const FormSchema = z.object({
  upload: z.coerce
    .number()
    .min(1, "Rate limit must not be less than 1")
    .max(1000, "Rate limit must not be more than 1000"),
  download: z.coerce
    .number()
    .min(1, "Rate limit must not be less than 1")
    .max(1000, "Rate limit must not be more than 1000"),
  api: z.coerce
    .number()
    .min(1, "Rate limit must not be less than 1")
    .max(1000, "Rate limit must not be more than 1000"),
  login: z.coerce
    .number()
    .min(1, "Rate limit must not be less than 1")
    .max(1000, "Rate limit must not be more than 1000"),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  defaultLimits: RateLimitResponseData[];
};

export function RateLimitForm({ defaultLimits }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ratesLessThan100, setRatesLessThan100] = useState<string[]>([]);
  const [changedRateLimits, setChangedRateLimits] = useState<
    RateLimitResponseData[]
  >([]);

  const rateLimits = getRateLimits(defaultLimits);
  const defaultRateLimits = useMemo(
    () => ({
      upload: rateLimits.uploadRate,
      download: rateLimits.downloadRate,
      api: rateLimits.apiRate,
      login: rateLimits.loginRate,
    }),
    [rateLimits],
  );

  const { watch, ...form } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultRateLimits,
    },
  });

  const watchValues = watch();

  useEffect(() => {
    const changes: RateLimitResponseData[] = [];

    const fieldToTarget = {
      upload: "UPLOAD" as const,
      download: "DOWNLOAD" as const,
      api: "API" as const,
      login: "LOGIN" as const,
    };

    Object.entries(fieldToTarget).forEach(([field, target]) => {
      const currentValue = Number(watchValues[field as keyof FormData]);
      const originalValue = Number(defaultRateLimits[field as keyof FormData]);

      if (currentValue !== originalValue) {
        changes.push({
          limit: currentValue,
          target: target,
        });
      } else {
        setChangedRateLimits((previousLimits) => {
          return previousLimits.filter((filter) => filter.target != target);
        });
      }
    });

    setChangedRateLimits(changes);
    // eslint-disable-next-line
  }, [
    watchValues.upload,
    watchValues.download,
    watchValues.api,
    watchValues.login,
    defaultRateLimits.upload,
    defaultRateLimits.download,
    defaultRateLimits.api,
    defaultRateLimits.login,
  ]);

  async function submitChanges(rateLimitsToSubmit: RateLimitResponseData[]) {
    const response = await submitRateLimit(rateLimitsToSubmit);

    if (response.success) {
      toast.success("Successfully updated!");
    } else {
      toast.error(response.message);
    }

    mutate("/api/admins/rate-limit");
    setChangedRateLimits([]);
  }

  async function onSubmit(data: FormData) {
    if (changedRateLimits.length === 0) {
      toast.info("No changes to submit");
      return;
    }

    setIsLoading(true);

    const ratesToCheck = ["upload", "download", "api", "login"] as const;
    const under100 = ratesToCheck.filter((key) => {
      const hasChanged = changedRateLimits.some((change) => {
        const fieldToTarget = {
          upload: "UPLOAD",
          download: "DOWNLOAD",
          api: "API",
          login: "LOGIN",
        };
        return fieldToTarget[key] === change.target;
      });
      return hasChanged && data[key] < 100;
    });

    if (under100.length > 0) {
      setRatesLessThan100([...under100]);
      setIsDialogOpen(true);
    } else {
      await submitChanges(changedRateLimits);
    }

    setIsLoading(false);
  }

  function handleDialogCancel() {
    setIsDialogOpen(false);
  }

  async function handleDialogConfirm() {
    await submitChanges(changedRateLimits);
    handleDialogCancel();
  }

  return (
    <>
      <ConfirmationDialog
        question={`Are you sure you want to update the ${ratesLessThan100.map((rateLimit) => " " + rateLimit.toUpperCase())} rate limit${ratesLessThan100.length > 1 ? "s" : ""} to below 100?`}
        description={`This will take effect immediately and may reject existing ${ratesLessThan100.map((rateLimit) => " " + rateLimit.toUpperCase())} call${ratesLessThan100.length > 1 ? "s" : ""}.`}
        isOpen={isDialogOpen}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />
      <Form {...form} watch={watch}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="api"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex gap-1">
                    <TooltipWrapper text="Controls how often site users can call the API per hour.">
                      <FormLabel className="words-wrap">
                        Rate limit for <strong>api calls</strong>:
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
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex gap-1">
                    <TooltipWrapper text="Controls how often site users can attempt to login per hour.">
                      <FormLabel className="words-wrap">
                        Rate limit for <strong>login attempts</strong>:
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
          <FormField
            control={form.control}
            name="download"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex gap-1">
                    <TooltipWrapper text="Controls how often site users can download files per hour.">
                      <FormLabel className="words-wrap">
                        Rate limit for <strong>downloads</strong>:
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
          <FormField
            control={form.control}
            name="upload"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex gap-1">
                    <TooltipWrapper text="Controls how often site users can upload files per hour.">
                      <FormLabel className="words-wrap">
                        Rate limit for <strong>uploads</strong>:
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
          <Button
            type="submit"
            disabled={isLoading || changedRateLimits.length === 0}
          >
            {isLoading
              ? "Updating..."
              : `Update ${changedRateLimits.length > 0 ? `(${changedRateLimits.length} changed)` : ""}`}
          </Button>
        </form>
      </Form>
    </>
  );
}
