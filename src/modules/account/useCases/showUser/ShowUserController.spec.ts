import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { factories } from "@shared/factories";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("#ShowUserController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to show the authenticated user info", async () => {
    const userData = factories.user.build();
    await request(app).post("/users").send(userData);

    const credentials = { email: userData.email, password: userData.password };
    const responseToken = await request(app).post("/session").send(credentials);
    const { token } = responseToken.body;

    const response = await request(app)
      .get("/users/me")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.email).toEqual(userData.email);
  });
});
