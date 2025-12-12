"use client";
import React from "react";
import { DriveListPageProps } from "@/types/interface";
import { Grid } from "@mui/material";
import DriveList from "@/components/DriveList/DriveList";
import { saveFile } from "@/lib/services/fileServices/fileServices";
import { redirect } from "next/navigation";

const DriveListPage: React.FC<DriveListPageProps> = ({ drive_list }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id!;
    const name = e.currentTarget.innerText;
    const file_info = { id, name };
    saveFile(file_info);
    redirect("/sync");
  };

  return (
    <Grid
      container
      direction="row"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={4}>
        <DriveList drive_list={drive_list} handleClick={handleClick} />
      </Grid>
    </Grid>
  );
};

export default DriveListPage;
