import "dotenv/config";

export const env = {
  google: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectURI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  },
  url: process.env.DB_URL,
};
