import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { Book } from "@modules/books/infra/typeorm/entities/Book";

import { IBooksRepository } from "../IBooksRepository";

export class BooksRepositoryInMemory implements IBooksRepository {
  private books: Book[] = [];

  async create({
    id,
    title,
    author,
    status,
    userId,
    finishedAt,
    rate,
  }: ICreateBookDTO): Promise<Book> {
    const data = { title, author, status };
    const dateNow = new Date();

    if (id) {
      const book = this.books.find((book) => book.id === id);
      const index = this.books.indexOf(book);

      const updateBookData = { ...data, finishedAt, rate, updatedAt: dateNow };
      Object.assign(book, updateBookData);
      this.books.splice(index, 1, book);

      return book;
    }

    const book = new Book();
    Object.assign(book, {
      ...data,
      userId,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    this.books.push(book);

    return book;
  }

  async findById(id: string): Promise<Book> {
    return this.books.find((book) => book.id === id);
  }
}
