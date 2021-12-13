import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

export const Command = {
  run: async (client, message, args) => {
    const hare = await axios.get("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":rabbit: squeak")
      .setImage(hare.media.poster)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const hare = await axios.get("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":rabbit: squeak")
      .setImage(hare.media.poster)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "bunny",
    description: "Gives you a random bunny image",
    permissions: ["SEND_MESSAGES"]
  }
};
