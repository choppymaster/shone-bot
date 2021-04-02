module.exports.run = async (client, message, args) => {
	await message.channel.send("Goodbye 👋");
	await client.logger.debug("Shutdown.")
	process.exit();
};

module.exports.config = {
	"name": "shutdown",
	"botMaster": true,
};