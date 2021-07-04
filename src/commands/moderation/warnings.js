const { MessageEmbed } = require("discord.js");
const Warning = require("../../database/models/warns.js")

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first()  || message.member;
	
	const warns = member.warns;
    const embed = new MessageEmbed()
    .setTitle(`Warnings - ${member.user.tag}`)
    .setColor("RANDOM")
    
	if (warns.length) {
	    for (let i = 0; i < warns.length; i++) {
	        embed.addField(`Warn no. ${i + 1}`, [
	            `Author: ${message.guild.members.cache.get(warns[i].moderator).user.tag ? message.guild.members.cache.get(warns[i].moderator).user.tag : "User left"}`,
	            `Reason: ${warns[i].reason}`,
	            `Date: ${warns[i].date}`].join("\n"), true)
	    }
	    message.channel.send(embed)
	} else {
	   message.channel.send("They don't have any warns.") 
	}
};

module.exports.config = {
	"name": "warnings",
	"description": "Get the warnings of a member on the server",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES"],
};