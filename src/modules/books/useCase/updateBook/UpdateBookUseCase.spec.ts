import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { UpdateBookStatusUseCase } from "../updateBookStatus/UpdateBookStatusUseCase";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;
let updateBookStatusUseCase: UpdateBookStatusUseCase;
let updateBookUseCase: UpdateBookUseCase;

describe("#UpdateBookUseCase", () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
    updateBookStatusUseCase = new UpdateBookStatusUseCase(
      booksRepositoryInMemory
    );
    updateBookUseCase = new UpdateBookUseCase(booksRepositoryInMemory);
  });

  it("should not be able to update a nonexistent book", async () => {
    const { title, author } = factories.book.build();
    const updateData = { id: "not_found_id", title, author };

    await expect(updateBookUseCase.execute(updateData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should be able to update a given book title and author", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    const updateData = {
      id: book.id,
      title: "Updated title",
      author: "New Author",
    };
    const updatedBook = await updateBookUseCase.execute(updateData);

    expect(updatedBook.title).toEqual(updateData.title);
    expect(updatedBook.author).toEqual(updateData.author);
  });

  it("should not be able to update the rate to a book with status other than 'read'", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    const updateData = { id: book.id, rate: 8 };
    await expect(updateBookUseCase.execute(updateData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should be able to update the rate to a book with status 'read'", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    // Update status to read (want_to_read -> reading -> read)
    await updateBookStatusUseCase.execute({ id: book.id });
    await updateBookStatusUseCase.execute({ id: book.id });

    const updateData = { id: book.id, rate: 8 };
    const updatedBook = await updateBookUseCase.execute(updateData);

    expect(updatedBook.status).toBe("read");
    expect(updatedBook.rate).toBe(8);
  });
});
