import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export const tokenName = "token";
export const tokenExpireAt = 60 * 60 * 24;
export const setJwtCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string
) => {
  setCookie(tokenName, token, { req, res, maxAge: tokenExpireAt });
};

export const getJwtCookie = (req: NextApiRequest, res: NextApiResponse) => {
  return getCookie(tokenName, { req, res }) as string;
};

export const deleteJwtCookie = (req: NextApiRequest, res: NextApiResponse) => {
  return deleteCookie(tokenName, { req, res })
}