module.exports.run = async (client, message, args) => {
	message.channel.send("Goodbye 👋");
	await process.exit();
};

module.exports.config = {
	"name": "shutdown",
	"botMaster": true,
};