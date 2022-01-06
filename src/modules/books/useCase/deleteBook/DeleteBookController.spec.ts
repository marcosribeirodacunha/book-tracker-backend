import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#DeleteBookController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to delete the given book", async () => {
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

    const response = await request(app)
      .delete(`/books/${book.id}`)
      .set(headers);

    expect(response.status).toBe(204);
  });
});
