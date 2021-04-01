const db = require("quick.db");

module.exports.run = (message) => {
	const channel = message.mentions.channels.first();
	if(!channel) return message.channel.send("You didnt mentioned a channel").then(m => m.delete({ timeout: 10000 }));
	db.set(`welcome_${message.guild.id}_channel`, channel.id);
	message.channel.send(`Welcome channel setted to ${channel} \n**Bot tip:** `);

};

module.exports.config = {
	"name": "setwelcome",
	"description": "sets the welcome channel",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "ADMINISTRATOR"],
};