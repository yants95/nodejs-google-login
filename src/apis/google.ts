import { env } from '@/config/env'

import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'

export class GoogleAPI {
  private readonly google: OAuth2Client

  constructor () {
    this.google = new google.auth.OAuth2(
      env.google.clientId,
      env.google.clientSecret,
      env.google.redirectURI
    )
  }

  async generateAuthUrl (): Promise<string> {
    return this.google.generateAuthUrl({
      access_type: 'online',
      prompt: 'consent',
      scope: ['email', 'profile']
    })
  }

  async getToken (code: string): Promise<any> {
    const { tokens } = await this.google.getToken(code)
    return tokens.id_token
  }
}
