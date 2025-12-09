import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  phone: z.string(),
  email: z.email(),
  status: z.string(),
  phoneVerifiedAt: z.iso.datetime().nullable(), // matches CarbonImmutable|null
});

export type User = z.infer<typeof userSchema>;