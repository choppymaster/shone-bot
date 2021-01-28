module.exports = {
    name: "kick",
    description: "kicks a member",
    execute(message, args, member, MessageEmbed, blogchannel, logchannel, reason) {
    if(!member) return message.channel.send("You didn't mentioned a user to kick!")
     member.kick(reason).then(() => {
              let KickEmbed = new MessageEmbed()
              .setTitle("❌ User kicked")
              .setColor("RANDOM")
              .setDescription(`${member} was kicked by ${message.author}.`)
              message.channel.send(KickEmbed)
              blogchannel.send(KickEmbed)
              })
        }
   }