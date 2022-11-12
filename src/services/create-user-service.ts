import { GoogleAPI } from '@/apis'
import { UsersRepository } from '@/infra/repositories'

export class CreateUserService {
  private readonly googleAPI: GoogleAPI
  private readonly usersRepository: UsersRepository

  constructor () {
    this.usersRepository = new UsersRepository()
    this.googleAPI = new GoogleAPI()
  }

  async execute (token: string): Promise<any> {
    const userData = await this.googleAPI.decodeToken(token)
    await this.usersRepository.create(userData.payload)
  }
}
