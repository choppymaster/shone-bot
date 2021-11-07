const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    const fox = await axios.get("https://randomfox.ca/floof").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":fox: baow")
      .setImage(fox.image)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const fox = await axios.get("https://randomfox.ca/floof").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":fox: baow")
      .setImage(fox.image)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "fox",
    description: "Gets a random fox image",
    permissions: ["SEND_MESSAGES"]
  }
};
