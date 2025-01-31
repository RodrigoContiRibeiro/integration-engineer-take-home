import React from "react";
import { tasksApi, Task, TaskData, TaskId } from "../apis/tasksApi";

export const useTasks = () => {
  const [tasks, setTasks] = React.useState<Task[] | undefined>(undefined);

  const isTasksLoading = tasks === undefined;

  const fetchTasks = async () => {
    const tasks = await tasksApi.fetchTasks();

    setTasks(tasks);
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData: TaskData) => {
    const newTask = await tasksApi.createTask(taskData);

    setTasks((prev = []) => [...prev, newTask]);
  };

  const editTask = async (id: TaskId, taskData: TaskData) => {
    const newTask = await tasksApi.editTask(id, taskData);

    setTasks((prev = []) => {
      const newTasks = prev.map((task) => {
        const isTaskToBeEdited = task.id === id;

        if (isTaskToBeEdited) {
          return newTask;
        }

        return task;
      });
      return newTasks;
    });
  };

  const deleteTask = async (id: Task["id"]) => {
    await tasksApi.deleteTask(id);

    setTasks((prev = []) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks: tasks ?? [],
    isTasksLoading,
    fetchTasks,
    createTask,
    editTask,
    deleteTask,
  };
};
