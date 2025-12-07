import DriveListPage from "@/views/DriveListPage/DriveListPage";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { auth_options } from "@/utils/auth_options";
import { DriveListProps } from "@/types/interface";

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

    return res.data.files;
  } catch (err) {
    console.error("Error fetching drive files:", err);
    return null;
  }
}

const Drive = async () => {
  const props: DriveListProps = {
    drive_list: [],
  };
  const session = await getServerSession(auth_options);
  if (session) {
    const token = session?.access_token;
    const drive_data = await fetchDriveFiles(token!);
    if (drive_data) {
      // console.log("Drive Data:", drive_data);
      props.drive_list = drive_data;
    }
  }
  return <DriveListPage drive_list={props.drive_list} />;
};

export default Drive;
