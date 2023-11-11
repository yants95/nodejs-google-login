import { UserEntity } from "@/db/user-entity";
import { db } from "@/pg-connection";

import { Repository } from "typeorm";

export class UsersRepository {
  private readonly model: Repository<UserEntity>;

  constructor() {
    this.model = db.getRepository(UserEntity);
  }

  async save(user: any): Promise<void> {
    await this.model.save(user);
  }

  async findUserEmail(email: string): Promise<UserEntity | null> {
    return this.model.findOne({ where: { email } });
  }
}
