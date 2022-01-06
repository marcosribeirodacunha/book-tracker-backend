import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

export class DeleteBookController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);
    await deleteBookUseCase.execute({ id });

    res.status(204).send();
  }
}
