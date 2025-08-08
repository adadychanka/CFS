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

const FormSchema = z.object({
  feedbacks: z.string().min(30, {
    message: "Bio must be at least 30 characters.",
  }),
});

const ManualFeedbackForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-6 mb-4">
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
      </form>
    </Form>
  );
};

export default ManualFeedbackForm;
