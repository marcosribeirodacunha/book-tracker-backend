import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.user;

    const showUserUseCase = container.resolve(ShowUserUseCase);
    const user = await showUserUseCase.execute({ id });

    delete user.password;
    res.json(user);
  }
}
