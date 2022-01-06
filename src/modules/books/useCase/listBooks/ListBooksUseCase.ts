import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Book } from "@modules/books/infra/typeorm/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

interface IRequest {
  userId: string;
  status?: string;
}

@injectable()
export class ListBooksUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ userId, status }: IRequest): Promise<Book[]> {
    if (status && !this.isValidStatus(status))
      throw new AppError("Invalid status");

    const books = await this.booksRepository.findByUserId(userId, status);
    return books;
  }

  private isValidStatus(status: string) {
    const VALID_STATUS = ["want_to_read", "reading", "read"];
    return VALID_STATUS.includes(status.toLowerCase());
  }
}
