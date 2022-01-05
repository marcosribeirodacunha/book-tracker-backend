import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#CreateBookController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able add a new book to the 'want to read' list", async () => {
    const userData = factories.user.build();
    await request(app).post("/users").send(userData);

    const credentials = { email: userData.email, password: userData.password };
    const responseToken = await request(app).post("/session").send(credentials);
    const { token } = responseToken.body;

    const bookData = factories.book.build();
    const response = await request(app)
      .post("/books")
      .set({ Authorization: `Bearer ${token}` })
      .send(bookData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.status).toEqual("want_to_read");
  });
});
