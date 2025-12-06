import fs from "fs";
import path from "path";
import HomePage from "@/components/HomePage/HomePage";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { auth_options } from "@/utils/auth_options";
import { Session } from "next-auth";

async function fetchUserData() {
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
}

async function fetchDriveFiles(access_token: string) {
  try {
    const oauth2 = new google.auth.OAuth2();
    oauth2.setCredentials({ access_token });
    const drive = google.drive({ version: "v3", auth: oauth2 });
    const res = await drive.files.list({
      pageSize: 10,
      q: "'me' in owners or sharedWithMe",
      fields: "files(id, name)",
    });

    console.log("Drive Files:", res.data.files);
    return res.data.files;
  } catch (err) {
    console.error("Error fetching drive files:", err);
    return null;
  }
}

interface HomePageProps {
  session: Session | null;
  initial_files: { id: string; name: string }[] | null;
}

export default async function Home() {
  const props: HomePageProps = {
    session: null,
    initial_files: null,
  };
  const session = await getServerSession(auth_options);
  console.log("Session in page.tsx:", session);
  if (session) {
    props.session = session;
    const user_data = await fetchUserData();
    const token = session?.access_token;
    const drive_data = await fetchDriveFiles(token!);
    console.log("Drive Data:", drive_data);
  }
  return <HomePage />;
}
