const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.disable("x-powered-by");

let tasks = [];

const tasksService = {
  listTasks: () => {
    return tasks;
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
  deleteTask: (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    tasks = filteredTasks;

    return tasks;
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
};

app.get("/tasks", (req, res) => {
  const tasks = tasksService.listTasks();

  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const taskFields = req.body;

  const newTask = tasksService.createTask(taskFields);

  res.json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const taskIdToBeUpdated = req.params.id;
  const taskFieldsToBeUpdated = req.body;

  const newTasks = tasksService.updateTask(
    taskIdToBeUpdated,
    taskFieldsToBeUpdated
  );

  res.json(newTasks);
});

app.delete("/tasks/:id", (req, res) => {
  const taskIdToBeDeleted = req.params.id;

  const newTasks = tasksService.deleteTask(taskIdToBeDeleted);

  res.json(newTasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Oopsie daisy, page not found >.<");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something exploded?!");
});
