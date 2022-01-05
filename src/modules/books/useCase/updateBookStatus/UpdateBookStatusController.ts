import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookStatusUseCase } from "./UpdateBookStatusUseCase";

export class UpdateBookStatusController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { rate } = req.body;

    const updateBookStatusUseCase = container.resolve(UpdateBookStatusUseCase);
    const book = await updateBookStatusUseCase.execute({ id, rate });

    res.status(200).json(book);
  }
}
