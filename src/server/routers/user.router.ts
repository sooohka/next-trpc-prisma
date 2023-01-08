import prisma from "@/server/utils/prisma";
import { authedProcedure, procedure, router } from "../trpc";

import { createUserSchema, updateUserSchema } from "@/common/schema";

const userRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    const {
      user: { id },
    } = ctx;

    const user = await prisma.user.findFirstOrThrow({ where: { id } });
    return user;
  }),
  create: procedure.input(createUserSchema).mutation(async ({ input }) => {
    const { name, email } = input;
    const user = await prisma.user.create({ data: { name, email } });
    return user;
  }),
  update: authedProcedure.input(updateUserSchema).mutation(async () => {
    return {};
  }),
  delete: authedProcedure.mutation(async ({ ctx }) => {
    ctx;
    // await prisma.user.delete({ where: { id } });
    return {};
  }),
});

export default userRouter;
