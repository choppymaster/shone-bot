const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	if(!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
	
	const Warning = require("../../modules/database/models/warns.js")
	
	Warning.findOne({
	  userID: member.id,
	  guildID: message.guild.id,
	}, (err, warn) => {
	  if (warn === null) return message.channel.send("They have no warns").then(m => m.delete({ timeout: 10000 }))
	  const warningEmbed = new MessageEmbed()
	  .setTitle(`Warnings - ${member.user.username}`)
	  .setColor("RANDOM")
	  .setThumbnail(member.user.displayAvatarURL())
	  
	  for (let i = 0; i < warn.warns; i++) {
	    warningEmbed.addField(`Warn no. ${i + 1}`, [
	      `Warned by: ${message.guild.members.cache.get(warn.moderators[i]).user.tag}`,
	      `Reason: ${warn.reason[i]}`,
	      `Date warned: ${warn.date[i]}`].join("\n"))
	  }
	  message.channel.send(warningEmbed)
	})
	
}

module.exports.config = {
	"name": "warnings",
	"description": "Get the warnings of a member on the server",
	"guildOnly": true,
	"permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"],
};