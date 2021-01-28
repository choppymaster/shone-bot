module.exports = {
    name: "sps",
    description: "plays stone paper scissors!",
    execute(message, args) {
    const options = [
            "stone :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }
}