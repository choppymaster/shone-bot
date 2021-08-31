module.exports.run = (client, message, args) => {
	const number = args.join(" ");
	if(!number) return message.channel.send("Number not specified.");
	if(isNaN(number)) return message.channel.send("it is not a number.");
	if(number > 100 || number < 2) return message.channel.send("The number should be 100 messages lower and 2 messages higher.");
	message.channel.bulkDelete(number).catch(e => client.logger.error(e.stack));
	message.channel.send(`cleared ${number} messages.`).then(msg => msg.delete({ timeout: 2000 }));

};

module.exports.config = {
	"name": "clear",
	"description": "Deletes a number of messages in the channel",
	"guildOnly": true,
	"permissions": ["SEND_MESSAGES", "MANAGE_MESSAGES"],
};