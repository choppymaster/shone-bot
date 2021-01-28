module.exports = {
    name: "ping",
    description: "Says the ping",
    execute(message, args) {
        message.channel.send(`Pong! - ${client.ws.ping}`)
    }
}