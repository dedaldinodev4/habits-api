import { Role } from "@prisma/client";
import { z } from "zod";

export const IUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role).optional(),
  created_at: z.date(),
  updated_at: z.date(),
}) 

export const ICurrentUser = z.object({
  user: IUser,
  token: z.string()
})