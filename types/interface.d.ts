export interface DriveFile {
  id?: string | null | undefined;
  name?: string | null | undefined;
}

export interface DriveListProps {
  drive_list: DriveFile[] | null;
}
