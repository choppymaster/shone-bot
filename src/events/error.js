module.exports.run = (client, err) => {
	client.logger.error(err.stack);
};