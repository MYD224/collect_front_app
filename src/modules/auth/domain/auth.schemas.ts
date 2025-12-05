import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Au moins 6 caractères'),
});

export type LoginCommand = z.infer<typeof loginSchema>;

export const authTokenSchema = z.object({
  token: z.string(),
});

export type AuthToken = z.infer<typeof authTokenSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
