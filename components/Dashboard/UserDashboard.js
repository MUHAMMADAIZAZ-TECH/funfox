import { Container, Header } from "../Layout/index";
import React from "react";
import { Box, CssBaseline } from "@mui/material";
const UserDashboard = ({Component}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Container Component={Component} />
    </Box>
  );
};

export default UserDashboard;
