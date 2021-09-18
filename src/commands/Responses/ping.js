module.exports = {
	run: async (client, message) => {
		message.channel.send(`Pong! - ${client.ws.ping}`);
	},
	execute: async (client, interaction, guild) => {
		interaction.reply(`Pong! - ${client.ws.ping}`);
	},

	config: {
		name: "ping",
		description: "says the ping",
		permissions: ["SEND_MESSAGES"],
	},
};