import { z } from "zod";

const configSchema = z.object({
  jwtSecret: z.string(),
});

const config = configSchema.parse({
  jwtSecret: process.env.JWT_SECRET,
});

export default config;
