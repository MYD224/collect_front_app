import { z } from "zod";
import { userSchema } from "./user.schema";

export const registerSchema = z.object({
  fullname: z.string().min(2),
  phone: z.string().min(8), // ajustable
  email: z.email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

export type RegisterCommand = z.infer<typeof registerSchema>;

export const registerResponseSchema = z.object({
  message: z.string(),
  user: userSchema,
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;
