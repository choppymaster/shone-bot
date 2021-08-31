const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
	const text = args.join(" ");
	if (!text) return message.channel.send("You didn't specified something to say!");
	const embed = new MessageEmbed()
		.setDescription(text)
		.setFooter(message.author.tag);
	message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "say",
	"description": "says something you specify",
	"permissions": ["SEND_MESSAGES"],
};