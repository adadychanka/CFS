import z from "zod";

const FeedbackFileUploadResponseDataSchema = z.object({
  content: z.string(),
  sentiment: z.enum(["positive", "negative", "neutral", "unknown"]),
  confidence: z.number(),
  summary: z.string(),
  userId: z.string(),
  fileId: z.string(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
});

export const FeedbackFileUploadResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z.array(FeedbackFileUploadResponseDataSchema).optional(),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string(),
      }),
    )
    .optional(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
});

export type FeedbackFileUploadResponse = z.infer<
  typeof FeedbackFileUploadResponseSchema
>;
export type FeedbackFileUploadResponseData = NonNullable<
  FeedbackFileUploadResponse["data"]
>;
export type FeedbackFileUploadResponseErrors = NonNullable<
  FeedbackFileUploadResponse["errors"]
>;

export type FileUploadResponse = {
  fileName: string;
  errors: string | null;
  data: FeedbackFileUploadResponse["data"];
  status: number;
};

export type FileUploadServerError = {
  fileName?: string;
  message: string;
};
