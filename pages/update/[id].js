import { readTask } from "../../redux/features/taskSlice";
import { wrapper } from "../../redux/store";
import { Box, Typography } from "@mui/material"; // Import any MUI components you need

import TaskUpdate from "../../components/TaskUpdate";
import UserDashboard from "@/components/Dashboard/UserDashboard";

const Render = () => (
    <Box>
    <Typography variant="h6">Details</Typography>
    <TaskUpdate />
    </Box>
);

export default function UpdateId() {
  return <UserDashboard Component={Render} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const id = params.id;
      await store.dispatch(readTask({ id, req }));
    }
);
