module.exports.Schemas = {
  warns: require("./data/warns")
};

module.exports.Extends = () => {
  return {
    Member: require("./extends/Member"),
    TextChannel: require("./extends/TextChannel"),
    Message: require("./extends/Message"),
    Guild: require("./extends/Guild")
  };
};


const winston = require("winston");

const logger = winston.createLogger({
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

module.exports.Logger = logger;
