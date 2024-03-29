import { Box, TextField, Typography } from "@mui/material";

export default function UserProfile({ doc }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography sx={{ mb: "20px" }} variant="h3">
        User Profile
      </Typography>
      {Object.keys(doc).map((key, index) => {
        return (
          <div key={index}>
            <TextField
              sx={{ m: "10px", width: "250px" }}
              label={key}
              defaultValue={doc[key]}
              inputProps={{ readOnly: true }}
            />
          </div>
        );
      })}
    </Box>
  );
}
