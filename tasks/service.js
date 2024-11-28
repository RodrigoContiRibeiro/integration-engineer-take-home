const { randomUUID } = require("crypto");

let tasks = [];

const tasksService = {
  listTasks: () => {
    return tasks;
  },
  getTaskById: (id) => {
    const taskFound = tasks.find((task) => task.id === id);

    return taskFound;
  },
  createTask: ({ title, description }) => {
    const newTask = {
      id: randomUUID(),
      title,
      description,
    };

    tasks.push(newTask);

    return newTask;
  },
  updateTask: (id, newFields) => {
    const newTasks = tasks.map((task) => {
      const isTaskToBeUpdated = task.id === id;

      if (isTaskToBeUpdated) {
        const updatedTask = {
          ...task,
          ...newFields,
        };

        return updatedTask;
      }

      return task;
    });

    tasks = newTasks;

    return tasks;
  },
  deleteTask: (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    tasks = filteredTasks;

    return tasks;
  },
};

exports.tasksService = tasksService;
