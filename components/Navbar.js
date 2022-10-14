import { CalendarMonth } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Link href={"/"}>
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center"}}>
              <IconButton
                color="inherit">
                <CalendarMonth sx={{fontSize: "30px"}}/>
              </IconButton>
              <Typography sx={{fontFamily: "monospace", fontSize: "20px"}}>
                MYSCHEDULE
              </Typography>
            </Box>
          </Link>
          <Link href={"/signup"}>
            <Button color="inherit" variant="outlined">Log In</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}