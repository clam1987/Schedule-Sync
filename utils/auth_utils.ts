"use server";
import { getServerSession } from "next-auth";
import { auth_options } from "@/utils/auth_options";
import { fetchUserByEmail } from "@/lib/services/userServices/userServices";

type CurrentUser = Awaited<ReturnType<typeof fetchUserByEmail>>;

/**
 * Validates the user session and retrieves the full user record from the database.
 * @returns The user object from the database.
 * @throws 401 Unauthorized if the session is invalid.
 * @throws 403 Forbidden if the user is logged in but has no matching database record.
 */
export const authAndGetUser = async (): Promise<CurrentUser> => {
  try {
    const session = await getServerSession(auth_options);
    if (!session) {
      throw new Error("Error 401: Unauthorized user. Please login");
    }

    const user = await fetchUserByEmail(session.user!.email!);
    if (!user) {
      throw new Error("Error 403: Forbidden. User account not found.");
    }

    return user;
  } catch (err) {
    console.error("Error trying to authenticate and retrieve user", err);
    throw new Error("Error trying to authenticate and retrieve user");
  }
};
