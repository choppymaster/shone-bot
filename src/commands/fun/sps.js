module.exports.run = (client, message, args) => {
	const options = ["stone", "paper", "scissors"];

	const option = options[Math.floor(Math.random() * options.length)];

	message.channel.send(`You got ${option}`);
};

module.exports.config = {
	"name": "sps",
	"description": "plays stone paper scissors!",
	"permissions": ["SEND_MESSAGES"],
};