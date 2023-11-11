import { CreateUserService } from "@/services";

import { Request, Response } from "express";

export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      await this.service.execute(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
}
