import { CalendarMonth } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import MenuBar from "./MenuBar";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Link href={"/"}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton color="inherit">
                <CalendarMonth sx={{ fontSize: "30px" }} />
                <Typography sx={{ fontFamily: "monospace", fontSize: "20px" }}>
                  MYSCHEDULE
                </Typography>
              </IconButton>
            </Box>
          </Link>
          <MenuBar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
