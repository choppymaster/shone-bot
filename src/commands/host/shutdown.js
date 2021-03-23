module.exports.run = (message) => {
    message.channel.send("Goodbye 👋")
    process.exit()
  }

module.exports.config = {
  "name": "shutdown",
  "botMaster": true
}