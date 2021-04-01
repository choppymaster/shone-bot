const db = require('quick.db');

module.exports.run = (message, args) => {
       let prefix = ".";
        const ps = args[0];
     if(!ps) return message.channel.send("Prefix not specified.").then(m => m.delete({ timeout: 10000 }));
     if(ps.length > 5) return message.channel.send("Prefix should be 5 letters or lower.").then(m => m.delete({ timeout: 10000 }));
     if(ps === prefix) return message.channel.send("That is a setted prefix").then(m => m.delete({ timeout: 10000 }));

     db.set(`guild_${message.guild.id}_prefix`, ps);
     message.channel.send(`Bot prefix setted to ${ps}`);
    };
    
module.exports.config = {
  "name": "setprefix",
  "description": "sets the prefix for the current guild",
  "guildOnly": true,
  "permissions": ["SEND_MESSAGES", "ADMINISTRATOR"]
};