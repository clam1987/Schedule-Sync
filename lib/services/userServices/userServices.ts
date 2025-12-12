"use server";
import { prisma } from "@/lib/prisma";

export const fetchUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        files: true,
      },
    });
    return user;
  } catch (err) {
    console.error("Error encountered when fetching user data: ", err);
    throw new Error("Failed to fetch user data.");
  }
};

export const saveUserData = async (user_data: {
  provider_id: string;
  name: string;
  email: string;
}) => {
  try {
    await prisma.user.upsert({
      where: { email: user_data.email },
      update: { name: user_data.name, provider_id: user_data.provider_id },
      create: user_data,
    });

    return { message: "User data saved successfully.", status: 200 };
  } catch (err) {
    console.error("Server Action Error: ", err);
    throw new Error("Failed to save user data.");
  }
};
