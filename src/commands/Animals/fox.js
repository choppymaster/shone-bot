const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const fox = await fetch("https://randomfox.ca/floof").then(res => res.json());
	const embed = new MessageEmbed()
		.setTitle(":fox: baow")
		.setImage(fox.image)
		.setColor("RANDOM");

	message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "fox",
	"description": "Gets a random fox image",
	"permissions": ["SEND_MESSAGES"],
};