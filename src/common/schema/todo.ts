import { z } from "zod";

export const getTodoSchema = z.object({ id: z.number() });

export type GetTodoSchema = z.infer<typeof getTodoSchema>;

export const createTodoSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export const deleteTodoSchema = z.object({
  id: z.number(),
});
export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>;
