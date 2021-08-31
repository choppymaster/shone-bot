const AnimeScraper = require("ctk-anime-scraper");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
	const anim = args.join(" ");
	if (!anim) return message.channel.send("You didn't specified an anime!");

	const anime = new AnimeScraper.Gogoanime();
	const res = await anime.search(anim);

	if (!res.length) return message.channel.send("Anime not found!");
	const embed = new MessageEmbed()
		.setTitle(res[0].title)
		.setColor("RANDOM")
		.setImage(res[0].img)
		.setDescription([
			`${res[0].releaseDate}`,
			`[See the anime on Gogoanime.ai](${res[0].link}) **Alert: Please be aware of the ads given on that website.**`]);

	message.channel.send({ embeds: [embed] });
};

module.exports.config = {
	"name": "anime",
	"description": "searches anime from Gogoanime",
	"permissions": ["SEND_MESSAGES"],
};