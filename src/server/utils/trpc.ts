import { AppRouter } from "@/server/routers/app.router";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superJSON from "superjson";

const getBaseUrl = () => {
  return "http://localhost:3000";
};

const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         **/
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ];

    const headers = ctx?.req?.headers ? { ...ctx.req.headers } : {};
    return {
      links,
      headers() {
        return headers;
      },
      transformer: superJSON,
      queryClient: new QueryClient({
        defaultOptions: { queries: { staleTime: 60000 } },
      }),
    };
  },
  ssr: false,
});

export default trpc;
