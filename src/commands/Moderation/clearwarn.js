const { Schemas } = require("../../common")

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
	if(member.id === message.author.id) return message.channel.send("You cant clear warns yourself").then(m => m.delete({ timeout: 10000 }));
	if(member.id === client.user.id) return message.channel.send("You cant clear-warns me because you cant warn me lol").then(m => m.delete({ timeout: 10000 }));
	
	const obj = { userID: member.id, guildID: message.guild.id }
	
	const warns = await Schemas.warns.find(obj)
	
	if (!warns.length) return message.channel.send("They don't have any warns!")
	
	await Schemas.warns.deleteMany(obj)
	await member.updateWarns()
	message.channel.send(`${member.user.tag}'s warnings have been cleared.`)
};

module.exports.config = {
	"name": "clearwarn",
	"description": "clear all the warns of a warned member",
	"guildOnly": true,
	"permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"],
};