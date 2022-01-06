import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

export class UpdateBookController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, author, rate } = req.body;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);
    const book = await updateBookUseCase.execute({ id, title, author, rate });

    res.status(200).json(book);
  }
}
