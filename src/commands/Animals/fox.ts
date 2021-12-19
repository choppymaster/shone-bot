import Command from "../../core/Command";
import { name, description, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("fox")
@description("Gives you a random fox image")
@clientPermissions("EMBED_LINKS")
@cooldown(8000)
class Fox extends Command {
  public async run(client, message, args) {
    const fox = await axios.get("https://randomfox.ca/floof").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":fox: baow")
      .setImage(fox.image)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const fox = await axios.get("https://randomfox.ca/floof").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":fox: baow")
      .setImage(fox.image)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  }
}

export default Fox;
