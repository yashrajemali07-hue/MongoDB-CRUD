/**
 * Middleware for handling 404 (Not Found) routes.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`
  });
};

/**
 * Central Error Handler Middleware.
 * Catches Mongoose validation, duplicate key (E11000), cast errors,
 * malformed JSON payloads, and unhandled server errors.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal server error";

  // Malformed JSON syntax in request body
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON payload in request body";
  }

  // Mongoose CastError (invalid ObjectId format)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path || "ID"}: ${err.value}`;
  }

  // Mongoose Duplicate Key Error (E11000 for unique email or rollNumber)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || "field";
    message = `${field} already exists`;
  }

  // Mongoose Validation Error (required fields, regex, min/max)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  notFound,
  errorHandler
};
