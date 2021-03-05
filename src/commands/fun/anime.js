const anime = require('ctk-anime-scraper')

module.exports = {
  name: "anime",
  description: "searches anime!",
  execute(message, args) {
    const query = args.join(" ")
    if(!query) return message.channel.send('Anime not specified').then(m => m.delete({ timeout: 10000 }))
    anime.search(query).then((data) => {
      if(!data.length) return message.channel.send("No anime found.")
      anime.fetchAnime(data[0].link).then (data => message.channel.send(data))
    })
  }
}