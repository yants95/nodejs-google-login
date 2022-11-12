import { prisma } from '@/db'

export class UsersRepository {
  private readonly user

  constructor () {
    this.user = prisma.user
  }

  async create (params: any): Promise<any> {
    console.log('PARAMS', params)
    const user = await this.user.create({
      data: {
        name: params.name,
        email: params.email,
        picture_url: params.picture
      }
    })
    console.log('user', user)
    return user
  }
}
