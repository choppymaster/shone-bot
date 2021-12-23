import Command from "../../core/Command";
import { name, description, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("dadjoke")
@description("Gives a random dadjoke")
@clientPermissions("EMBED_LINKS")
@cooldown(6000)
class Dadjoke extends Command {
  public async run(client, message, args) {
    const joke = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(joke)
      .setColor("RANDOM");
    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const joke = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(json => json.data);
    const embed = new MessageEmbed()
      .setTitle(joke)
      .setColor("RANDOM");
    interaction.reply({ embeds: [embed] });
  }
}

export default Dadjoke;
