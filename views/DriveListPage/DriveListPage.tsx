import React from "react";
import { DriveListProps } from "@/types/interface";
import { Grid } from "@mui/material";
import DriveList from "@/components/DriveList/DriveList";

const DriveListPage: React.FC<DriveListProps> = ({ drive_list }) => {
  return (
    <Grid
      container
      direction="row"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={4}>
        <DriveList drive_list={drive_list} />
      </Grid>
    </Grid>
  );
};

export default DriveListPage;
