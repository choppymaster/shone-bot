module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
	if(member.id === message.author.id) return message.channel.send("You cant unwarn yourself").then(m => m.delete({ timeout: 10000 }));
	if(member.id === client.user.id) return message.channel.send("You cant unwarn me").then(m => m.delete({ timeout: 10000 }));
	const warnings = require("../../modules/database/models/warns.js");
	const data = warnings.findOne({
		userID: member.id,
		guildID: message.guild.id,
	});

	if (data) {
		warnings.deleteOne(data, function(err) {
			if (err) client.logger.error(err);
		});
	}
	message.channel.send(`${member.tag}'s warns have been cleared.`);
};

module.exports.config = {
	"name": "clearwarn",
	"description": "clear all the warns of a warned member",
	"guildOnly": true,
	"permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"],
};