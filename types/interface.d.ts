export interface DriveFile {
  id?: string | null | undefined;
  name?: string | null | undefined;
}

export interface DriveListProps extends ButtonProps {
  drive_list: DriveFile[] | null;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface DriveListPageProps {
  drive_list: DriveFile[] | null;
  user?: { name: string; email: string; id: string };
}
