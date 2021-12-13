import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

export const Command = {
  run: async (client, message, args) => {
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
  },
  execute: async (client, interaction, guild) => {
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
  },

  config: {
    name: "dadjoke",
    description: "Gives you a random dad joke.",
    permissions: ["SEND_MESSAGES"]
  }
};
