import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

//@ts-ignore
if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
