module.exports = {
    name: "ping",
    description: "Says the ping",
    async execute(client, message) {
        message.channel.send(`Pong! - ${client.ws.ping}`)
    }
}