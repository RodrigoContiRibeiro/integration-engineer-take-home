const { tasksService } = require("../tasks/service");

const fetchTaskId = () => {
  return (req, res, next) => {
    const taskId = req.params.id;

    const task = tasksService.getTaskById(taskId);

    if (!task) {
      res.status(404).json({
        message: `Id ${taskId} not found`,
      });
    } else {
      res.locals.task = task;
      next();
    }
  };
};

module.exports = { fetchTaskId };
