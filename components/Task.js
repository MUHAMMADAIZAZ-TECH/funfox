import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/features/taskSlice";
import { readTasks } from "../redux/features/tasksSlice";
import { TableRow, TableCell, Button } from "@mui/material";

export default function Task({ task, onCompleteTask }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(readTasks());
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Link href={`/task/${task._id}`}>Title: {task.title}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/task/${task._id}`}>Description: {task.description}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/task/${task._id}`}>Group: {task.Group}</Link>
      </TableCell>
      <TableCell>
        <Button onClick={() => onCompleteTask(task._id, !task.status)}>
          Mark as {task.status ? "Incomplete" : "Completed"}
        </Button>
      </TableCell>
      <TableCell>
        <Link href={`/update/${task._id}`} passHref>
          <Button>Update</Button>
        </Link>
      </TableCell>
      <TableCell>
        <Button onClick={() => handleDelete(task._id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}
