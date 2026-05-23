import { z } from "zod";

export const adminNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  snippet: z.string().optional(),
  keywords: z.string().min(1, "Keywords are required"),
});

export type AdminNewsFormValues = z.infer<typeof adminNewsSchema>;
