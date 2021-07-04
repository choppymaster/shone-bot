const Warning = require("../../database/models/warns.js")

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the permission to unwarn anyone.");
	if (member.id === message.author.id) return message.channel.send("You cant unwarn yourself.");
	if (member.id === client.user.id) return message.channel.send("You cant warn me");
	
	const warns = await Warning.find({
	    userID: member.id,
	    guildID: message.guild.id
     })
    
	    if (!warns.length) return message.channel.send("They don't have any warns")
	    
	    await Warning.findByIdAndRemove(warns[warns.length - 1]._id)
	    await member.updateWarns()
	   
	    message.channel.send(`${member.user.tag} is unwarned. They have ${warns.length - 1} warns.`)
};

module.exports.config = {
	"name": "unwarn",
	"description": "unwarns a member on the guild",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"],
};