import { z } from "zod";
import {
  FEEDBACK_MAX_ITEMS,
  FEEDBACK_MAX_LENGTH,
  FEEDBACK_MIN_LENGTH,
} from "@/constants/constants";
import { MANUAL_FEEDBACK_ERRORS } from "@/constants/errors";

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
        message: MANUAL_FEEDBACK_ERRORS.REQUIRED,
        code: z.ZodIssueCode.custom,
      });
    }

    if (lines.length > FEEDBACK_MAX_ITEMS) {
      ctx.addIssue({
        path: ["feedback"],
        message: MANUAL_FEEDBACK_ERRORS.MAX_ITEMS,
        code: z.ZodIssueCode.custom,
      });
    }

    for (const line of lines) {
      if (line.length < FEEDBACK_MIN_LENGTH) {
        ctx.addIssue({
          path: ["feedback"],
          message: MANUAL_FEEDBACK_ERRORS.MIN_LENGTH,
          code: z.ZodIssueCode.custom,
        });
        break;
      }
      if (line.length > FEEDBACK_MAX_LENGTH) {
        ctx.addIssue({
          path: ["feedback"],
          message: MANUAL_FEEDBACK_ERRORS.MAX_LENGTH,
          code: z.ZodIssueCode.custom,
        });
        break;
      }
    }
  });
