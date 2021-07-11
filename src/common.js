module.exports.Schemas = {
    warns: require("./data/warns")
}

module.exports.Extends = {
    Member: require("./extends/Member"),
    Channel: require("./extends/Channel")
}


const winston = require("winston");

const logger = winston.createLogger({
	level: "debug",
	transports: [
		new (winston.transports.Console)({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
			),
			handleExceptions: true,
		}),
	],
	exitOnError: false,
});

module.exports.Logger = logger;