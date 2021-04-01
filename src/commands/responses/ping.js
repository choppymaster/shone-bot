module.exports.run = async (client, message) => {
	message.channel.send(`Pong! - ${client.ws.ping}`);
};

module.exports.config = {
	'name': 'ping',
	'description': 'says the ping',
	'permissions': ['SEND_MESSAGES'],
};