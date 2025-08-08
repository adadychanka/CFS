"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Textarea } from "@repo/ui/components/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";

const FormSchema = z.object({
  feedbacks: z.string().refine(
    (val) => {
      const lines = val
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length >= 10);
      return lines.length > 0;
    },
    {
      message:
        "Please enter at least one valid feedback (min 10 chars per line).",
    },
  ),
});

const ManualFeedbackForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const feedbacks = data.feedbacks
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length >= 10);

    console.log(feedbacks);
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="feedbacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedbacks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your feedbacks here. Each line considered as separate item."
                  className="min-h-[96px] max-h-[300px] overflow-y-auto resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex content-end">
          <Button className="ml-auto">
            <Plus /> Add feedback
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManualFeedbackForm;
