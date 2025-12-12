import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { auth_options } from "@/utils/auth_options";
import { fetchUserByEmail } from "@/lib/services/userServices/userServices";
import HomePage from "@/views/HomePage/HomePage";

export default async function Home() {
  const session = await getServerSession(auth_options);
  if (session) {
    const user_in_db = await fetchUserByEmail(session.user!.email!);
    if (user_in_db!.files.length === 0) {
      redirect("/drive");
    }

    if (user_in_db!.files.length > 0) {
      redirect("/sync");
    }
  }

  return <HomePage />;
}
