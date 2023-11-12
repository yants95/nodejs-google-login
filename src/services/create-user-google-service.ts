import { randomUUID } from "node:crypto";

import { GoogleAPI } from "@/apis";
import { UsersRepository } from "@/db/pg-user-repository";

import { hash } from "bcryptjs";

export class CreateUserGoogleService {
  constructor(private readonly googleAPI: GoogleAPI) {}

  async execute(code: string): Promise<any> {
    const googleData = await this.googleAPI.getToken(code);
    const googleUser = await this.googleAPI.getGoogleUser(code);
  }
}
