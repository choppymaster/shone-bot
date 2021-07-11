const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const guild = message.guild;

	const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`Server InFo - ${guild.name}`)
		.setThumbnail(guild.iconURL())
		.addField("Region", guild.region, true)
		.addField("Members", guild.memberCount, true)
		.addField("Roles", guild.roles.cache.size, true)
		.addField("Emojis", guild.emojis.cache.size, true)
		.addField("Owner", guild.owner.user.tag)
		.addField("AFK Timeout", guild.afkTimeout / 60 + "minute(s)");

	message.channel.send(embed);
};

module.exports.config = {
	"name": "serverinfo",
	"description": "Gives the info of the guild.",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES"],
};