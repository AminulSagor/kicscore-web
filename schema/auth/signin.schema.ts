import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
