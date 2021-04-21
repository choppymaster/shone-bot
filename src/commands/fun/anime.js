const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
	const query = args.join(" ");
	if(!query) return message.channel.send("Anime not specified").then(m => m.delete({ timeout: 10000 }));
	const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`).then(resx => resx.json()).catch(() => message.channel.send("Anime not found!"))
	
	const AnimEmbed = new MessageEmbed()
	.setTitle(`${Object.values(res.data[0].attributes.titles)[0]} (${res.data[0].attributes.titles.ja_jp})`)
	.setColor("RANDOM")
	.setDescription(res.data[0].attributes.synopsis)
	.setThumbnail(res.data[0].attributes.posterImage.original)
	
	message.channel.send(AnimEmbed)
};

module.exports.config = {
	"name": "anime",
	"description": "Fetches anime!",
	"permissions": ["SEND_MESSAGES"]
};