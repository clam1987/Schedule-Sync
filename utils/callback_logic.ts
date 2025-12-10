import { refreshAccessToken } from "@/lib/services/googleServices/googleServices";
import { saveUserData } from "@/lib/services/userServices/userServices";
import { JWT } from "next-auth/jwt";
import { Account, Session, User } from "next-auth";

export const handleJwtLogic = async ({
  token,
  account,
}: {
  token: JWT;
  account: Account | null;
}) => {
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
};

export const handleSessionLogic = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  session = {
    ...session,
    access_token: token.access_token as string,
    refresh_token: token.refresh_token as string,
    expires_at: token.expires_at as number,
  };

  return session;
};

export const handleSignIn = ({ user }: { user: User }) => {
  if (user?.id) {
    saveUserData(
      { id: user.id, name: user.name || "", email: user.email || "" },
      { id: "", name: "" }
    );
  }
  return true;
};
