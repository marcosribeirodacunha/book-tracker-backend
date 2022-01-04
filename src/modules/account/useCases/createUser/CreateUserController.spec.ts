import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#CreateUserController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const userData = factories.user.build();
    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
  });
});
