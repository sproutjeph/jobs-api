import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { UnathuenticatedError } from "../errors";
import config from "../config/config";
interface IUser {
  user: {
    userId: string;
    name: string;
  };
}

async function auth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnathuenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload: any = Jwt.verify(token, config.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnathuenticatedError("Authentication invalid");
  }
}

export default auth;
