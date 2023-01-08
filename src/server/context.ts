import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export type Context = {} & CreateNextContextOptions;

export const createContext = async (
  ctx: CreateNextContextOptions
): Promise<Context> => {
  return { ...ctx };
};
