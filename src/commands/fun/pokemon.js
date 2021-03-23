const fetch = require('node-fetch')
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    if(!args.join(" ")) return message.channel.send("Pokémon not specified").then(m => m.delete({ timeout: 10000 }))
const res = await fetch(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`).then(info => info.json())
  
try {

const pokeEmbed = new MessageEmbed()
		.setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
		.setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
		.setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
		.setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`);
	message.channel.send(pokeEmbed)
} catch (e) {
  message.channel.send("Pokemon not found")
}
    }

module.exports.config = {
  "name": "pokemon",
  "description": "fetches pokemon details",
  "permissions": ["SEND_MESSAGES"]
}
  
