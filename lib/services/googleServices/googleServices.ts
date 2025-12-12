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

export async function fetchSpreadSheet(access_token: string, sheet_id: string) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token });
    const sheets = google.sheets({ version: "v4", auth });
    const fields = await sheets.spreadsheets.get({
      spreadsheetId: sheet_id,
      fields: "sheets.properties.title",
    });
    const field_names = fields.data.sheets!.map((x) => x.properties!.title);
    const today = new Date();
    const options = {
      year: "numeric",
      month: "long",
    } as const;
    const current_month = today.toLocaleString("en-US", options);
    const current_field = field_names.find((name) => name === current_month);
    const results = await sheets.spreadsheets.values.get({
      spreadsheetId: sheet_id,
      range: `${current_field}!A:AZ`,
    });
    const row = results.data.values;
    return row;
  } catch (err) {
    console.error(err);
    throw new Error("Error trying to retrieve sheets");
  }
}
