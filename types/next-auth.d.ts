import { DefaultSession, JWT as DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }
}

declare module "next-auth/jwt" {
  interface Session extends DefaultJWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }
}
