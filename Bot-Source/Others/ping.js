module.exports = {
    name: "ping",
    description: "Says the ping",
    execute(client, message) {
        message.channel.send(`Pong! - ${client.ws.ping}`)
    }
}