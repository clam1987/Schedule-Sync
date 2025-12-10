"use server";
import fs from "fs";
import path from "path";

const user_settings_path = path.join(process.cwd(), "db", "user_setting.json");

export const fetchUsers = async () => {
  try {
    const db = await fs.promises.readFile(user_settings_path, "utf8");
    const data = JSON.parse(db);

    return data;
  } catch (err) {
    return { err, status: 500 };
  }
};

export const fetchUserByEmail = async (email?: string) => {
  try {
    const users = await fetchUsers();
    const user_found = users.find(
      (users: { user: { email: string } }) => users.user.email === email
    );
    return user_found;
  } catch (err) {
    return { err, status: 500 };
  }
};

export const saveUserData = async (
  user_data: { id: string; name: string; email: string },
  file_data: { id: string; name: string }
) => {
  try {
    const users = await fetchUsers();
    const user_found = users.findIndex(
      (user: { user_id: string }) => user.user_id === user_data.id
    );
    const data = { user: user_data, file: file_data };
    if (user_found === -1) {
      users.push(data);
    } else if (
      users[user_found].user_id === user_data.id &&
      users[user_found].file_id === file_data.id
    ) {
      return { message: "No changes detected.", status: 200 };
    } else {
      console.log(data);
      users[user_found] = data;
    }
    console.log("Users to be saved:", users);
    fs.promises.writeFile(user_settings_path, JSON.stringify(users, null, 2));

    return { message: "User data saved successfully.", status: 200 };
  } catch (err) {
    console.error("Server Action Error: ", err);
    throw new Error("Failed to save user data.");
  }
};
