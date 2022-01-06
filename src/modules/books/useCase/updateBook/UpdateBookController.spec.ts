import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#UpdateBookController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update book data successfully", async () => {
    const userData = factories.user.build();
    await request(app).post("/users").send(userData);

    const credentials = { email: userData.email, password: userData.password };
    const responseToken = await request(app).post("/session").send(credentials);

    const { token } = responseToken.body;
    const headers = { Authorization: `Bearer ${token}` };

    const bookData = factories.book.build();
    const { body: book } = await request(app)
      .post("/books")
      .set(headers)
      .send(bookData);

    const updateBookData = factories.book.build();
    const response = await request(app)
      .patch(`/books/${book.id}`)
      .set(headers)
      .send(updateBookData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updateBookData.title);
    expect(response.body.author).not.toBe(book.title);
  });
});
