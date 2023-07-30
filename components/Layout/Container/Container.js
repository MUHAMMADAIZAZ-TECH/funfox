import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { CustomSnackbar } from "@/components/UI-Components";
function Container({Component}) {

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Component />
          <CustomSnackbar />
      </Box>
  );
}

export default Container;
