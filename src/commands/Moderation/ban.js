const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send(`You didn't specified a member, ${message.author}.`).then(m => m.delete({ timeout: 10000 }));
	const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Reason Not specified";

	member.ban({ reason: reason }).then(() => {
		const embed = new MessageEmbed()
	        .setDescription(`${member.user.tag} was successfully banned. \n Reason: ${reason}`);
		message.channel.send({ embeds: [embed] });
	});
};

module.exports.config = {
	"name": "ban",
	"description": "Bans a member from the server",
	"guildOnly": true,
	"permissions": ["BAN_MEMBERS", "SEND_MESSAGES"],
};
