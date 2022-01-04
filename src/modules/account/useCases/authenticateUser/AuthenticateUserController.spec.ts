import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#AuthenticateUserController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a session to an existent user", async () => {
    const userData = factories.user.build();
    await request(app).post("/users").send(userData);

    const credentials = { email: userData.email, password: userData.password };
    const response = await request(app).post("/session").send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).not.toHaveProperty("password");
  });
});
