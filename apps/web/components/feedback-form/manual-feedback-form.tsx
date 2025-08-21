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
import { Plus, SquareTerminal } from "lucide-react";
import { PreviewFeedback } from "@/components/feedback-form/manual-feedback-tab";
import { manualFeedbackSchema } from "@/schemas/manual-feedback.schema";
import { memo } from "react";
import { TEST_TEXTAREA_TEXT } from "@/constants/constants";
import { normalizeFeedbackEntriesFromInput } from "@/utils/normalize-feedback-entries-from-input";

type Props = {
  onAddFeedback: (feedback: PreviewFeedback[]) => void;
};

const ManualFeedbackForm = ({ onAddFeedback }: Props) => {
  const form = useForm<z.infer<typeof manualFeedbackSchema>>({
    resolver: zodResolver(manualFeedbackSchema),
    defaultValues: { feedback: "" },
  });

  const onSubmit = (data: z.infer<typeof manualFeedbackSchema>) => {
    const normalizedFeedback = normalizeFeedbackEntriesFromInput(data.feedback);

    if (normalizedFeedback.length) {
      onAddFeedback(normalizedFeedback);
      form.reset({ feedback: "" });
    }
  };

  // NOTE: ONLY FOR DEV TESTING
  const handleQuickFill = () => {
    const randomTwo = TEST_TEXTAREA_TEXT.sort(() => 0.5 - Math.random()).slice(
      0,
      2,
    );

    const combined = randomTwo.join("\n");
    form.setValue("feedback", combined);
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
                  placeholder="Paste your feedback here. Each line is considered a separate item."
                  className="min-h-[96px] max-h-[192px] overflow-y-auto resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleQuickFill}>
            <SquareTerminal />
            Quick fill
          </Button>
          <Button type="submit">
            <Plus /> Add feedback
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default memo(ManualFeedbackForm);
