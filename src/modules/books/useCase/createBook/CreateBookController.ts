import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBookUseCase } from "./CreateBookUseCase";

export class CreateBookController {
  async handle(req: Request, res: Response): Promise<void> {
    const { title, author } = req.body;
    const userId = req.user.id;

    const createBookUseCase = container.resolve(CreateBookUseCase);
    const book = await createBookUseCase.execute({ title, author, userId });

    res.status(201).json(book);
  }
}
