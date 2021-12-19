import Command from "../../core/Command";
import { name, description, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("advice")
@description("Gives you a random advice")
@clientPermissions("EMBED_LINKS")
@cooldown(6000)
class Advice extends Command {
  public async run(client, message, args) {
    const advice = await axios.get("https://api.adviceslip.com/advice", {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(advice.slip.advice)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const advice = await axios.get("https://api.adviceslip.com/advice", {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(advice.slip.advice)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  }
}

export default Advice;
