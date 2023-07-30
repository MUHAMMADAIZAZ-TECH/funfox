import { useState } from "react";
import { useDispatch } from "react-redux";

import { createTask } from "../redux/features/taskSlice";
import { readTasks } from "../redux/features/tasksSlice";
import { Grid, Paper, Typography } from "@mui/material";
import { CustomButton, TextInput } from "./UI-Components";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const formData = {
      title,
      description,
      Group: user.Group,
    };
    await dispatch(createTask(formData)).then(() => {
      dispatch(readTasks());
      setTitle("");
      setDescription("");
    });
  };

  return (
    <>
        <Typography variant="h6" gutterBottom>
        Create New Task
      </Typography>
      {/* <Grid
      container
      justifyContent="center"
      // alignItems="center"
      borderRadius={20}
    > */}
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <Grid container direction="column">
              <Grid item>
                <label htmlFor="task-title">Task Title:</label>
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  size="small"
                  placeholder="Enter task title"
                  variant="outlined"
                  type="text"
                  id="task-title"
                  autoComplete="off"
                  value={title}
                  change={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <Grid container direction="column">
              <Grid item>
                <label htmlFor="task-description">Task Description:</label>
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  size="small"
                  placeholder="Enter task description"
                  variant="outlined"
                  type="text"
                  id="task-description"
                  autoComplete="off"
                  value={description}
                  change={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            variant="contained"
            text="Submit"
            size="large"
            fullWidth
            className="custom-button"
            onClick={handleSubmit}
          />
        </Grid>
      </form>
    {/* </Grid> */}
    </>
  );
}
