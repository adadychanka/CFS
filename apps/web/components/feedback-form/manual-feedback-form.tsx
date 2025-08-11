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
    defaultValues: { feedback: "" },
  });

  const onSubmit = (data: z.infer<typeof manualFeedbackSchema>) => {
    const feedback = data.feedback
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((item) => ({
        id: Math.random().toString(36).slice(2),
        feedback: item,
      }));

    if (feedback.length) {
      onAddFeedback(feedback);
      form.reset({ feedback: "" });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your feedback here. Each line considered as separate item."
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
