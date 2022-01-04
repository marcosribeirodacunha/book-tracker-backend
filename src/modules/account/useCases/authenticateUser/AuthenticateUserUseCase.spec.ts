import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("#AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should not be able to authenticate a user with invalid email", async () => {
    const { email, password } = factories.user.build();

    await expect(
      authenticateUserUseCase.execute({ email, password })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with invalid password", async () => {
    const userData = factories.user.build();
    const user = await createUserUseCase.execute(userData);

    const credentials = { email: user.email, password: "invalid_password" };
    await expect(
      authenticateUserUseCase.execute(credentials)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate user with valid credentials", async () => {
    const userData = factories.user.build();
    await createUserUseCase.execute(userData);

    const credentials = { email: userData.email, password: userData.password };
    const response = await authenticateUserUseCase.execute(credentials);

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("user");
  });
});
