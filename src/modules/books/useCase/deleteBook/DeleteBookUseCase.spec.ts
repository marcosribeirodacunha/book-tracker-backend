import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;
let deleteBookUseCase: DeleteBookUseCase;

describe("#DeleteBookUseCase", () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
    deleteBookUseCase = new DeleteBookUseCase(booksRepositoryInMemory);
  });

  it("should not be able to delete a nonexistent book", async () => {
    await expect(
      deleteBookUseCase.execute({ id: "not_found_id" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to delete the given book", async () => {
    const bookData = factories.book.build();
    const { id, userId } = await createBookUseCase.execute(bookData);

    await deleteBookUseCase.execute({ id });
    const books = await booksRepositoryInMemory.findByUserId(userId);

    expect(books).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id })])
    );
  });
});
