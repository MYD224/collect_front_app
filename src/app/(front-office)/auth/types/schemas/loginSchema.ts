import { z } from "zod";
import { userSchema } from "./userSchema";

export const loginSchema = z.object({
  phone: z.string().min(9),
  password: z.string().min(6),
});

export const loginResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
  otp_code: z.string().length(6, "Le code OTP doit contenir 6 chiffres"),
});

export type TLogin = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
