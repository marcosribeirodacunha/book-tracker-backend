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
    id,
    title,
    author,
    status,
    userId,
    finishedAt,
    rate,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.repository.create({
      id,
      title,
      author,
      status,
      userId,
      finishedAt,
      rate,
    });
    await this.repository.save(book);
    return book;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.repository.findOne(id);
    return book;
  }
}
