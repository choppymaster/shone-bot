module.exports.run = async (client, message, args) => {

	const member = message.mentions.members.first();
	if (!member) return message.channel.send("You didn't mentioned a user to be defended!");

	const channel = member.guild.channels.cache.get(member.voice.channelID);
	if (!channel) return message.channel.send("The member is not in a voice channel!");

	try {
		await member.voice.setDeaf(true);
		message.channel.send("Member successfully muted on voice channel");
	}
	catch { return; }

};

module.exports.config = {
	"name": "deafen",
	"description": "deafens a member in a voice channel",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "DEAFEN_MEMBERS"],
};