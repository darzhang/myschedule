import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";

export default function SignUpPage() {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const {signup} = useAuth();

  const onSubmit = (data) => signup(data.email, data.password);

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h3">Sign Up</Typography>
      <Box sx={{height:"10px"}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          name={"email"} 
          control={control} 
          rules={{pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}} 
          condition={!!errors.email} 
          helperText={"Email format is invalid"}
          type={"text"}
        />
        <InputField 
          name={"password"}
          control={control}
          rules={{minLength: 6}}
          condition={!!errors.password}
          helperText={"Minimum password length is 6"}
          type={"password"}
        />
        <InputField 
          name={"name"}
          control={control}
          rules={{}}
          condition={false} 
          helperText={""}
          type={"text"}
        />
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "10px"}}>
          <Button type="submit" variant="outlined">SIGN UP</Button>
        </Box>
      </form>
    </Box>
  )
}