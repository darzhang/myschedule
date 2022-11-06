import { MenuOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { user, signout } = useAuth();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleClick = (location) => {
    router.push(location);
    handleClose();
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleOpen}>
        <MenuOutlined sx={{ fontSize: "30px" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {!user && (
          <MenuItem onClick={() => handleClick("/signin")}>Sign In</MenuItem>
        )}
        {user && (
          <MenuItem onClick={() => handleClick("/user/profile")}>
            Profile
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={() => handleClick("/user/schedule")}>
            Schedule
          </MenuItem>
        )}
        {user && (
          <MenuItem
            onClick={() => {
              handleClose();
              signout();
            }}
          >
            Sign Out
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
