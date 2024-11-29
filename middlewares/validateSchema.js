const getReqBody = (req) => {
  return req.body;
};

const validateSchema = (zodSchema, getReqField = getReqBody) => {
  return (req, res, next) => {
    const fieldsToValidate = getReqField(req);

    const { error } = zodSchema.safeParse(fieldsToValidate);

    if (error) {
      res.status(400).json({
        message: {
          error: error,
        },
      });
    } else {
      next();
    }
  };
};

module.exports = {
  validateSchema,
};
