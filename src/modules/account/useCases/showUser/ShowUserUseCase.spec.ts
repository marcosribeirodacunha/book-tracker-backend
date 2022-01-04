import { factories } from "@shared/factories";

import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserUseCase } from "./ShowUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let showUserUseCase: ShowUserUseCase;

describe("#ShowUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserUseCase = new ShowUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to show user info", async () => {
    const userData = factories.user.build();
    const createdUser = await createUserUseCase.execute(userData);

    const user = await showUserUseCase.execute({ id: createdUser.id });

    expect(user).toHaveProperty("id");
  });
});
