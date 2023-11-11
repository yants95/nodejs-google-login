import { randomUUID } from "node:crypto";

import { UsersRepository } from "@/db/pg-user-repository";

import { hash } from "bcryptjs";

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: any): Promise<any> {
    const foundUser = await this.usersRepository.findUserEmail(data.email);
    if (foundUser) throw new Error("User already exists");

    const user = {
      ...data,
      id: randomUUID(),
      password: await hash(data.password, 10),
    };
    await this.usersRepository.save(user);
  }
}
