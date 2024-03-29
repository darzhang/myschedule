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
        title: "You are not authorized"
      }).then((result) => {
        if(result.isConfirmed){
          router.push("/signin")
        }
      })
    }
  }, [router, user]);

  return (
    <>{user ? children : null}</>
  )
}