const { MessageEmbed } = require("discord.js");

module.exports.run = (message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
	const reason = args.slice(1).join(" ");
	if(!reason) return message.channel.send("No reason specified").then(m => m.delete({ timeout: 10000 }));
	member.ban(reason).then(() => {
		const banEmbed = new MessageEmbed()
			.setTitle("🔒 User Banned")
			.setColor("RANDOM")
			.setDescription(`${member} was banned by ${message.author} with the reason of ${reason}.`);
		message.channel.send(banEmbed);
	});
};

module.exports.config = {
	"name": "ban",
	"description": "Bans a member from the server",
	"guildOnly": true,
	"permissions": ["BAN_MEMBERS", "SEND_MESSAGES"],
};
