const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "welcome",
    description: "sends a welcome message in a channel",
    execute(client, message) {
client.on("guildMemberAdd", member => {
  // get the welcome channel( By setwelcome command)
    const welcomechannel = db.get(`welcome_${message.guild.id}_channel`)
    if(!welcomechannel) return;
   // welcome embed
    let welcomeEmbed = new MessageEmbed()
    .setTitle(`${member.tag} joined the server!`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Everyone welcome ${member} to the party!`)
   // Send the embed 
    client.channel.cache.get(welcomechannel).send(welcomeEmbed).catch(console.error)
    
   })
   }
}