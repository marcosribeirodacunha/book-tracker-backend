import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");
  if (!token) throw new AppError("Token malformed", 401);

  try {
    const { sub: userId } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User does not exists", 401);

    req.user = { id: user.id };
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
