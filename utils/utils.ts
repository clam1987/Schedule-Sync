import fs from "fs";
import path from "path";
import { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const refreshAccessToken = async (token: JWT) => {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const res = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token! as string,
      }),
    });

    const refreshed_token = await res.json();

    if (!res.ok) {
      throw refreshed_token;
    }

    return {
      ...token,
      access_token: refreshed_token.access_token,
      refreshed_token: refreshed_token.refresh_token ?? token.refresh_token,
      expires_at: Date.now() + refreshed_token.expires_in * 1000,
    };
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const fetchUserData = async () => {
  try {
    const user_settings_path = path.join(
      process.cwd(),
      "db",
      "user_setting.json"
    );
    const db = await fs.promises.readFile(user_settings_path, "utf8");
    const data = JSON.parse(db);

    return data;
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
};
