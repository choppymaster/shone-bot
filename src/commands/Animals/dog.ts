import Command from "../../core/Command";
import { name, description, aliases, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("dog")
@description("Gives you a random dog image")
@aliases("doggie", "doggo")
@clientPermissions("EMBED_LINKS")
@cooldown(8000)
class Dog extends Command {
  public async run(client, message, args) {
    const dog = await axios.get("https://dog.ceo/api/breeds/image/random").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":dog: baow")
      .setImage(dog.message)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const dog = await axios.get("https://dog.ceo/api/breeds/image/random").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":dog: baow")
      .setImage(dog.message)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  }
}

export default Dog;
