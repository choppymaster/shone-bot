import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

export const Command = {
  run: async (client, message, args) => {
    const subreddits = ["memes", "me_irl", "MemeEconomy", "ComedyCemetery", "dankmemes", "comedyheaven", "Animemes"];
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    const meme = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`, {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(data => data.data[0].data.children[0].data);
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setColor("RANDOM")
      .setImage(meme.url);

    message.channel.send({ embeds: [embed] });
  },
  execute: async (client, interaction, guild) => {
    const subreddits = ["memes", "me_irl", "MemeEconomy", "ComedyCemetery", "dankmemes", "comedyheaven", "Animemes"];
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    const meme = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`, {
      headers: {
        "User-Agent": `axios ${axios.VERSION}`
      }
    }).then(data => data.data[0].data.children[0].data);
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setColor("RANDOM")
      .setImage(meme.url);

    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "meme",
    description: "Gives you a random meme",
    permissions: ["SEND_MESSAGES"]
  }
};
