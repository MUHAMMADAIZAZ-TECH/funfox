import { readTasks } from "../../redux/features/tasksSlice";
import { wrapper } from "../../redux/store";
import React from "react";
import UserDashboard from "@/components/Dashboard/UserDashboard";
import TasksList from "@/components/TasksList";
export default function Index() {
  return (<UserDashboard Component={TasksList}/>);
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(readTasks({ req, res }));
    }
);
