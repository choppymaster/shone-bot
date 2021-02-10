const anime = require('ctk-anime-scraper')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "anime",
  description: "searches anime!",
  execute(message, args) {
    const query = args.join(" ")
    anime.search(query).then((data) => {
      if(!data.length) return message.channel.send("No anime found.")
      anime.fetchAnime(data[0].link).then (data => message.channel.send(data))
    })
  }
}