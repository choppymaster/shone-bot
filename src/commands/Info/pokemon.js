const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	run: async (client, message, args) => {
		if (!args.join(" ")) return message.channel.send("Pokémon not specified").then(m => m.delete({ timeout: 10000 }));
		const res = await fetch(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`).then(info => info.json());

		try {

			const pokeEmbed = new MessageEmbed()
				.setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
				.setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
				.setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
				.setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`);
			message.channel.send({ embeds: [pokeEmbed] });
		}
		catch {
			message.channel.send("Pokemon not found");
		}
	},
	slashCommand: {
		options: [
			{
				name: "name",
				description: "the pokemon name you want to search for",
				type: "STRING",
				required: true,
			},
		],
	},
	execute: async (client, interaction, guild) => {
		const res = await fetch(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${interaction.options.getString("name")}`).then(info => info.json());

		try {

			const pokeEmbed = new MessageEmbed()
				.setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
				.setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
				.setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
				.setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`);
			interaction.reply({ embeds: [pokeEmbed] });
		}
		catch {
			interaction.reply("Pokemon not found");
		}
	},
	config: {
		name: "pokemon",
		description: "fetches pokemon details",
		permissions: ["SEND_MESSAGES"],
	},
};