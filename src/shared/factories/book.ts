import faker from "faker";
import { Factory } from "fishery";

import { Book } from "@modules/books/infra/typeorm/entities/Book";

type BookData = Pick<Book, "title" | "author" | "userId">;

export const booksFactory = Factory.define<BookData>(() => {
  return {
    title: faker.lorem.sentence(),
    author: faker.name.firstName(),
    userId: faker.datatype.uuid(),
  };
});
