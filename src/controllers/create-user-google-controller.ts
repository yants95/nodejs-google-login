import { CreateUserGoogleService } from "@/services/create-user-google-service";

import { Request, Response } from "express";

export class CreateUserGoogleController {
  constructor(private readonly service: CreateUserGoogleService) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      await this.service.execute(String(req.query.code));
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
}
