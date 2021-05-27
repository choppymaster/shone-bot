module.exports.run = async (client, message, args) => {
        const anim = args.join(" ")
        if (!anim) return message.channel.send("You didn't specified an anime!")
        
        const AnimeScraper = require("ctk-anime-scraper")
        const anime = new AnimeScraper.Gogoanime()
        const res = await anime.search(anim)
        console.log(res)
        message.channel.send("done")
}

module.exports.config = {
        "name": "anime",
        "description": "searches anime from Gogoanime",
        "permissions": ["SEND_MESSAGES"]
}