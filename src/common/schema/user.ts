import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
