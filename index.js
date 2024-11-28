const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { tasksService } = require("./tasks/service");
const {
  fullTaskFieldsSchema,
  partialTaskFieldsSchema,
} = require("./tasks/schemas");

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

app.post("/v1/tasks", (req, res, next) => {
  const taskFields = req.body;

  const { error } = fullTaskFieldsSchema.validate(taskFields, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      message: {
        errorDetails: error.details,
      },
    });
  } else {
    const newTask = tasksService.createTask(taskFields);

    res.json(newTask);
  }
});

// TODO add not found id
app.patch("/v1/tasks/:id", (req, res, next) => {
  const taskIdToBeUpdated = req.params.id;
  const taskFieldsToBeUpdated = req.body;

  const { error } = partialTaskFieldsSchema.validate(taskFieldsToBeUpdated, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      message: {
        errorDetails: error.details,
      },
    });
  } else {
    const newTasks = tasksService.updateTask(
      taskIdToBeUpdated,
      taskFieldsToBeUpdated
    );

    res.json(newTasks);
  }
});

// TODO create put

// TODO add not found id
app.delete("/v1/tasks/:id", (req, res, next) => {
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
