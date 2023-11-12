import { env } from "@/config/env";

import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export class GoogleAPI {
  private readonly google: OAuth2Client;

  constructor() {
    this.google = new google.auth.OAuth2(
      env.google.clientId,
      env.google.clientSecret,
      env.google.redirectURI,
    );
  }

  async getGoogleUser(code: string): Promise<any> {
    const { access_token } = await this.getToken(code);

    console.log("ACESS TOKEN", access_token);
    const googleUser = await this.google.getTokenInfo(access_token);

    console.log("GOOGLE USER", googleUser);
  }

  async generateAuthUrl(): Promise<string> {
    return this.google.generateAuthUrl({
      access_type: "online",
      prompt: "consent",
      scope: ["email", "profile"],
    });
  }

  async getToken(code: string): Promise<any> {
    const { tokens } = await this.google.getToken(code);
    const { id_token, access_token } = tokens;
    return {
      id_token,
      access_token,
    };
  }

  async decodeToken(token: string): Promise<any> {
    const userData = await this.google.verifyIdToken({
      idToken: token,
      audience: env.google.clientId,
    });
    return userData;
  }

  async refreshToken(): Promise<string | undefined | null> {
    const { credentials } = await this.google.refreshAccessToken();
    const { access_token } = credentials;
    return access_token;
  }
}
