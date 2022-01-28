const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500, //internal server error
    msg: err.message || "Something went wrong, try again later",
  };

  // database error message for missing field for required field errors
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.msg = err.message;
  }

  // database error message if there is a unique field error. More specifically for the email field (will change later)
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = `${Object.keys(err.keyValue)} has to be unique`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
