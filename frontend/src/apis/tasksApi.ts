export type TaskData = {
  title: string;
  description: string;
};

export type Task = TaskData & {
  id: string;
};

const version = `v1`;
const baseUrl = `http://localhost:8000/${version}`;

const routes = {
  tasks: `${baseUrl}/tasks`,
  task: (id: string) => `${baseUrl}/tasks/${id}`,
};

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(routes.tasks);

  const tasks = (await response.json()) as Task[];

  return tasks;
};

const createTask = async (taskData: TaskData): Promise<Task> => {
  const response = await fetch(routes.tasks, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const newTask = (await response.json()) as Task;

  return newTask;
};

const deleteTask = async (id: string): Promise<void> => {
  await fetch(routes.task(id), {
    method: "DELETE",
  });
};

export const tasksApi = {
  version,
  baseUrl,
  routes,
  fetchTasks,
  createTask,
  deleteTask,
};
