const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "userlog",
    description: "get the user's log",
    permissions: "MANAGE_MESSAGES",
    execute(message) {
      const member = message.mentions.members.first()
      if(!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }))
       const data = db.get(`warn.${member.id}`)
       const userembed = new MessageEmbed()
       .setTitle(`Log of ${member.tag}`)
       .setDescription(`**No. of warns:** ${data}`)
       message.channel.send(userembed)
    }
    
}