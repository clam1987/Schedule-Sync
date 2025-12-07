"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Container, Grid } from "@mui/material";
import SyncButton from "@/components/SyncButton/SyncButton";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

export default function HomePage({}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { status } = useSession();
  const onClick = (): void => {
    console.log("Button clicked!");
    setIsAnimating(!isAnimating);
  };

  const handleLogout = (): void => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Container maxWidth="xl">
      {status !== "authenticated" ? (
        <Grid
          container
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid size={3}>
            <GoogleButton />
          </Grid>
        </Grid>
      ) : (
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
      )}
      {/* <BlinkingElectricEffect /> */}
    </Container>
  );
}
