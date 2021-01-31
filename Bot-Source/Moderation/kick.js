const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kick",
    description: "kicks a member",
    permissions: "KICK_MEMBERS",
    execute(message, args, member, reason) {
    if(!member) return message.channel.send("You didn't mentioned a user to kick!").then(m => m.delete({ timeout: 10000 }))
    if(!reason) return message.channel.send("Reason not specified").then(m => m.delete({ timeout: 10000 }))
     member.kick(reason).then(() => {
              let KickEmbed = new MessageEmbed()
              .setTitle("❌ User kicked")
              .setColor("RANDOM")
              .setDescription(`${member} was kicked by ${message.author}.`)
              message.channel.send(KickEmbed)
              })
        }
   }