import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import EventOverview from "../components/EventOverview";
import HomeBanner from "../components/HomeBanner";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        m: "0px 20px",
      }}
    >
      <Typography align="center" sx={{ mb: "20px" }} variant="h2">
        Home
      </Typography>
      {user ? <EventOverview /> : <HomeBanner />}
    </Box>
  );
}
