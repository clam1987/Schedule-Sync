"use client";
import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Description } from "@mui/icons-material";
import { DriveListProps } from "@/types/interface";

const DriveList: React.FC<DriveListProps> = ({ drive_list, handleClick }) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: "90%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Drive Files
        </ListSubheader>
      }
    >
      {drive_list ? (
        drive_list.map(({ id, name }) => (
          <ListItemButton key={id}>
            <ListItemIcon>
              <Description sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        ))
      ) : (
        <></>
      )}
    </List>
  );
};

export default DriveList;
