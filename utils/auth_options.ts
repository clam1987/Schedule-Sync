import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

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
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      console.log("JWT Token:", token);
      console.log("Account: ", account);

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        // @ts-expect-error -- ignore --
        access_token: token.access_token,
      };

      return session;
    },
  },
};
