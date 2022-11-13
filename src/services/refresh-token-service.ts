import { GoogleAPI } from '@/apis'

export class RefreshTokenService {
  private readonly googleAPI: GoogleAPI

  constructor () {
    this.googleAPI = new GoogleAPI()
  }

  async execute (): Promise<any> {
    return await this.googleAPI.refreshToken()
  }
}
