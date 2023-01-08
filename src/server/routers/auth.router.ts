import { loginSchema } from "@/common/schema/auth";
import config from "@/server/utils/config";
import { deleteJwtCookie, setJwtCookie, tokenExpireAt } from "@/server/utils/cookie";
import jwt from "jsonwebtoken";
import { procedure, router } from "../trpc";

const authRouter = router({
  login: procedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { req, res } = ctx;
    const token = jwt.sign(input, config.jwtSecret, {
      expiresIn: tokenExpireAt,
    });
    return setJwtCookie(req, res, token);
  }),
  logout: procedure.mutation(async ({ ctx }) => {
    const { req, res } = ctx;
    return deleteJwtCookie(req, res);
  }),
});

export default authRouter;
