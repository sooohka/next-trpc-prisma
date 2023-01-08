import "@/styles/globals.css";
import trpc from "@/server/utils/trpc";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(MyApp);
