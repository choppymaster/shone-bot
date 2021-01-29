const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unwarn",
    description: "unwarns a warned member",
    permissions: "MANAGE_MESSAGES",
    execute(cliet, message, args, member, reason) {
        message.delete()
   if(!message.member.hasPermission("MANAGE_MESSAGES")) 
   return message.channel.send("You dont have the permission to unwarn anyone").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
           const db = require('quick.db')
          if (!member) return;
          if(member.id === message.author.id) return message.channel.send("You cant unwarn yourself").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if(member.id === client.user.id) return message.channel.send("You cant unwarn me").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          db.delete(`warn.${member.id}`)
          const data = db.get(`warn.${member.id}`)
          message.channel.send(`${member} is unwarned. 👍`)
     }
}