"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Container, Grid, Typography } from "@mui/material";
import DeleteIconButton from "@/components/DeleteIconButton/DeleteIconButton";
import SyncButton from "@/components/SyncButton/SyncButton";
import { deleteFile } from "@/lib/services/fileServices/fileServices";
import { redirect } from "next/navigation";

const SyncPage = ({ file_name }: { file_name: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const onClick = (): void => {
    console.log("Button clicked!");
    setIsAnimating(!isAnimating);
  };

  const handleDeleteFile = () => {
    deleteFile();
    redirect("/");
  };

  const handleLogout = (): void => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={3}>
          <SyncButton onClick={onClick} animate={isAnimating} />
        </Grid>
        <Grid size={3}>
          <button onClick={handleLogout}>Log Out</button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
        mt={5}
      >
        <Grid size={4}>
          <Typography variant="h6">{file_name}</Typography>
        </Grid>
        <Grid size={4}>
          <DeleteIconButton onClick={handleDeleteFile} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SyncPage;
