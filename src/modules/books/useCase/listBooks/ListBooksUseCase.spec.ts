import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { UpdateBookStatusUseCase } from "../updateBookStatus/UpdateBookStatusUseCase";
import { ListBooksUseCase } from "./ListBooksUseCase";

let booksRepositoryInMemory: BooksRepositoryInMemory;
let createBookUseCase: CreateBookUseCase;
let updateBookStatusUseCase: UpdateBookStatusUseCase;
let listBooksUseCase: ListBooksUseCase;

describe("#ListBooksUseCase", () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
    updateBookStatusUseCase = new UpdateBookStatusUseCase(
      booksRepositoryInMemory
    );
    listBooksUseCase = new ListBooksUseCase(booksRepositoryInMemory);
  });

  it("should be able to list all books to an user", async () => {
    const userId = "id_any_status";

    const booksData = factories.book.buildList(4, { userId });
    await Promise.all(booksData.map((data) => createBookUseCase.execute(data)));

    const books = await listBooksUseCase.execute({ userId });

    expect(books).toHaveLength(4);
    expect(books).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: booksData[1].title }),
      ])
    );
  });

  it("should not be able to list all books with a nonexistent status", async () => {
    const userId = "id_nonexistent_status";

    const booksData = factories.book.buildList(4, { userId });
    await Promise.all(booksData.map((data) => createBookUseCase.execute(data)));

    await expect(
      listBooksUseCase.execute({ userId, status: "not_exists" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to list all books to an user by status", async () => {
    const userId = "id_correct_status";

    const booksData = factories.book.buildList(4, { userId });
    const createdBooks = await Promise.all(
      booksData.map((data) => createBookUseCase.execute(data))
    );

    const bookIdToChangeStatus = createdBooks[2].id;
    await updateBookStatusUseCase.execute({ id: bookIdToChangeStatus });

    const books = await listBooksUseCase.execute({ userId, status: "reading" });

    expect(books).toHaveLength(1);
    expect(books[0].id).toEqual(bookIdToChangeStatus);
  });
});
