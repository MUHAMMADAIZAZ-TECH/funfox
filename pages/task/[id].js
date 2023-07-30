import React from "react";
import { readTask } from "../../redux/features/taskSlice";
import { wrapper } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material"; // Import any MUI components you need

import TaskDetails from "../../components/TaskDetails";
import UserDashboard from "@/components/Dashboard/UserDashboard";

const Render = () => (
    <Box>
      <Typography variant="h6">Details</Typography>
      <TaskDetails />
    </Box>
  );
  

export default function TaskId() {
  const state = useSelector((state) => state.task);
  return (
  <React.Fragment>
<UserDashboard Component={Render} />
  </React.Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const id = params.id;
      await store.dispatch(readTask({ id, req }));
    }
);
