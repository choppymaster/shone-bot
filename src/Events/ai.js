module.exports = {
async execute(client) {

client.on("message", async message => {
  
   const alexa = require('alexa-bot-api')
   var chatbot = new alexa("aw2plm")
   
    if (message.author.bot) return;
    if (message.content.indexOf('!') === 0) {
        var text = message.content.substring(1);
   chatbot.getReply(`${text}`, 'automatic').then(r => message.channel.send (`\`${message.author.username}\` ${r}`))
     }
})
 }
}
