import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function HomeBanner() {
  return (
    <Box
      sx={{
        border: 1,
        padding: "20px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography align="justify" mb={"10px"}>
        Create your own schedule and let other people see it.
      </Typography>
      <Typography align="left">1. Create your own account</Typography>
      <Typography align="left">2. Add event to your schedule</Typography>
      <Typography align="left">
        3. Edit or delete to update your schedule
      </Typography>
      <Typography align="left">
        4. Share your schedule to other people
      </Typography>
    </Box>
  );
}
