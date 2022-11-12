import 'dotenv/config'

const nodeEnv = process.env.NODE_ENV
export const dir = nodeEnv === 'dev' ? 'src' : 'dist'

export const env = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURI: process.env.GOOGLE_REDIRECT_URI
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD ?? 'password',
    database: process.env.MYSQL_DATABASE ?? 'some-db'
  }
}
