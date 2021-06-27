const warnings = require("../../database/models/warns.js")

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
	if(member.id === message.author.id) return message.channel.send("You cant clear warns yourself").then(m => m.delete({ timeout: 10000 }));
	if(member.id === client.user.id) return message.channel.send("You cant clear-warns me because you cant warn me lol").then(m => m.delete({ timeout: 10000 }));
	
	warnings.findOne({
	    userID: member.id,
	    guildID: message.guild.id,
	}, (err, warn) => {
	    if (!warn) {
	       message.channel.send("They have no warnings.")
	    } else {
	        warnings.findOneAndDelete({
	            userID: member.id,
	            guildID: message.guild.id
	        }).then(() => message.channel.send(`${member.user.tag}'s warns have been cleared!`))
	    }
	});
};

module.exports.config = {
	"name": "clearwarn",
	"description": "clear all the warns of a warned member",
	"guildOnly": true,
	"permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"],
};