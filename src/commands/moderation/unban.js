module.exports.run = async (client, message, args) => {
  const member = args[0]
  if (!member) return message.channel.send("You didn't specified a member!")
  
  message.guild.fetchBans().then(bans => {
    const user = bans.find(ban => ban.user.id === member);
    if (!user) return message.channel.send("User not found in bans.")
    message.guild.unban(user.user);
    message.channel.send("user successfully unbanned!")
    })
}

module.exports.config = {
  "name": "unban",
  "description": "Unbans a banned member in a guild.",
  "guildOnly": true,
  "permissions": ["SEND_MESSAGES", "BAN_MEMBERS"]
}