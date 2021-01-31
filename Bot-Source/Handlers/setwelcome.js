module.exports = {
  name: "setwelcome",
  description: "set a  channel for welcome messages",
  permissions: "MANAGE_GUILD",
  execute(message, args, db) {
  const channel = message.mentions.channels.first()
  if(!channel) return message.channel.send('You didnt mentioned a channel').then(m => m.delete({ timeout: 10000 }))
db.set(`welcome_${message.guild.id}_channel`, channel)
message.channel.send(`Welcome channel setted to ${channel}`)

   }
}