import { z } from "zod";

export const adminNewsEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  snippet: z.string().optional(),
  keywords: z.string().min(1, "Keywords are required"),
});

export type AdminNewsEditFormValues = z.infer<typeof adminNewsEditSchema>;
