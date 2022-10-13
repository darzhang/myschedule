import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { signUp } from "../config/firebase";

export default function Signup() {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const router = useRouter();

  const onSubmit = (data) => signUp(data.email, data.password, router);

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h3">Sign Up</Typography>
      <Box sx={{height:"10px"}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", m: "10px"}}>
          <Controller 
            name="email"
            control={control}
            defaultValue=''
            rules={{pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}}
            render={({field}) => <TextField
            {...field}
            label="email"
            required
            error={!!errors.email}
            helperText={!!errors.email && 'Email format is wrong'}
            />}
          />
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", m:"10px"}}>
          <Controller 
            name="password"
            control={control}
            defaultValue=''
            rules={{minLength: 6}}
            render={({field}) => <TextField
            {...field}
            label="password"
            type="password"
            required
            error={!!errors.password}
            helperText={!!errors.password && 'Minimum password length is 6'}
            />}
          />
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", m:"10px"}}>
          <Controller 
            name="name"
            control={control}
            defaultValue=''
            render={({field}) => <TextField
            {...field}
            label="name"
            required
            />}
          />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "10px"}}>
          <Button type="submit" variant="outlined">SIGN UP</Button>
        </Box>
      </form>
    </Box>
  )
}