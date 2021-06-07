require("dotenv").config();

// import dependencies
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.logger = require("./utils/logger.js");

// Command handling
client.commands = new Discord.Collection();

fs.readdirSync("./src/commands/").forEach(dir => {
	const commandfiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
	for (const file of commandfiles) {
		const command = require(`./commands/${dir}/${file}`);
		client.commands.set(command.config.name.toLowerCase(), command);
	}
});

const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const eventName = file.split(".")[0];
	client.on(eventName, (...args) => event.run(client, ...args));
}

// mongoose connection
require("./database/mongo.js").init(client)

// import the token!
client.login(process.env.TOKEN);

process.on("unhandledRejection", err => {
        client.logger.error(err.stack)
})

process.on("uncaughtException", err => {
        client.logger.error(err.stack)
})