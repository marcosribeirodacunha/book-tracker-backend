import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

interface IRequest {
  id: string;
}

@injectable()
export class DeleteBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new AppError("Book not found", 404);

    await this.booksRepository.deleteById(id);
  }
}
