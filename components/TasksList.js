import { useSelector } from 'react-redux';

import Task from './Task';
import TaskForm from './TaskForm';
import { useEffect, useState } from 'react';


export default function TasksList() {
    const { tasks } = useSelector((state) => state.tasks);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const handleCompleteTask = (taskId) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
      };
      useEffect(() => {
        if (typeof window !== 'undefined') {
          const Group = JSON.parse(localStorage.getItem('user')).Group;
          const filteredTasks = tasks.filter((task) => task.Group === Group);
          setFilteredTasks(filteredTasks);
        }
      }, [tasks]);
    return (
        <>
            <TaskForm />
            <br />
            <br />
            <br />
            <br />
            <div>
                <h3>Read</h3>
                {
                    filteredTasks  && filteredTasks .length !== 0 ? (
                        filteredTasks .map((task) => (
                            <Task
                                key={task._id}
                                task={task}
                                onCompleteTask={handleCompleteTask}
                            />
                        ))
                    ) : (
                        <p>No task!</p>
                    )
                }
            </div>
        </>
    );
}
