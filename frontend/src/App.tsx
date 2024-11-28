import { useState, useEffect } from "react";
import "./App.css";

type TaskData = {
  title: string;
  description: string;
};

type Task = TaskData & {
  id: string;
};

const getTaskDataFromFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();

  const formData = new FormData(evt.target as HTMLFormElement);
  const taskData = Object.fromEntries(formData.entries());

  return taskData as TaskData;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/v1/tasks");
    const tasks = await response.json();
    setTasks(tasks);
  };

  const createTask = async (task: TaskData) => {
    const response = await fetch("http://localhost:8000/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks((prev) => {
      return [...prev, newTask];
    });
  };

  const deleteTask = async (id: string) => {
    const response = await fetch(`http://localhost:8000/v1/tasks/${id}`, {
      method: "DELETE",
    });

    const newTasks = await response.json();

    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <div>
        <h3>Create Task</h3>
        <form
          onSubmit={(evt) => {
            const taskData = getTaskDataFromFormSubmit(evt);

            createTask(taskData);
          }}
        >
          <input type="text" placeholder="Title" name="title" />
          <input type="text" placeholder="Description" name="description" />
          <button type="submit">Create</button>
        </form>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
