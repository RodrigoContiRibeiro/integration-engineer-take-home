const { z } = require("zod");

const notEmptyZodObject = (zodObject) =>
  zodObject.refine(
    (arg) => {
      const keysCount = Object.keys(arg).length;

      const isObjectFilled = keysCount !== 0;

      return isObjectFilled;
    },
    { message: "object should not be empty" }
  );

const taskDataSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
});
const fullTaskDataSchema = notEmptyZodObject(taskDataSchema);
const partialTaskDataSchema = notEmptyZodObject(taskDataSchema.partial());
const taskIdSchema = z.string().uuid();

module.exports = {
  taskIdSchema,
  fullTaskDataSchema,
  partialTaskDataSchema,
};
