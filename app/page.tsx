import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { auth_options } from "@/utils/auth_options";
import { fetchUserByEmail } from "@/lib/services/userServices/userServices";
import HomePage from "@/views/HomePage/HomePage";

export default async function Home() {
  const session = await getServerSession(auth_options);
  if (session) {
    const user_in_db = await fetchUserByEmail(session.user!.email!);
    console.log("user found: ", user_in_db);
    if (user_in_db.user.id && user_in_db.file.id.length <= 0) {
      console.log("Redirecting to /drive");
      redirect("/drive");
    }
    // console.log("Session:", session);
    // redirect("/sync");
  }

  return <HomePage />;
}
