import { Button,Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import Link from "next/link";

export default function SignUpPage() {
  const {control, handleSubmit, formState: {errors}} = useForm();
  const {signup} = useAuth();

  const onSubmit = (data) => signup(data.email, data.password);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", m:"0 auto", width: "200px"}}>
        <Typography variant="h3">Sign Up</Typography>
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
          <Button type="submit" variant="outlined">SIGN UP</Button>
          <Box sx={{mt: "10px", alignSelf:"start"}}>
            <Link href={"/signin"}>
              <Typography sx={{fontSize:"10px", fontStyle:"italic", textDecoration: "underline"}}>Have an account?Log in.</Typography>
            </Link>
          </Box>
      </Box>
    </form>
  )
}