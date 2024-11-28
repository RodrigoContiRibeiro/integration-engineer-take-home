const Joi = require("joi");

const taskIdSchema = Joi.object({
  id: Joi.string().guid(),
});
const fullTaskFieldsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
const partialTaskFieldsSchema = fullTaskFieldsSchema.fork(
  Object.keys(fullTaskFieldsSchema.describe().keys),
  (schema) => {
    return schema.optional();
  }
);

module.exports = {
  taskIdSchema,
  fullTaskFieldsSchema,
  partialTaskFieldsSchema,
};
