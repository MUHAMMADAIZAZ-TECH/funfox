import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetauthstates } from "@/redux/features/authSlice";
import { Apps } from "@mui/icons-material";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Toolbar,
  AppBar,
  IconButton,
} from "@mui/material";
export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  let User;
  if (typeof window !== "undefined") {
   User = JSON.parse(localStorage.getItem("user"))
  }
  const LogOut = () => {
    dispatch(resetauthstates());
    if (typeof window !== "undefined") {
      localStorage.clear(); // Clear all local storage
      router.push("/"); // Navigate to /next page after logout
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const pages = [
    "Tasks",
  ];
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Apps
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 25 }}
        />
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              style={{ textTransform: "none" }}
              // endIcon={<ArrowDropDown />}
              key={page}
              sx={{ my: 2, display: "flex" }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              md: "flex",
              justifyContent: "space-between",
            },
          }}
        >
        </Box>
        <IconButton onClick={handleClick}>
          <Avatar
            alt="John Doe"
            src={User?.AvatarUrl}
            sx={{ width: 34, height: 34 }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            {User?.FirstName} {User?.LastName}
          </MenuItem>
          <MenuItem onClick={handleClose}>{User?.Email}</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              LogOut();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
