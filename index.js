const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { tasksService } = require("./tasks/service");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.disable("x-powered-by");

app.get("/v1/tasks", (req, res) => {
  const tasks = tasksService.listTasks();

  res.json(tasks);
});

app.post("/v1/tasks", (req, res) => {
  const taskFields = req.body;

  const newTask = tasksService.createTask(taskFields);

  res.json(newTask);
});

app.patch("/v1/tasks/:id", (req, res) => {
  const taskIdToBeUpdated = req.params.id;
  const taskFieldsToBeUpdated = req.body;

  const newTasks = tasksService.updateTask(
    taskIdToBeUpdated,
    taskFieldsToBeUpdated
  );

  res.json(newTasks);
});

app.delete("/v1/tasks/:id", (req, res) => {
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
