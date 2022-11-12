import { CreateUserService } from '@/services'
import { Request, Response } from 'express'

export class CreateUserController {
  private readonly service: CreateUserService

  constructor () {
    this.service = new CreateUserService()
  }

  async handle (req: Request, res: Response): Promise<any> {
    try {
      await this.service.execute(req.body.token)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
    }
  }
}
