const mongoose = require("mongoose");

module.exports = client => {
	const dbOptions = {
		useNewUrlParser: true,
		autoIndex: false,
		poolSize: 5,
		connectTimeoutMS: 10000,
		useUnifiedTopology: true,
		useFindAndModify: true,
	};
	mongoose.connect(client.config.mongodb_uri, dbOptions);
	mongoose.promise = global.Promise;
	mongoose.connection.on("connected", () => {
		client.logger.info("Connected to Database.");
	});
	mongoose.connection.on("err", err => {
		client.logger.error(`Mongoose have error: ${err}`);
	});
	mongoose.connection.on("disconnected", () => {
		client.logger.info("Disconnected from Database.");
	});
};