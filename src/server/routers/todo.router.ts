import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoSchema,
} from "@/common/schema";
import prisma from "@/server/utils/prisma";
import { authedProcedure, router } from "../trpc";
import { timer } from "../utils/timer";

const todoRouter = router({
  get: authedProcedure.input(getTodoSchema).query(async ({ input, ctx }) => {
    const { id: userId } = ctx.user;
    const { id } = input;
    const todo = await prisma.todo.findFirstOrThrow({ where: { id, userId } });
    return todo;
  }),
  getAll: authedProcedure.query(async ({ ctx }) => {
    const {
      user: { id },
    } = ctx;
    await timer(3000);
    const todos = await prisma.todo.findMany({ where: { userId: id } });
    return todos;
  }),
  create: authedProcedure
    .input(createTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const { title, content } = input;
      const todo = await prisma.todo.create({
        data: { title, content, userId: id },
      });
      return todo;
    }),
  delete: authedProcedure
    .input(deleteTodoSchema)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      await prisma.todo.findFirstOrThrow({ where: { id } });
      await prisma.todo.delete({ where: { id } });
      return true;
    }),
});

export default todoRouter;
