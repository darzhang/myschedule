import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({children}) {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!user) {
      Swal.fire({
        icon: "error",
        title: "You have not logged in yet"
      }).then((result) => {
        if(result.isConfirmed){
          router.push("/login")
        }
      })
    }
  }, [router, user]);

  return (
    <>{user ? children : <Typography variant="h2">You are not authorized</Typography>}</>
  )
}