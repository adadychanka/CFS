import z from "zod";

export type AdminMetrics = {
  title: string;
  count: number | string;
  footerText: string;
};

export const AdminMetricsSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z
    .object({
      uploads: z.number(),
      apiUsage: z.number(),
      errorRates: z.number(),
    })
    .optional(),
  timestamp: z.string(),
  path: z.string(),
});

export type AdminMetricsResponse = z.infer<typeof AdminMetricsSchema>;
export type AdminMetricsResponseData = NonNullable<
  AdminMetricsResponse["data"]
>;

export type AdminMetricsClientResponse = {
  success: boolean;
  message: string;
  data?: AdminMetrics[];
};
