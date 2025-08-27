import z from "zod";

const RateLimitResponseDataSchema = z.object({
  target: z.string(),
  limit: z.number(),
});
export const RateLimitResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z.array(RateLimitResponseDataSchema).optional(),
  timestamp: z.string(),
});

export type RateLimitResponse = z.infer<typeof RateLimitResponseSchema>;
export type RateLimitResponseData = z.infer<typeof RateLimitResponseDataSchema>;
