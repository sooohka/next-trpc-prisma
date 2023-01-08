import { router } from "@/server/trpc";
import authRouter from "./auth.router";
import todoRouter from "./todo.router";
import userRouter from "./user.router";

const appRouter = router({
  users: userRouter,
  todos: todoRouter,
  auth:authRouter
});

export default appRouter;
export type AppRouter = typeof appRouter;
