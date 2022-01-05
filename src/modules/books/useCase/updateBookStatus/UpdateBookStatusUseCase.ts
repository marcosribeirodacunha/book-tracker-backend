import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Book } from "@modules/books/infra/typeorm/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

interface IRequest {
  id: string;
  rate?: number;
}

@injectable()
export class UpdateBookStatusUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ id, rate }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new AppError("Book not found", 404);

    if (book.status === "want_to_read") book.status = "reading";
    else {
      book.status = "read";
      book.finishedAt = new Date();
      if (rate) book.rate = this.roundRate(rate);
    }

    const updatedBook = await this.booksRepository.create(book);
    return updatedBook;
  }

  private roundRate(rate: number) {
    if (rate < 0) return 0;
    if (rate > 10) return 10;
    return Math.round(rate);
  }
}
