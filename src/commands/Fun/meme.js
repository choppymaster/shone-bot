const srod = require("something-random-on-discord");

module.exports.run = async (client, message, args) => {
	const meme = await srod.Random.getMeme();
	message.channel.send(meme);
};

module.exports.config = {
	"name": "meme",
	"description": "Gives you a random meme",
	"permissions": ["SEND_MESSAGES"],
};