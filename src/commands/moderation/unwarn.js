const Warning = require("../../database/models/warns.js")

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the permission to unwarn anyone.");
	if (member.id === message.author.id) return message.channel.send("You cant unwarn yourself.");
	if (member.id === client.user.id) return message.channel.send("You cant warn me");

	 Warning.findOne({
		userID: member.id,
		guildID: message.guild.id,
	}, (err, warn) => {
	 if (warn.warns === 1) {
	     Warning.findOneAndDelete({
	         userID: member.id,
	         guildID: message.guild.id
	     })
	     message.channel.send(`${member.user.username}'s warns have been cleared. (They had only 1 warn)`)
	 } else {
	     warn.warns--;
	     warn.date.pop();
	     warn.moderators.pop();
	     warn.reason.pop();
	     
	     warn.save().then(() => message.channel.send(`${member.user.username}'s is unwarned. They have ${warn.warns} warnings.`))
	 }
  });
};

module.exports.config = {
	"name": "unwarn",
	"description": "unwarns a member on the guild",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"],
};