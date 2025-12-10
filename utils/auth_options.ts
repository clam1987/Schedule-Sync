import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import {
  handleJwtLogic,
  handleSessionLogic,
  handleSignIn,
} from "./callback_logic";

export const auth_options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/calendar.events.owned",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: handleJwtLogic,
    session: handleSessionLogic,
    signIn: handleSignIn,
  },
};
