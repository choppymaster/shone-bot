const winston = require('winston')
const logger = winston.createLogger({
     	transports: [
     	 		new winston.transports.Console()
     	 	],
     	 	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
     	 	});
     	 	
module.exports = logger;