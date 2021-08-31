const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	if(!member) return message.channel.send("You didn't mentioned a user to kick!").then(m => m.delete({ timeout: 10000 }));
	const reason = args.slice(1).join(" ");
	if(!reason) return message.channel.send("Reason not specified").then(m => m.delete({ timeout: 10000 }));
	member.kick({ reason: reason }).then(() => {
		const KickEmbed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${member} was kicked. \n Reason ${reason}`);
		message.channel.send({ embeds: [KickEmbed] });
	});
};

module.exports.config = {
	"name": "kick",
	"description": "kicks a member of the server",
	"guildOnly": true,
	"permissions": ["KICK_MEMBERS", "SEND_MESSAGES"],
};