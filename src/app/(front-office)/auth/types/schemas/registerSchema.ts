
import { z } from "zod";
import { userSchema } from "./userSchema";

export const registerSchema = z.object({
  fullname: z.string().min(2),
  phone: z.string().min(9), // ajustable
  email: z.email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

export const registerResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export const verifyPhoneSchema = z.object({
  user_id: z.string().optional(),
  otp_code: z.string().length(6, "Le code OTP doit contenir 6 chiffres"),
});

export const verifyPhoneResponseSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
  user: userSchema,
});

export type TRegister = z.infer<typeof registerSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type TVerifyPhone = z.infer<typeof verifyPhoneSchema>;
export type VerifyPhoneResponse = z.infer<typeof verifyPhoneResponseSchema>;