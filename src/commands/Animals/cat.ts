import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

export const Command = {
  run: async (client, message, args) => {
    const cat = await axios.get("https://aws.random.cat/meow").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":cat: meow")
      .setImage(cat.file)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const cat = await axios.get("https://aws.random.cat/meow").then(res => res.data);
    const embed = new MessageEmbed()
      .setTitle(":cat: meow")
      .setImage(cat.file)
      .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "cat",
    description: "Gives you a random cat image",
    permissions: ["SEND_MESSAGES"]
  }
};
