const getReqBody = (req) => {
  return req.body;
};

const validateSchema = (joiSchema, getReqField = getReqBody) => {
  return (req, res, next) => {
    const fieldsToValidate = getReqField(req);

    const { error } = joiSchema.validate(fieldsToValidate, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        message: {
          errorDetails: error.details,
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
