const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { tasksService } = require("./backend/tasks/service");
const {
  fullTaskDataSchema,
  partialTaskDataSchema,
  taskIdSchema,
} = require("./backend/tasks/schemas");
const { validateSchema } = require("./backend/middlewares/validateSchema");
const { fetchTaskId } = require("./backend/middlewares/fetchTaskId");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.disable("x-powered-by");

const getIdParam = (req) => req.params.id;

const taskIdMiddlewares = [
  validateSchema(taskIdSchema, getIdParam),
  fetchTaskId(),
];

app.get("/v1/tasks", (req, res, next) => {
  const tasks = tasksService.listTasks();

  res.json(tasks);
});

app.post("/v1/tasks", validateSchema(fullTaskDataSchema), (req, res, next) => {
  const taskFields = req.body;

  const newTask = tasksService.createTask(taskFields);

  const newTaskLocation = `/v1/tasks/${newTask.id}`;

  res.location(newTaskLocation).status(201).json(newTask);
});

app.get("/v1/tasks/:id", ...taskIdMiddlewares, (req, res, next) => {
  // local data from fetchTaskId middleware
  const task = res.locals.task;

  res.status(200).json(task);
});

app.patch(
  "/v1/tasks/:id",
  ...taskIdMiddlewares,
  validateSchema(partialTaskDataSchema),
  (req, res, next) => {
    const taskIdToBeUpdated = req.params.id;
    const taskFieldsToBeUpdated = req.body;

    const newTasks = tasksService.updateTask(
      taskIdToBeUpdated,
      taskFieldsToBeUpdated
    );

    res.status(200).json(newTasks);
  }
);

app.put(
  "/v1/tasks/:id",
  ...taskIdMiddlewares,
  validateSchema(fullTaskDataSchema),
  (req, res, next) => {
    const taskIdToBeUpdated = req.params.id;
    const taskFieldsToBeUpdated = req.body;

    const newTasks = tasksService.updateTask(
      taskIdToBeUpdated,
      taskFieldsToBeUpdated
    );

    res.status(200).json(newTasks);
  }
);

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
