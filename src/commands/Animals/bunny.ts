import Command from "../../core/Command";
import { name, description, aliases, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("bunny")
@description("Gives you a bunny image.")
@aliases("hare", "rabbit")
@clientPermissions("EMBED_LINKS")
@cooldown(8000)
class Bunny extends Command {
  async run(client, message, args) {
    const hare = await axios.get("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":rabbit: squeak")
      .setImage(hare.media.poster)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }

  async execute(client, interaction, guild) {
    const hare = await axios.get("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":rabbit: squeak")
      .setImage(hare.media.poster)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  }
}

export default Bunny;
