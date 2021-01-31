const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "warn",
    description: "warns a member",
    permissions: "MANAGE_MESSAGES",
    execute(client, message, args, member, db) {
        message.delete()
          if (!member) return message.channel.send("Member not specified")
          if(member.id === message.author.id) return message.channel.send("You cant warn yourself").then(m => m.delete({ timeout: 10000 }))
          if(member.id === client.user.id) return message.channel.send("You cant warn me").then(m => m.delete({ timeout: 10000 }))
          db.add(`warn.${member.id}`, 1);
          const data = db.get(`warn.${member.id}`);
      if(data === undefined ) {
        let data = 0
      }
     message.channel.send(`${member} is warned. They have ${data} warn(s).`)
       }
    }
