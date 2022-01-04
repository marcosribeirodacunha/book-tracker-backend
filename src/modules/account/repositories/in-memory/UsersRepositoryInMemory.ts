import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const dateNow = new Date();
    Object.assign(user, {
      name,
      email,
      password,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
}
