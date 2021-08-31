const { Schemas } = require("../../common");

module.exports.run = async (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified");
	if (member.id === message.author?.id) return message.channel.send("You cant unwarn yourself.");
	if (member.id === client.user.id) return message.channel.send("You cant warn me");

	const warns = await Schemas.warns.find({
	    userID: member.id,
	    guildID: message.guild.id,
	});

	    if (!warns.length) return message.channel.send("They don't have any warns");

	    await Schemas.warns.findByIdAndRemove(warns[warns.length - 1]._id);
	    await member.fetchWarns();

	    message.channel.send(`${member.user.tag} is unwarned. They have ${warns.length - 1} warns.`);
};

module.exports.config = {
	"name": "unwarn",
	"description": "unwarns a member on the guild",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"],
};