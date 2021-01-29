const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "welcome",
    description: "sends a welcome channel",
    execute(client, message, args) {
client.on("guildMemberAdd", member => {
    const welcomechannel = db.get(`welcome_${message.guild.id}_channel`)
    if(!welcomechannel) return;
    let welcomeEmbed = new MessageEmbed()
    .setTitle(`${member.tag} joined the server!`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Everyone welcome ${member} to the party!`)
    client.channel.cache.get(welcomechannel).send(welcomeEmbed)
    
   })
   }
}