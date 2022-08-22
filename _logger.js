const winston = require("winston");
const { format } = winston;

/// Store default logs
const logger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logger.log", level: "info" })],
});
/// Store errors
const errLogger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  level: "error",
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "errors.log", level: "error" })],
});

global.logInfo = (from, payload) => {
  if (process.env.PRODUCTION === "") {
    logger.log({ level: "info", message: `-------------${from}------------` });
    logger.log({ level: "info", message: payload });
  }
};

global.logError = (from, error) => {
  if (process.env.PRODUCTION === "") {
    errLogger.log({ level: "error", message: `-------------${from}------------` });
    errLogger.log({ level: "error", message: `${error}` });
  }
};
