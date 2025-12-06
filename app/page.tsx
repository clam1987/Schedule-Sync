import fs from "fs";
import path from "path";
import HomePage from "@/components/HomePage/HomePage";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { auth_options } from "@/utils/auth_options";

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

export default async function Home() {
  const session = await getServerSession(auth_options);
  console.log("Session in page.tsx:", session);
  if (session) {
    const user_data = await fetchUserData();
    console.log("User Data:", user_data);
    const token = session?.access_token;
    console.log("Access Token:", token);
  }
  return <HomePage />;
}
