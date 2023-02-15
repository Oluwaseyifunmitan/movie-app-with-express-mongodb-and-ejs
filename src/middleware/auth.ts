import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { extractUser } from "../utils/utility";

export const Auth = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let cookie = req.headers.cookie?.split("=")[1];
  let user = await extractUser(cookie);
  if (user) {
    req.user = user;
    next();
  } else {
    req.user = null;
    return res.redirect("/user/login");
  }
};
