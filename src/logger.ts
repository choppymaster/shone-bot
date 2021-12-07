import winston = require("winston");

export default winston.createLogger({
  level: "debug",
  transports: [
    new (winston.transports.Console)({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleExceptions: true
    })
  ],
  exitOnError: false
});
