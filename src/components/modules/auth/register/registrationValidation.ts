import { z } from "zod";

export const registrationValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be 3 and 20 characters")
    .max(20, "Name must be 3 and 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 8 characters")
});
