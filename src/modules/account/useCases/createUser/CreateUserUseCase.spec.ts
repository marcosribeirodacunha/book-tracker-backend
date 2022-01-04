import { compare } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { factories } from "@shared/factories";

import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("#CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const userData = factories.user.build();
    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with an existent email", async () => {
    const userData = factories.user.build();
    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should be able to hash user password before save", async () => {
    const userData = factories.user.build();
    const user = await createUserUseCase.execute(userData);

    const isPasswordHashed = await compare(userData.password, user.password);
    expect(isPasswordHashed).toBeTruthy();
  });
});
