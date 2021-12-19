import Command from "../../core/Command";
import { name, description, aliases, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("cat")
@description("Gives you a random cat image")
@aliases("kitty")
@clientPermissions("EMBED_LINKS")
@cooldown(8000)
class Cat extends Command {
  public async run(client, message, args) {
    const cat = await axios.get("https://aws.random.cat/meow").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":cat: meow")
      .setImage(cat.file)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const cat = await axios.get("https://aws.random.cat/meow").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":cat: meow")
      .setImage(cat.file)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  }
}

export default Cat;
