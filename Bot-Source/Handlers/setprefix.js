const db = require('quick.db')

module.exports = {
    name: "setprefix",
    description: "sets a prefix for one guild",
    execute(message, args, prefix) {
        const ps = args[1]
     if(!message.member.hasPermission("MANAGE_GUILD"))
     return message.channel.send("Insufficient permissions.").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })

     if(!ps) return message.channel.send("Prefix not specified.").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })

     if(ps.length > 5) return message.channel.send("Prefix should be 5 letters or lower.").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })

     if(ps === prefix) return message.channel.send("That is a setted prefix").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })

     db.set(`guild_${message.guild.id}_prefix`, ps)
     message.channel.send(`Bot prefix setted to ${ps}`)
    }
}