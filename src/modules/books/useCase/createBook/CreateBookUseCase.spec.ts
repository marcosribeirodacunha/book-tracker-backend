import { factories } from "@shared/factories";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "./CreateBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;

describe("#CreateBookUseCase", () => {
  booksRepositoryInMemory = new BooksRepositoryInMemory();
  createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);

  it("should be able to create a book with status 'want_to_read' by default", async () => {
    const bookData = factories.book.build();

    const book = await createBookUseCase.execute(bookData);

    expect(book).toHaveProperty("id");
    expect(book).toHaveProperty("status");
    expect(book.status).toEqual("want_to_read");
  });
});
