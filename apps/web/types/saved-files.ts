import z from "zod";

const SavedFileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number(),
  rowCount: z.number(),
  extension: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
});

const SavedFilesPagination = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  pages: z.number(),
});

export const SavedFilesResponseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number(),
  message: z.string(),
  data: z
    .object({
      files: z.array(SavedFileSchema),
      pagination: SavedFilesPagination,
    })
    .optional(),
  timestamp: z.string(),
});

export type SavedFilesResponse = z.infer<typeof SavedFilesResponseSchema>;
export type SavedFilesData = NonNullable<SavedFilesResponse["data"]>;
export type SavedFile = z.infer<typeof SavedFileSchema>;
