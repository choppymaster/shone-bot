module.exports = {
    name: "warn",
    description: "warns a member",
    permissions: "MANAGE_MESSAGES",
    execute(message, args, member, MessageEmbed, blogchannel, logchannel, reason, db) {
        message.delete()
   if(!message.member.hasPermission("MANAGE_MESSAGES")) 
   return message.channel.send("You dont have the permission to warn anyone").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if (!member) return;
          if(member.id === message.author.id) return message.channel.send("You cant warn yourself").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          if(member.id === client.user.id) return message.channel.send("You cant warn me").then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
          db.add(`warn.${member.id}`, 1);
          const data = db.get(`warn.${member.id}`);
      if(data === undefined ) {
        let data = 0
      }
      message.channel.send(`${member} you are warned. Additional infractions may result in a mute. You have ${data} warns.`)
      logchannel.send(`${member} is warned. He have ${data} warns. He is warned by ${message.author}.`)
      blogchannel.send(`${member} is warned. He have ${data} warns. He is warned by ${message.author}.`)

       }
    }
}