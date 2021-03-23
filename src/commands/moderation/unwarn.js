const db = require('quick.db')

module.exports.run = (client, message) => {
        message.delete()
        const member = message.mentions.members.first()
          if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }))
          if(member.id === message.author.id) return message.channel.send("You cant unwarn yourself").then(m => m.delete({ timeout: 10000 }))
          if(member.id === client.user.id) return message.channel.send("You cant unwarn me").then(m => m.delete({ timeout: 10000 }))
          db.subtract(`warn.${member.id}`)
          message.channel.send(`${member} is unwarned. 👍`)
     }

module.exports.config = {
  "name": "unwarn",
  "description": "unwarns a warned member",
  "guildOnly": true,
  "permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"]
}