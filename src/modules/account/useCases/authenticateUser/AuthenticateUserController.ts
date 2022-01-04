import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const data = await authenticateUserUseCase.execute({ email, password });

    delete data.user.password;
    res.json(data);
  }
}
