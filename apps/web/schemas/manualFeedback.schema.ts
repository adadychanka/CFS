import { z } from "zod";
import {
  FEEDBACK_MAX_ITEMS,
  FEEDBACK_MAX_LENGTH,
  FEEDBACK_MIN_LENGTH,
} from "@/constants/constants";

export const manualFeedbackSchema = z
  .object({
    feedback: z.string(),
  })
  .superRefine((data, ctx) => {
    const lines = data.feedback
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      ctx.addIssue({
        path: ["feedback"],
        message: "Please enter at least one feedback.",
        code: z.ZodIssueCode.custom,
      });
    }

    if (lines.length > FEEDBACK_MAX_ITEMS) {
      ctx.addIssue({
        path: ["feedback"],
        message: `You can only submit up to ${FEEDBACK_MAX_ITEMS} feedback at once.`,
        code: z.ZodIssueCode.custom,
      });
    }

    for (const line of lines) {
      if (line.length < FEEDBACK_MIN_LENGTH) {
        ctx.addIssue({
          path: ["feedback"],
          message: `Each feedback must be at least ${FEEDBACK_MIN_LENGTH} characters.`,
          code: z.ZodIssueCode.custom,
        });
        break;
      }
      if (line.length > FEEDBACK_MAX_LENGTH) {
        ctx.addIssue({
          path: ["feedback"],
          message: `Each feedback must be no longer than ${FEEDBACK_MAX_LENGTH} characters.`,
          code: z.ZodIssueCode.custom,
        });
        break;
      }
    }
  });
