import { inject, injectable } from "tsyringe";

import { Book } from "@modules/books/infra/typeorm/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

interface IRequest {
  title: string;
  author: string;
  userId: string;
}

@injectable()
export class CreateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ title, author, userId }: IRequest): Promise<Book> {
    const book = await this.booksRepository.create({
      title,
      author,
      userId,
      status: "want_to_read",
    });

    return book;
  }
}
