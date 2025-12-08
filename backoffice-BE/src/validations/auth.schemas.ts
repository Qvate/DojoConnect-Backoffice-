// Use zod for schema validation
import { z } from "zod";
import { Role, StripePlans } from "../constants/enums";

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().nonempty(),
  fcmToken: z.string().trim().optional().nullable(),
});

export const RegisterUserSchema = z.object({
  name: z.string().trim().nonempty(),

  fullName: z.string().trim().nonempty(),

  email: z.string().trim().email().nonempty(),

  password: z.string().trim().nonempty(),

  role: z.nativeEnum(Role),

  referredBy: z.string().trim().optional().default(""),

  plan: z.nativeEnum(StripePlans).optional().default(StripePlans.Trial),
  paymentMethod: z.string().trim().nonempty(),

  dojoName: z.string().trim().nonempty(),
  dojoTag: z.string().trim().nonempty(),
  dojoTagline: z.string().trim().nonempty(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
