import { inject, injectable } from "tsyringe";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
