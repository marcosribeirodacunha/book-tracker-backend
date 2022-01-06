import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Book } from "@modules/books/infra/typeorm/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

interface IRequest {
  id: string;
  title?: string;
  author?: string;
  rate?: number;
}

@injectable()
export class UpdateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ id, title, author, rate }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new AppError("Book not found", 404);

    if (title) book.title = title;
    if (author) book.author = author;

    if (rate) {
      if (book.status === "read") book.rate = this.roundRate(rate);
      else throw new AppError("Cannot update the rate to a non-read book");
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
