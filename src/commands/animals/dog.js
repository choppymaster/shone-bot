const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    const dog = await fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json()) 

    const embed = new MessageEmbed()
    .setTitle(":dog: baow")
    .setImage(dog.message)
    .setColor("RANDOM")
    
    message.channel.send(embed)
}

module.exports.config = {
    "name": "dog",
    "description": "Gives you a random dog image",
    "permissions": ["SEND_MESSAGES"]
}