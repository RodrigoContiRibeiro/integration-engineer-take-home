const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { tasksService } = require("./tasks/service");
const {
  fullTaskFieldsSchema,
  partialTaskFieldsSchema,
  taskIdSchema,
} = require("./tasks/schemas");
const { validateSchema } = require("./middlewares/validateSchema");
const { fetchTaskId } = require("./middlewares/fetchTaskId");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.disable("x-powered-by");

app.get("/v1/tasks", (req, res, next) => {
  const tasks = tasksService.listTasks();

  res.json(tasks);
});

app.post(
  "/v1/tasks",
  validateSchema(fullTaskFieldsSchema),
  (req, res, next) => {
    const taskFields = req.body;

    const newTask = tasksService.createTask(taskFields);

    res.json(newTask);
  }
);

const getReqParams = (req) => req.params;
const taskIdMiddlewares = [
  validateSchema(taskIdSchema, getReqParams),
  fetchTaskId(),
];

app.get("/v1/tasks/:id", ...taskIdMiddlewares, (req, res, next) => {
  // local data from fetchTaskId middleware
  const task = res.locals.task;

  res.json(task);
});

app.patch(
  "/v1/tasks/:id",
  ...taskIdMiddlewares,
  validateSchema(partialTaskFieldsSchema),
  (req, res, next) => {
    const taskIdToBeUpdated = req.params.id;
    const taskFieldsToBeUpdated = req.body;

    const newTasks = tasksService.updateTask(
      taskIdToBeUpdated,
      taskFieldsToBeUpdated
    );

    res.json(newTasks);
  }
);

app.put(
  "/v1/tasks/:id",
  ...taskIdMiddlewares,
  validateSchema(fullTaskFieldsSchema),
  (req, res, next) => {
    const taskIdToBeUpdated = req.params.id;
    const taskFieldsToBeUpdated = req.body;

    const newTasks = tasksService.updateTask(
      taskIdToBeUpdated,
      taskFieldsToBeUpdated
    );

    res.json(newTasks);
  }
);

// TODO change return
app.delete("/v1/tasks/:id", ...taskIdMiddlewares, (req, res, next) => {
  const taskIdToBeDeleted = req.params.id;

  tasksService.deleteTask(taskIdToBeDeleted);

  res.status(204).send();
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
