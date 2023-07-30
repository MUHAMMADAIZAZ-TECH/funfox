import Task from './Task';
import TaskForm from './TaskForm';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { updateTask } from "../redux/features/taskSlice";
import { readTasks } from '../redux/features/tasksSlice';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


export default function TasksList() {
    const { tasks } = useSelector((state) => state.tasks);
  
    const dispatch = useDispatch();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const handleCompleteTask = (id,status) => {
        let user;
        if (typeof window !== "undefined") {
            user = JSON.parse(localStorage.getItem("user"));
          }
          const data = {
            status: status, // Include completed status in the data object
            completeBy: user.Name,
          };
      
          dispatch(updateTask({ id, data })).then((result) => {
            if (!result.error) {
                fetchData()
              // router.push("/");
            } else {
              console.log(result);
            }
          });
      };
      const fetchData = async () => {
        try {
          await dispatch(readTasks());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        if (typeof window !== 'undefined') {
          const Group = JSON.parse(localStorage.getItem('user')).Group;
          const filteredTasks = tasks.filter((task) => task.Group === Group);
          setFilteredTasks(filteredTasks);
        }
        //   fetchData();
      }, [tasks]);
    return (
      <>
      <TaskForm />
      <br />
      <div>
      <Typography variant="h6" gutterBottom>
        Tasks List
      </Typography>
        {filteredTasks && filteredTasks.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCompleteTask={handleCompleteTask}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No task!</p>
        )}
      </div>
    </>
    );
}
