module.exports.run = (client, message, args) => {
	const options = ["stone", "paper", "scissors"];

	const option = options[Math.floor(Math.random() * options.length)];

	if (!args[0]) return message.channel.send("You didn't said an option!");

	const input = args[0].toLowerCase();

	if (!options.includes(input)) return message.channel.send("Invalid option!");

	let winner = null;

	if (input === "stone" && option === "scissors" || input === "paper" && option === "stone" || input === "scissors" && option === "paper") {
		winner = `${message.author} wins!`;
	}
	else if (input === option) {
		winner = "So, a draw.";
	}
	else {
		winner = "I win!";
	}

	message.channel.send(`You selected ${input}, I selected ${option}. ${winner}`);
};

module.exports.config = {
	"name": "sps",
	"description": "plays stone paper scissors!",
	"permissions": ["SEND_MESSAGES"],
};