module.exports.run = (client, message, args) => {
        const member = message.mentions.members.first()
          if (!member) return message.channel.send("Member not specified")
          if(member.id === message.author.id) return message.channel.send("You cant warn yourself").then(m => m.delete({ timeout: 10000 }))
          if(member.id === client.user.id) return message.channel.send("You cant warn me").then(m => m.delete({ timeout: 10000 }))
         const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "No reason specified"

const warning = require('../../modules/database/models/warns.js')

warning.findOne({
  userID: member.id,
  guildID: message.guild.id,
}, async (err, warn) => {
  if(err) client.logger.error(err)
  
  if(!warn) {
    
    const newWarning = new warning({
      userID: member.id,
      guildID: message.guild.id,
      warns: 1,
      reason: [`${reason}`],
      moderators: [`${message.author.id}`],
      date: [`${new Date().toUTCString()}`],
    })
    
await newWarning.save().catch(err => client.logger.error(err))
 
     } else {
       warn.warns++
       warn.reason.push(reason)
       warn.date.push(new Date ().toUTCString())
       warn.moderators.push(message.author.id)
warn.save().catch(err => client.logger.error(err))

 }
 
 try {
   message.channel.send(`${member} is warned. They have  ${warn.warns} warnings.`)
 } catch {
   message.channel.send(`${member} is warned. They have 1 warning.`)
 }
  
  })
}

module.exports.config = {
  "name": "warn",
  "description": "Warns a member on the server",
  "guildOnly": true,
  "permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"]
}