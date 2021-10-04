module.exports = {
	run: (client, message, args) => {
		const number = args.join(" ");
		if (!number) return message.channel.send("Number not specified.");
		if (isNaN(number)) return message.channel.send("it is not a number.");
		if (number > 100 || number < 2) return message.channel.send("The number should be 100 messages lower and 1 message higher.");
		message.channel.bulkDelete(number).catch(e => client.logger.error(e.stack));
		message.channel.send(`cleared ${number} messages.`).then(msg => msg.delete({ timeout: 2000 }));

	},
	slashCommand: {
		options: [
			{
				name: "number",
				description: "The number of messages you want to purge",
				type: "INTEGER",
				required: true,
			},
		],
	},
	execute: async (client, interaction, guild) => {
		const number = interaction.options.getInteger("number");
		if (number > 100 || number < 2) return interaction.reply("The number should be 100 messages lower and 1 message higher.").then(() => setTimeout(() => { interaction.deleteReply(); }, 10000));
		guild.channels.cache.get(interaction.channelId).bulkDelete(number).catch(e => client.logger.error(e.stack));
	    interaction.reply(`cleared ${number} messages.`).then(() => setTimeout(() => { interaction.deleteReply(); }, 2000));
	},

	config: {
		name: "clear",
		description: "Deletes a number of messages in the channel",
		guildOnly: true,
		permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
	},
};