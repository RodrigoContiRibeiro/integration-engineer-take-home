import { z } from "zod";

export const taskDataSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
});
export const taskIdSchema = z.string().uuid();
export const taskSchema = taskDataSchema.extend({
  id: taskIdSchema,
});
export const taskListSchema = z.array(taskSchema);

export type TaskData = z.infer<typeof taskDataSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskId = z.infer<typeof taskIdSchema>;
export type Tasks = z.infer<typeof taskListSchema>;

const version = `v1`;
const baseUrl = `http://localhost:8000/${version}`;

const routes = {
  tasks: `${baseUrl}/tasks`,
  task: (id: string) => `${baseUrl}/tasks/${id}`,
};

const fetchTasks = async (): Promise<Tasks> => {
  const response = await fetch(routes.tasks);

  const resJson = await response.json();

  const tasks = taskListSchema.parse(resJson);

  return tasks;
};

const createTask = async (taskData: TaskData): Promise<Task> => {
  const parsedTaskData = taskDataSchema.parse(taskData);

  const response = await fetch(routes.tasks, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedTaskData),
  });

  const resJson = await response.json();

  const newTask = taskSchema.parse(resJson);

  return newTask;
};

const editTask = async (id: TaskId, taskData: TaskData): Promise<Task> => {
  const parsedTaskId = taskIdSchema.parse(id);
  const parsedTaskData = taskDataSchema.parse(taskData);

  const response = await fetch(routes.task(parsedTaskId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedTaskData),
  });

  const resJson = await response.json();

  const newTask = taskSchema.parse(resJson);

  return newTask;
};

const deleteTask = async (id: string): Promise<void> => {
  const taskId = taskIdSchema.parse(id);

  await fetch(routes.task(taskId), {
    method: "DELETE",
  });
};

export const tasksApi = {
  version,
  baseUrl,
  routes,
  fetchTasks,
  createTask,
  editTask,
  deleteTask,
};
