"use server";
import { prisma } from "@/lib/prisma";
import { authAndGetUser } from "@/utils/auth_utils";

export const fetchFile = async () => {
  try {
    const user = await authAndGetUser();
    if (!user) throw new Error("User not found");

    const files = prisma.file.findFirst({
      where: {
        userId: user.id,
      },
    });

    return files;
  } catch (err) {
    console.error("Database read error: ", err);
    throw new Error("Failed to retrieve file data from the server.");
  }
};

export const saveFile = async (file_data: { id: string; name: string }) => {
  try {
    const user = await authAndGetUser();
    if (!user) throw new Error("User not found");

    await prisma.file.upsert({
      where: {
        file_id: file_data.id,
      },
      update: {
        file_id: file_data.id,
        name: file_data.name,
      },
      create: {
        file_id: file_data.id,
        name: file_data.name,
        userId: user.id,
      },
    });

    return { msg: "File saved successfully", status: 200 };
  } catch (err) {
    console.error("Error trying to save file to database: ", err);
    throw new Error("Failed to save file.");
  }
};

export const deleteFile = async () => {
  try {
    const file = await fetchFile();
    if (!file) throw new Error("Error 404: File not found");

    await prisma.file.deleteMany({
      where: {
        file_id: file.file_id,
      },
    });

    return { msg: "File deleted successfully", status: 200 };
  } catch (err) {
    console.error("Error trying to delete file: ", err);
    throw new Error("There was a problem deleting the file.");
  }
};
