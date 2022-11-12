import { GoogleAPI } from '@/apis'
import express from 'express'

const app = express()
const oauth = new GoogleAPI()

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

app.listen(3000, () => {
  console.log('server running')
})
