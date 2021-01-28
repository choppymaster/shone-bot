module.exports = {
    name: "say",
    description: "says something",
    execute(message, args) {
        message.delete()
         let text = args.join(" ");
        message.channel.send(text); 
    }
}