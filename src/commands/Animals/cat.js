const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const cat = await fetch("https://aws.random.cat/meow").then(res => res.json());
	const embed = new MessageEmbed()
		.setTitle(":cat: meow")
		.setImage(cat.file)
		.setColor("RANDOM");

	message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "cat",
	"description": "Gives you a random cat image",
	"permissions": ["SEND_MESSAGES"],
};