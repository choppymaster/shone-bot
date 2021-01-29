const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "userlog",
    description: "get the user's log",
    permissions: "MANAGE_MESSAGES",
    execute(message, args, member) {
       const data = db.get(`warn.${member.id}`)
       const userembed = new MessageEmbed()
       .setTitle(`Log of ${member.tag}`)
       .setDescription(`**No. of warns:** ${data}`)
       message.channel.send(userembed)
    }
    
}