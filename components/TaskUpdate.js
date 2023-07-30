import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { readTasks } from "../redux/features/tasksSlice";
import { updateTask } from "../redux/features/taskSlice";

export default function TaskUpdate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // New state for task description

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { task, loading, success, message } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    if (task && task._id !== id) {
      dispatch(readTasks());
    } else {
      setTitle(task.title);
      setDescription(task.description); // Set the description from the task
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
      description, // Include description in the data object
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    
      <input
        type="text"
        autoComplete="off"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">OK</button>
    </form>
  );
}
