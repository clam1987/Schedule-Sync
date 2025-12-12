"use client";
import { Container, Grid } from "@mui/material";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

export default function HomePage() {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={3}>
          <GoogleButton />
        </Grid>
      </Grid>

      {/* <BlinkingElectricEffect /> */}
    </Container>
  );
}
