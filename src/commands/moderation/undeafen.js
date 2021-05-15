module.exports.run = async (client, message, args) => {
  
  const member = message.mentions.members.first();
  if (!member) return message.channel.send("You didn't mentioned a user to be undeafened?!")
  
  const channel = member.guild.channels.cache.get(member.voice.channelID)
  if (!channel) return message.channel.send("The member is not in a voice channel!")
  
  try {
    await member.voice.setDeaf(false)
    message.channel.send("Member successfully unmuted on voice channel")
  } catch { return; }
  
}

module.exports.config = {
  "name": "undeafen",
  "description": "undeafens a member in a voice channel",
  "guildOnly": true,
  "permissions": ["SEND_MESSAGES", "DEAFEN_MEMBERS"]
}