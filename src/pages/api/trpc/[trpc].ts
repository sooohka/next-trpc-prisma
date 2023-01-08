import { createContext } from "@/server/context";
import appRouter from "@/server/routers/app.router";
import * as trpcNext from "@trpc/server/adapters/next";

const handler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export default handler;
