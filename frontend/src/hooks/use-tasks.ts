import React from "react";
import { tasksApi, Task, TaskData } from "../apis/tasksApi";

export const useTasks = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const fetchTasks = async () => {
    const tasks = await tasksApi.fetchTasks();

    setTasks(tasks);
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData: TaskData) => {
    const newTask = await tasksApi.createTask(taskData);

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = async (id: Task["id"]) => {
    await tasksApi.deleteTask(id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, fetchTasks, createTask, deleteTask };
};
