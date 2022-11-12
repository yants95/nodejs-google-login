import { env, dir } from './config'
import { DataSource } from 'typeorm'

export const mysqlSource = new DataSource({
  type: 'mysql',
  host: env.mysql.host,
  port: env.mysql.port,
  username: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database,
  migrations: [`./${dir}/infra/migrations/*.{js,ts}`],
  entities: [`./${dir}/infra/entities/*.{js,ts}`],
  synchronize: false
})
