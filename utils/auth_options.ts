import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { refreshAccessToken } from "@/utils/utils";

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
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;

        return {
          ...token,
          refresh_token: account.refresh_token,
          expires_at: (account.expires_at as number) * 1000,
        };
      }

      const FIVE_MINUTES = 5 * 60 * 1000;
      if (Date.now() < (token.expires_at as number) - FIVE_MINUTES) {
        return token;
      }

      if (token.refresh_token) {
        console.log("Access token expired, refreshing...");
        return await refreshAccessToken(token);
      }
      console.log("JWT Token:", token);
      console.log("Account: ", account);

      return token;
    },
    async session({ session, token }) {
      session = {
        ...session,
        access_token: token.access_token as string,
        refresh_token: token.refresh_token as string,
        expires_at: token.expires_at as number,
      };

      return session;
    },
  },
};
