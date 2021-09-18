module.exports = {
	run: async (client, message, args) => {

		const member = message.mentions.members.first();
		if (!member) return message.channel.send("You didn't mentioned a user to be undeafened?!");

		const channel = member.guild.channels.cache.get(member.voice?.channelId);
		if (!channel) return message.channel.send("The member is not in a voice channel!");

		try {
			await member.voice.setDeaf(false);
			message.channel.send("Member successfully unmuted on voice channel");
		}
		catch { return; }

	},
	slashCommand: {
		options: [
			{
				name: "member",
				description: "The user to undefended",
				type: "USER",
				required: true,
			},
		],
	},
	execute: async (client, interaction, guild) => {
        	const member = guild.members.cache.get(interaction.options.getUser("member").id);

		const channel = guild.channels.cache.get(member.voice?.channelId);
		if (!channel) return interaction.reply("The member is not in a voice channel!");

		try {
			await member.voice.setDeaf(false);
			interaction.reply("Member successfully unmuted on voice channel");
		}
		catch { return; }
	},
	config: {
		name: "undeafen",
		description: "undeafens a member in a voice channel",
		guildOnly: true,
		permissions: ["SEND_MESSAGES", "DEAFEN_MEMBERS"],
	},
};