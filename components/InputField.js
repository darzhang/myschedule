import { Box } from "@mui/system";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function InputField({
  name,
  control,
  rules,
  condition,
  helperText,
  type,
}) {
  return (
    <div>
      <Box sx={{ m: "10px" }}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "250px" }}
              type={type}
              label={name}
              required
              error={condition}
              helperText={condition && helperText}
            />
          )}
        />
      </Box>
    </div>
  );
}
