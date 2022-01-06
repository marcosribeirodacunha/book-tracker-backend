import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListBooksUseCase } from "./ListBooksUseCase";

export class ListBooksController {
  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const status = req.query.status as string;

    const listBooksUseCase = container.resolve(ListBooksUseCase);
    const books = await listBooksUseCase.execute({ userId, status });

    res.json(books);
  }
}
