const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    const hare = await fetch("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.json());

    const embed = new MessageEmbed()
      .setTitle(":rabbit: squeak")
      .setImage(hare.media.poster)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const hare = await fetch("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.json());

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
