import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TasksList from "@/components/TasksList";
import { useSelector } from "react-redux";
import { CustomSnackbar, ScreenLoader } from "@/components/UI-Components";
function Container({Component}) {
    const state = useSelector((state) => state.task);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Component />
          <CustomSnackbar />
          {state.loading?<ScreenLoader/>:null}
      </Box>
  );
}

export default Container;
