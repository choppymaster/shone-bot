const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

	const user = message.mentions.users.first() || message.member.user;
	const member = message.guild.members.cache.get(user.id);
	const embed = new MessageEmbed()
		.setTitle(`User Info - ${user.username}`)
		.setColor("RANDOM")
		.setThumbnail(user.displayAvatarURL({ size: 2048 }))
		.addField("Tag", user.tag.toString(), true)
		.addField("ID", member.user.id.toString(), true)
		.addField("Nickname", member.nickname || "None", true)
		.addField("Presence Status", member.presence?.status, true)
		.addField("Created at", new Date(user.createdTimestamp).toLocaleString(), true)
		.addField("Joined at", new Date(member.joinedTimestamp).toLocaleString(), true);

   message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "userinfo",
	"description": "Gives the info of a user in guild.",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES"],
};