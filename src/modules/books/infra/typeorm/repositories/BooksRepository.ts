import { getRepository, Repository } from "typeorm";

import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

import { Book } from "../entities/Book";

export class BooksRepository implements IBooksRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = getRepository(Book);
  }

  async create({
    title,
    author,
    status,
    userId,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.repository.create({ title, author, status, userId });
    await this.repository.save(book);
    return book;
  }
}
