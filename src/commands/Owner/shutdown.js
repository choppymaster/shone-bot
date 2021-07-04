module.exports.run = async (client, message, args) => {
	await message.channel.send("Goodbye 👋");
	await client.logger.debug("Shutdown.");
	await client.destroy();
    process.exit();
};

module.exports.config = {
	"name": "shutdown",
	"botMaster": true
};