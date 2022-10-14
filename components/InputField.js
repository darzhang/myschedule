import { Box } from "@mui/system";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function InputField({name, control, rules, condition, helperText, type}) {
  return (
    <div>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", m: "10px"}}>
          <Controller 
            name={name}
            control={control}
            defaultValue=''
            rules={rules}
            render={({field}) => <TextField
            {...field}
            type={type}
            label={name}
            required
            error={condition}
            helperText={condition && helperText}
            />}
          />
        </Box>
    </div>
  )
}