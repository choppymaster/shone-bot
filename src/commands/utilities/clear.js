module.exports.run = (message, args) => {
    let number = args.join(" ")
       if(!number) return message.channel.send("Number not specified.")
       if(isNaN(number)) return message.channel.send("it is not a number.")
       if(number > 100 || number < 2) return message.channel.send("The number should be 100 messages lower and 2 messages higher.")
       message.channel.bulkDelete(number).catch(console.error)
       message.channel.send(`cleared ${number} messages.`).then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
    }

module.exports.config = {
  "name": "clear",
  "description": "Deletes a number of messages in the channel",
  "guildOnly": true,
  "permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"]
}