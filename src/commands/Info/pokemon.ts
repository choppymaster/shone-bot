import Command from "../../core/Command";
import { name, description, slashCommandOptions, clientPermissions, usage, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("pokemon")
@description("Fetches pokemon details")
@slashCommandOptions([
  {
    name: "name",
    description: "the pokemon name you want to search for",
    type: "STRING",
    required: true
  }
])
@usage("[name]")
@clientPermissions("EMBED_LINKS")
@cooldown(9000)
class Pokemon extends Command {
  public async run(client, message, args) {
    if (!args.join(" ")) return message.channel.send("Pokémon not specified").then(m => m.delete({ timeout: 10000 }));
    let res;
    try {
      res = await axios.get(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`).then(res => res.data);
      const pokeEmbed = new MessageEmbed()
        .setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
        .setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
        .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
        .setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`);
      message.channel.send({ embeds: [pokeEmbed] });
    } catch {
      message.channel.send("Pokemon not found.");
    }
  }

  public async execute(client, interaction, guild) {
    let res;
    try {
      res = await axios.get(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${interaction.options.getString("name")}`).then(res => res.data);

      const pokeEmbed = new MessageEmbed()
        .setAuthor(res.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.typeIcon}`)
        .setDescription(`Type of this pokemon is **${res.info.type}**. ${res.info.description}`)
        .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.photo}`)
        .setFooter(`Weakness of pokemon - ${res.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${res.images.weaknessIcon}`);
      interaction.reply({ embeds: [pokeEmbed] });
    } catch {
      interaction.reply("Pokemon not found");
    }
  }
}

export default Pokemon;
