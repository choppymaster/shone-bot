const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unwarn",
    description: "unwarns a warned member",
    permissions: "MANAGE_MESSAGES",
    execute(client, message, args, member, db) {
        message.delete()
          if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }))
          if(member.id === message.author.id) return message.channel.send("You cant unwarn yourself").then(m => m.delete({ timeout: 10000 }))
          if(member.id === client.user.id) return message.channel.send("You cant unwarn me").then(m => m.delete({ timeout: 10000 }))
          db.subtract(`warn.${member.id}`)
          message.channel.send(`${member} is unwarned. 👍`)
     }
}