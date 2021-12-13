import AnimeScraper = require("ctk-anime-scraper")
import { MessageEmbed } from "discord.js";

export const Command = {
  run: async (client, message, args) => {
    const anim = args.join(" ");
    if (!anim) return message.channel.send("You didn't specified an anime!");

    const anime = new AnimeScraper.Gogoanime();
    const res = await anime.search(anim);

    if (!res.length) return message.channel.send("Anime not found!");
    const embed = new MessageEmbed()
      .setTitle(res[0].title)
      .setColor("RANDOM")
      .setImage(res[0].img)
      .setDescription([
				`${res[0].releaseDate}`,
				`[See the anime on Gogoanime.ai](${res[0].link}) **Alert: Please be aware of the ads given on that website.**`].join("\n"));

    message.channel.send({ embeds: [embed] });
  },
  slashCommand: {
    options: [
      {
        name: "name",
        description: "The anime name you want to search for",
        type: "STRING",
        required: true
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const anim = interaction.options.getString("name");

    const anime = new AnimeScraper.Gogoanime();
    const res = await anime.search(anim);

    if (!res.length) return interaction.reply("Anime not found!");
    const embed = new MessageEmbed()
      .setTitle(res[0].title)
      .setColor("RANDOM")
      .setImage(res[0].img)
      .setDescription([
				`${res[0].releaseDate}`,
				`[See the anime on Gogoanime.ai](${res[0].link}) **Alert: Please be aware of the ads given on that website.**`].join("\n"));

    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "anime",
    description: "searches anime from Gogoanime",
    permissions: ["SEND_MESSAGES"]
  }
};
