const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    const dog = await axios.get("https://dog.ceo/api/breeds/image/random").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":dog: baow")
      .setImage(dog.message)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },

  execute: async (client, interaction, guild) => {
    const dog = await axios.get("https://dog.ceo/api/breeds/image/random").then(res => res.data);

    const embed = new MessageEmbed()
      .setTitle(":dog: baow")
      .setImage(dog.message)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  },
  config: {
    name: "dog",
    description: "Gives you a random dog image",
    permissions: ["SEND_MESSAGES"]
  }
};
