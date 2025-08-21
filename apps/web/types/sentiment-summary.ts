import z from "zod";

const SentimentSummaryDataSchema = z.object({
  sentiment: z.string(),
  count: z.number(),
  percentage: z.number(),
});

const SentimentSummaryErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
});

export const SentimentSummaryResponseSchema = z.object({
  summary: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z.array(SentimentSummaryDataSchema).optional(),
  errors: z.array(SentimentSummaryErrorSchema).optional(),
  timestamp: z.string().optional(),
});

export type SentimentSummaryResponse = z.infer<
  typeof SentimentSummaryResponseSchema
>;
