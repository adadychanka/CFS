import z from "zod";

const RateLimitTargetSchema = z.enum(["API", "LOGIN", "UPLOAD", "DOWNLOAD"]);

const RateLimitResponseDataSchema = z.object({
  target: RateLimitTargetSchema,
  limit: z.number(),
});
export const RateLimitResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z.array(RateLimitResponseDataSchema).optional(),
  timestamp: z.string(),
});
export const RateLimitPatchResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: RateLimitResponseDataSchema,
  timestamp: z.string(),
});

export type RateLimitResponse = z.infer<typeof RateLimitResponseSchema>;
export type RateLimitResponseData = z.infer<typeof RateLimitResponseDataSchema>;
export type RateLimitTarget = z.infer<typeof RateLimitTargetSchema>;
export type RateLimitPatchResponse = z.infer<
  typeof RateLimitPatchResponseSchema
>;
