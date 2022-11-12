import { GoogleAPI } from '@/apis'
import { CreateUserController } from '@/controllers'
import express, { json } from 'express'

const app = express()
const oauth = new GoogleAPI()
const createUserController = new CreateUserController()

app.use(json())

app.get('/auth/google', async (req, res) => {
  const url = await oauth.generateAuthUrl()
  return res.json({ url })
})

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query
  if (code) {
    const token = await oauth.getToken(String(code))
    return res.json({ token })
  }
})

app.post('/auth/google/user-data', async (req, res) => {
  const userData = await oauth.decodeToken(req.body.token)
  return res.json(userData)
})

app.post('/users', async (req, res) => createUserController.handle(req, res))

app.listen(3000, () => {
  console.log('server running')
})
