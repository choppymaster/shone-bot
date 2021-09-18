const { MessageEmbed } = require("discord.js");

module.exports = {
	run: (client, message, args) => {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send("You didn't mentioned a user to kick!").then(m => m.delete({ timeout: 10000 }));
		const reason = args.slice(1).join(" ") ?? "Reason Not specified";
		if (!reason) return message.channel.send("Reason not specified").then(m => m.delete({ timeout: 10000 }));
		member.kick({ reason: reason }).then(() => {
			const KickEmbed = new MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`${member} was kicked. \n Reason ${reason}`);
			message.channel.send({ embeds: [KickEmbed] });
		});
	},
	slashCommand: {
		options: [
			{
				name: "member",
				description: "The user to kick",
				type: "USER",
				required: true,
			},
			{
				name: "reason",
				description: "The reason for kicking this user",
				type: "STRING",
				required: true,
			},
		],
	},
	execute: async (client, interaction, guild) => {
		const member = guild.members.cache.get(interaction.options.getUser("member").id);
		const reason = interaction.options.getString("reason") ?? "Reason Not specified";
		member.kick({ reason: reason }).then(() => {
			const KickEmbed = new MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`${member} was kicked. \n Reason ${reason}`);
			interaction.reply({ embeds: [KickEmbed] });
		});
	},
	config: {
		name: "kick",
		description: "kicks a member of the server",
		guildOnly: true,
		permissions: ["KICK_MEMBERS", "SEND_MESSAGES"],
	},
};