import faker from "faker";
import { Factory } from "fishery";

import { User } from "@modules/account/infra/typeorm/entities/User";

type UserData = Omit<User, "id" | "createdAt" | "updatedAt">;

export const usersFactory = Factory.define<UserData>(() => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
});
