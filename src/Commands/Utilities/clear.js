module.exports = {
    name: "clear",
    description: "clears a number of messages",
    permissions: "MANAGE_MESSAGES",
    execute(message, args) {
    let number = args.join(" ")
       if(!number) return;
       message.channel.bulkDelete(number).catch(console.error)
       message.channel.send(`cleared ${number} messages.`).then(msg => {
              					                     msg.delete({ timeout: 10000 })	
              									             })
    }
}