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
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { manualFeedbackSchema } from "@/schemas/manualFeedback.schema";

type Props = {
  onAddFeedback: (feedbacks: PreviewFeedback[]) => void;
};

const ManualFeedbackForm = ({ onAddFeedback }: Props) => {
  const form = useForm<z.infer<typeof manualFeedbackSchema>>({
    resolver: zodResolver(manualFeedbackSchema),
    defaultValues: { feedbacks: "" },
  });

  const onSubmit = (data: z.infer<typeof manualFeedbackSchema>) => {
    const feedbacks = data.feedbacks
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((item) => ({
        id: Math.random().toString(36).slice(2),
        feedback: item,
      }));

    if (feedbacks.length) {
      onAddFeedback(feedbacks);
      form.reset({ feedbacks: "" });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="feedbacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedbacks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your feedbacks here. Each line is considered a separate item."
                  className="min-h-[96px] max-h-[300px] overflow-y-auto resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex content-end">
          <Button className="ml-auto" type="submit">
            <Plus /> Add feedback
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManualFeedbackForm;
