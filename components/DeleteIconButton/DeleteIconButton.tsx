"use client";
import React from "react";
import { Button, styled, Typography, Box } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ButtonProps } from "@mui/material/Button";

const ExpandingButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 0,
  width: "3.5rem",
  height: "3.5rem",
  paddingLeft: "0.9rem",
  borderRadius: "50%",
  overflow: "hidden",
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  [theme.breakpoints.down("sm")]: {
    minWidth: "0",
    width: "2.5rem",
    height: "2.5rem",
  },
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    width: "10rem",
    borderRadius: "1.75rem",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      width: "7.5rem",
    },
  },
}));

const VisibleText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  whiteSpace: "nowrap",
  lineHeight: "inherit",
  fontSize: "1.5rem",
  opacity: 0,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.short,
    delay: theme.transitions.duration.short,
  }),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem", // Smaller icon for the smaller 2.5rem button
  },
  ".MuiButtonBase-root:hover &": {
    opacity: 1,
    margin: "0 auto",
  },
}));

const CompactIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "calc(50%)",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  opacity: 1,
  flexShrink: 0,
  transition: theme.transitions.create(["opacity"], {
    duration: theme.transitions.duration.shortest,
  }),
  [theme.breakpoints.down("sm")]: {
    width: "2.5rem",
    height: "2.5rem",
  },
  ".MuiButtonBase-root:hover &": {
    opacity: 0,
    width: 0,
  },
}));

const DeleteIconButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <ExpandingButton
      variant="contained"
      disableElevation
      aria-label="Delete Item"
      {...props}
    >
      <CompactIcon>
        <CloseIcon />
      </CompactIcon>

      <VisibleText>DELETE</VisibleText>
    </ExpandingButton>
  );
};

export default DeleteIconButton;
