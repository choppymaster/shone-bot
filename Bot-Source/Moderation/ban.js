module.exports = {
    name: "ban",
    description: "bans a member",
    permissions: "BAN_MEMBERS",
    execute(message, args, member, MessageEmbed, blogchannel, logchannel, reason) {
        if (!member) return message.channel.send("You didn't mentioned a user to ban!")
     member.ban(reason).then(() => {   
              let banEmbed = new MessageEmbed()
              .setTitle("🔒 User Banned")
              .setColor("RANDOM")
              .setDescription(`${member} was banned by ${message.author} with the reason of ${reason}.`)
              message.channel.send(banEmbed)
              logchannel.send(banEmbed)
              blogchannel.send(banEmbed)
           })
    }
    
}