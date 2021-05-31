module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the permission to unwarn anyone.");
	if (member.id === message.author.id) return message.channel.send("You cant unwarn yourself.");
	if (member.id === client.user.id) return message.channel.send("You cant warn me");

	const Warning = require("../../modules/database/models/warns.js");

	Warning.findOne({
		userID: member.id,
		guildID: message.guild.id,
	}, async (err, warn) => {
		if (err) client.logger.error(err);

		if (!warn) return message.channel.send("They don't have any warns");

		if (warn.warns === 1) {
			Warning.findOneAndDelete({
				userID: member.id,
				guildID: message.guild.id,
			});
			message.channel.send(`${member.tag} is unwarned. they have no warnings.`);
		}
		else {
			warn.warns--;
			warn.reason.pop();
			warn.moderators.pop();
			warn.date.pop();

			message.channel.send(`${member.tag} is unwarned. they have  ${warn.warns} warnings.`);
		}
	});
};

module.exports.config = {
	"name": "unwarn",
	"description": "unwarns a member on the guild",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"],
};