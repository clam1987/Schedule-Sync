"use client";
import React from "react";
import { DriveListPageProps } from "@/types/interface";
import { Grid } from "@mui/material";
import DriveList from "@/components/DriveList/DriveList";
import { saveUserData } from "@/lib/services/userServices/userServices";

const DriveListPage: React.FC<DriveListPageProps> = ({ drive_list, user }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id!;
    const name = e.currentTarget.innerText;
    const file_info = { id, name };
    console.log("Clicked file info: ", file_info);
    saveUserData(user!, file_info);
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
