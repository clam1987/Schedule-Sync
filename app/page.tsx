"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Container, Grid } from "@mui/material";
import SyncButton from "@/components/SyncButton/SyncButton";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
// import BlinkingElectricEffect from "@/components/BlinkingElectricEffect/BlinkingElectricEffect";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: session, status } = useSession();
  const onClick = (): void => {
    console.log("Button clicked!");
    setIsAnimating(!isAnimating);
  };
  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={3}>
          {status === "authenticated" ? (
            <SyncButton onClick={onClick} animate={isAnimating} />
          ) : (
            <GoogleButton />
          )}
        </Grid>
      </Grid>
      {/* <BlinkingElectricEffect /> */}
    </Container>
  );
}
