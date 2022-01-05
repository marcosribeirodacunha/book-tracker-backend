import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { UpdateBookStatusUseCase } from "./UpdateBookStatusUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;
let updateBookStatusUseCase: UpdateBookStatusUseCase;

describe("#UpdateBookStatusUseCase", () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
    updateBookStatusUseCase = new UpdateBookStatusUseCase(
      booksRepositoryInMemory
    );
  });

  it("should not be able to update status to a nonexistent book", async () => {
    const bookData = factories.book.build();
    await createBookUseCase.execute(bookData);

    await expect(
      updateBookStatusUseCase.execute({ id: "not_found_id" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able change book status from 'want_to_read' to 'reading'", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    const bookUpdated = await updateBookStatusUseCase.execute({ id: book.id });

    expect(bookUpdated.status).toEqual("reading");
  });

  it("should be able change book status from 'reading' to 'read'", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    await updateBookStatusUseCase.execute({ id: book.id });
    const bookUpdated = await updateBookStatusUseCase.execute({ id: book.id });

    expect(bookUpdated).toHaveProperty("finishedAt");
    expect(bookUpdated.status).toEqual("read");
    expect(bookUpdated.rate).toEqual(undefined);
  });

  it("should be able to rate a book when status is changing to 'read'", async () => {
    const bookData = factories.book.build();
    const book = await createBookUseCase.execute(bookData);

    await updateBookStatusUseCase.execute({ id: book.id });
    const updateData = { id: book.id, rate: 7 };
    const bookUpdated = await updateBookStatusUseCase.execute(updateData);

    expect(bookUpdated.status).toEqual("read");
    expect(bookUpdated.rate).toEqual(updateData.rate);
  });
});
