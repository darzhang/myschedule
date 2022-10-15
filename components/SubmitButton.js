import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function SubmitButton() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {!isLoading ? 
      <Button onClick={() => setIsLoading(true)} type="submit" variant="outlined">SIGN UP</Button>:
      <Button><CircularProgress/></Button>}
    </div>
    
    
  )
}