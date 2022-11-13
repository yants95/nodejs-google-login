import { GoogleAPI } from '@/apis'
import { CreateUserController, RefreshTokenController } from '@/controllers'
import express, { json } from 'express'

const app = express()
const google = new GoogleAPI()
const createUserController = new CreateUserController()
const refreshTokenController = new RefreshTokenController()

app.use(json())

app.get('/auth/google', async (req, res) => {
  const url = await google.generateAuthUrl()
  return res.json({ url })
})

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query
  if (code) {
    const { id_token, access_token } = await google.getToken(String(code))
    return res.json({ id_token, access_token })
  }
})

app.post('/auth/google/user-data', async (req, res) => {
  const userData = await google.decodeToken(req.body.token)
  return res.json(userData)
})

app.post('/users', async (req, res) => createUserController.handle(req, res))
app.get('/refresh-token', async (req, res) => refreshTokenController.handle(req, res))

app.listen(3000, () => {
  console.log('server running')
})
