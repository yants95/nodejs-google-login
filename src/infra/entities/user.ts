import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'created_at' })
  createdAt!: Date

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ name: 'google_id' })
  googleId!: string
}
