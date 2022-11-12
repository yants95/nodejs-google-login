import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/mysql-connection'
import { Repository } from 'typeorm'

export class UsersRepository {
  private readonly model: Repository<UserEntity>

  constructor () {
    this.model = mysqlSource.getRepository(UserEntity)
  }

  async findByGoogleId (googleId: string): Promise<UserEntity | null> {
    return this.model.findOne({
      where: { googleId }
    })
  }
}
