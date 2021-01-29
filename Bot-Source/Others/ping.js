module.exports = {
    name: "ping",
    description: "Says the ping",
    execute(client, message, args) {
        message.channel.send(`Pong! - ${client.ws.ping}`)
    }
}