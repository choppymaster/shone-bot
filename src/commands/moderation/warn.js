const db = require('quick.db')

module.exports.run = (client, message) => {
        const member = message.mentions.members.first()
          if (!member) return message.channel.send("Member not specified")
          if(member.id === message.author.id) return message.channel.send("You cant warn yourself").then(m => m.delete({ timeout: 10000 }))
          if(member.id === client.user.id) return message.channel.send("You cant warn me").then(m => m.delete({ timeout: 10000 }))
          db.add(`warn.${member.id}`, 1);
          const data = db.get(`warn.${member.id}`);
      if(data >= 1) {
     message.channel.send(`${member} is warned. They have ${data} warn(s).`)
        } 
      }

module.exports.config = {
  "name": "warn",
  "description": "Warns a member on the server",
  "guildOnly": true,
  "permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"]
}