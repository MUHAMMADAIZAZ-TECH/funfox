import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

import { deleteTask } from "../redux/features/taskSlice";
import { readTasks } from "../redux/features/tasksSlice";

export default function Task({ task, onCompleteTask }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(readTasks());
    });
  };

  return (
    <div style={styles.task}>
      <Link href={`/task/${task._id}`}>Title: {task.title}</Link>
      <Link href={`/task/${task._id}`}>Description: {task.description}</Link>
      <Link href={`/task/${task._id}`}>
        Status: {task.status === true ? "completed" : "pending"}
      </Link>
      <Link href={`/task/${task._id}`}>Group: {task.Group}</Link>
      <div>
        <button onClick={() => onCompleteTask(task._id)}>
          Mark as {task.completed ? "Incomplete" : "Completed"}
        </button>
        <Link href={`/update/${task._id}`} passHref>
          <button>Update</button>
        </Link>
        <button onClick={() => handleDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  task: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 10px",
    marginBottom: "4px",
    border: "1px solid gray",
    lineHeight: "25px",
  },
};
