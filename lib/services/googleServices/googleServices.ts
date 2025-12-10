import { JWT } from "next-auth/jwt";
import { google } from "googleapis";

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

export async function fetchDriveFiles(access_token: string) {
  try {
    const oauth2 = new google.auth.OAuth2();
    oauth2.setCredentials({ access_token });
    const drive = google.drive({ version: "v3", auth: oauth2 });
    const res = await drive.files.list({
      pageSize: 10,
      q: "'me' in owners or sharedWithMe",
      fields: "files(id, name)",
    });

    return res.data.files;
  } catch (err) {
    console.error("Error fetching drive files:", err);
    return null;
  }
}
