import DriveListPage from "@/views/DriveListPage/DriveListPage";
import { getServerSession } from "next-auth/next";
import { auth_options } from "@/utils/auth_options";
import { DriveListProps } from "@/types/interface";
import { fetchDriveFiles } from "@/lib/services/googleServices/googleServices";
import { fetchUserByEmail } from "@/lib/services/userServices/userServices";
import { redirect } from "next/navigation";

const Drive = async () => {
  const props: DriveListProps = {
    drive_list: [],
  };

  const session = await getServerSession(auth_options);
  if (!session) {
    redirect("/");
  }

  const token = session?.access_token;
  const drive_data = await fetchDriveFiles(token!);
  const user = await fetchUserByEmail(session.user!.email!);

  if (drive_data) {
    props.drive_list = drive_data;
  }

  return <DriveListPage drive_list={props.drive_list} user={user} />;
};

export default Drive;
