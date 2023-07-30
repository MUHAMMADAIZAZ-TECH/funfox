import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hideMessage } from "@/redux/features/authSlice";
import { hideTaskMessage } from "@/redux/features/taskSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const taskState = useSelector((state) => state.task);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideMessage());
    dispatch(hideTaskMessage()); 
  };
  const position = { vertical: "top", horizontal: "right" };
  return (
   <React.Fragment>
     <Snackbar
      open={state.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert onClose={handleClose} severity="info">
        {state.message}
      </Alert>
    </Snackbar>
     <Snackbar
     open={taskState.open}
     autoHideDuration={4000}
     onClose={handleClose}
     anchorOrigin={position}
   >
     <Alert onClose={handleClose} severity="info">
       {taskState.message}
     </Alert>
   </Snackbar>
   </React.Fragment>
  );
}
