import { getJwtCookie } from "@/server/utils/cookie";
import prisma from "@/server/utils/prisma";
import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import { Context } from "./context";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@/server/utils/config";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const router = t.router;

export const procedure = t.procedure;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { req, res } = ctx;
  const token = getJwtCookie(req, res);

  let id: number;
  try {
    const { id: jwtId } = jwt.verify(token, config.jwtSecret) as JwtPayload;
    id = jwtId;
  } catch (e: any) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: e?.message });
  }
  const user = await prisma.user.findFirstOrThrow({ where: { id } });
  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const authedProcedure = t.procedure.use(isAuthed);
