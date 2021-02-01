module.exports = {
    name: "sps",
    description: "plays stone paper scissors!",
    execute(message, args) {
    const options = [
            "stone :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        // Select the option by bot
        const option = options[Math.floor(Math.random() * options.length)]
        //Send the option 
        message.channel.send(`You got ${option}`)
    }
}