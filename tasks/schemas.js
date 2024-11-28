const Joi = require("joi");

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
  fullTaskFieldsSchema,
  partialTaskFieldsSchema,
};
