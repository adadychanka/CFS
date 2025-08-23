import z from "zod";

const GroupedFeedbackDataItemsSchema = z.object({
  id: z.string(),
  content: z.string(),
  sentiment: z.string(),
});

const GroupedFeedbackDataSchema = z.object({
  summary: z.string(),
  count: z.number(),
  items: z.array(GroupedFeedbackDataItemsSchema),
});

const GroupedFeedbackErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
});

export const GroupedFeedbackSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z.array(GroupedFeedbackDataSchema),
  path: z.string().optional(),
  errors: z.array(GroupedFeedbackErrorSchema).optional(),
  timestamp: z.string(),
});

export type GroupedFeedbackResponse = z.infer<typeof GroupedFeedbackSchema>;
export type GroupedFeedbackDataItems = z.infer<
  typeof GroupedFeedbackDataItemsSchema
>;
