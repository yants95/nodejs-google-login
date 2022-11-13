import { RefreshTokenService } from '@/services'

import { Request, Response } from 'express'

export class RefreshTokenController {
  private readonly service: RefreshTokenService

  constructor () {
    this.service = new RefreshTokenService()
  }

  async handle (req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = await this.service.execute()
      res.status(200).json({ refresh_token: refreshToken })
    } catch (error) {
      console.log(error)
    }
  }
}
