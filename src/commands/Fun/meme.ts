import Command from "../../core/Command";
import { name, description, aliases, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";
const axios = require("axios").default;

@name("meme")
@description("Gives you a random meme")
@clientPermissions("EMBED_LINKS")
@cooldown(7000)
class Meme extends Command {
  async run(client, message, args) {
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
  }

  async execute(client, interaction, guild) {
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
  }
}

export default Meme;
