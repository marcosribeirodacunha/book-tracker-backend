import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { Book } from "@modules/books/infra/typeorm/entities/Book";

import { IBooksRepository } from "../IBooksRepository";

export class BooksRepositoryInMemory implements IBooksRepository {
  private books: Book[] = [];

  async create({
    title,
    author,
    status,
    userId,
  }: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    const dateNow = new Date();
    Object.assign(book, {
      title,
      author,
      status,
      userId,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    this.books.push(book);

    return book;
  }
}
