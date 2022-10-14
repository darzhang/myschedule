import { Typography, Button } from "@mui/material";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/system";
import Link from "next/link";

export default function SignInPage() {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const {signin} = useAuth();

  const onSubmit = (data) => signin(data.email, data.password);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{display: "flex", flexDirection:"column", alignItems:"center", m:"0 auto", width:"200px"}}>
        <Typography variant="h3">Sign In</Typography>
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
        <Button type="submit" variant="outlined">Log In</Button>
        <Box sx={{mt:"10px", alignSelf:"self-start"}}>
          <Link href={"/signup"}>
            <Typography sx={{fontSize: "10px", fontStyle: "italic", textDecoration: "underline"}}>Don't have an account?Sign up.</Typography>
          </Link>
        </Box>
      </Box>
    </form>
  )
}