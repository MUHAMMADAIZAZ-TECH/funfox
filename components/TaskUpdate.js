import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import { readTasks } from "../redux/features/tasksSlice";
import { updateTask } from "../redux/features/taskSlice";
import { CustomButton, TextInput } from "./UI-Components";

export default function TaskUpdate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { task, loading, success, message } = useSelector((state) => state.task);

  useEffect(() => {
    if (task && task._id !== id) {
      dispatch(readTasks());
    } else {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id, task, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const data = {
      title,
      description,
      completeBy: user.Name,
    };

    dispatch(updateTask({ id, data })).then((result) => {
      if (!result.error) {
        // router.push("/");
      } else {
        console.log(result);
      }
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      // alignItems="center"
      height="20vh"
      borderRadius={20}
    >
          <Paper elevation={3} style={{ padding: "20px" }}>

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
      </Paper>
    </Grid>
  );
}
