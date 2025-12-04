"use client";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <IconButton
      onClick={handleSignIn}
      color="primary"
      aria-label="sign in with google"
    >
      <GoogleIcon />
    </IconButton>
  );
};

export default GoogleButton;
